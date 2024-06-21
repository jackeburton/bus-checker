import axios from "axios"
import {Arrival, Line, Stop} from "./types/busState"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import LineMultiSelect from "./lineMultiSelect"
import LineComponent from "./lineComponent"

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
            arrivals: []
        }))
}

const fetchStopArrivals = async (lineId: string, stopId: string): Promise<Arrival[]> => { 
    const response = await axios.get(`https://api.tfl.gov.uk/Line/${lineId}/Arrivals/${stop}`)
    return response.data.map((arrival: any) => ({
            id: arrival.id,
            arrivalTime : arrival.timeToStation 
        }))
}

const BusContainer = () => {
    const {isLoading, isError, data:busLines, error} = useFetchBusLines()
    const {data:routeStops, refetch:refetchRouteStops} = useQuery({
        queryKey: ['fetchRouteStops'],
        queryFn: () => fetchRouteStops(selectedLine.value),
        enabled: false,
    })
    const {data:stopArrivals, refetch:refetchStopArrivals} = useQuery({
        queryKey: ['fetchStopArrivals'],
        queryFn: () => fetchStopArrivals(selectedStopsLine, selectedStop),
        enabled: false,
    })
    const [lines, setLines] = useState<Line[]>([])
    const [selectedStop, setSelectedStop] = useState('')
    const [selectedStopsLine, setSelectedStopsLine] = useState('')
    const [selectedLine, setSelectedLine] = useState({value: '', selectedState: false})

    useEffect(() => {
        if (busLines){setLines(busLines)}
    }, [busLines])

    useEffect(() => {
        if (!selectedLine.selectedState && selectedLine.value) {
            refetchRouteStops()
        }
    }, [selectedLine, refetchRouteStops]);

    useEffect(() => {
        if (routeStops && selectedLine.value) {
            setLines(lines.map((line) => {
                if (selectedLine.value === line.value && selectedLine.selectedState){
                    return {...line, stops:[]}
                } else if (selectedLine.value === line.value ) {
                    return {...line, stops:routeStops}
                }
                return {...line}
                
            }))
        }
    }, [routeStops, selectedLine])

    /*useEffect(() => {
        if (selectedLine && selectedStopsLine) {

        }
    }, [selectedStop, selectedStopsLine])*/

    if (isLoading || !lines) return <div>loading values...</div>
    if (isError) return <div>Error: {error?.message}</div>

    const handleSelected = (value:string, selectedState: boolean) => {
        setSelectedLine({value:value, selectedState: selectedState})
    }

    /*const handleSelectedStop = (stopId:string, lineId:string) => {
        setSelectedStop(stopId)
        setSelectedStopsLine(lineId)
    }*/

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
                /*<LineComponent value={line.value} label={line.label} stops={line.stops}/>*/
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