import axios from "axios"
import {Line, Stop} from "./types/busState"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import LineMultiSelect from "./lineMultiSelect"

const fetchBusLines = async (): Promise<Line[]> => { 
    const response = await axios.get('https://api.tfl.gov.uk/Line/Mode/bus/Route')
    return response.data.map((line: any) => ({
            value: line.id,
            label: line.name,
            stops: []
        }))
}

const useFetchBusLines = () => {
    return useQuery({
        queryKey: ['fetchBusLines'],
        queryFn: fetchBusLines,
    })
}

const fetchRouteStops = async (value: string): Promise<Stop[]> => { 
    const response = await axios.get(`https://api.tfl.gov.uk/line/${value}/stoppoints`)
    return response.data.map((stop: any) => ({
            id: stop.id,
            commonName: stop.commonName,
        }))
}

const BusContainer = () => {
    const {isLoading, isError, data:busLines, error} = useFetchBusLines()
    const {data:routeStops, refetch} = useQuery({
        queryKey: ['fetchRouteStops'],
        queryFn: () => fetchRouteStops(selected),
        enabled: false,
    })
    const [lines, setLines] = useState<Line[]>([])
    const [selected, setSelected] = useState('')

    useEffect(() => {
        if (busLines){setLines(busLines)}
    }, [busLines])

    useEffect(() => {
        if (selected) {
            console.log(selected)
            refetch()
        }
    }, [selected, refetch]);

    useEffect(() => {
        if (routeStops && selected) {
            setLines(lines.map((selectedLine) => {
                if (selected === selectedLine.value) {
                    return {...selectedLine, stops:routeStops}
                }
                return {...selectedLine}
                
            }))
        }
    }, [routeStops])

    if (isLoading || !lines) return <div>loading values...</div>
    if (isError) return <div>Error: {error?.message}</div>

    const handleSelected = (value:string) => {
        setSelected(value)
    }

    const reduceSelected = () => {
        for (let i = 1; i < lines.length; i++){
            if ((lines[i].stops.length === 0) !== (lines[i-1].stops.length === 0)){
                return 'multi'
            }
        }
        return lines[0].stops.length !== 0
    }

    const toggleAll = () => {
        console.log('allToggled')
        if(reduceSelected() === 'multi' || reduceSelected()){
            setLines(lines.map((line) => ({...line, stops: []})))
            console.log('allToggled remove')
        }
    }

    return (
        <div>hello
            <LineMultiSelect
                name="Bus Routes"
                toggleAll={toggleAll} 
                lines={lines}
                handleSelected={handleSelected} 
                reduceSelected={reduceSelected} 
            /> 
            {lines.filter(line => line.stops.length !== 0).map(line => (
                <div key={line.value}>
                    {line.stops.map(stop=>(
                        <div key={stop.id}>{stop.commonName}</div>
                    ))}
                </div>
            ))}

        </div>
    )
}

export default BusContainer