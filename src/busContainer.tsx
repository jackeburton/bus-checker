import axios from "axios"
import {Arrival, Line, Stop} from "./types/busState"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import LineMultiSelect from "./lineMultiSelect"
import StopMultiSelect from "./stopMultiSelect"
import StopComponent from "./stopComponent"

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
    const response = await axios.get(`https://api.tfl.gov.uk/Line/${lineId}/Arrivals/${stopId}`)
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
        queryFn: () => fetchStopArrivals(selectedStopsLine, selectedStop.value),
        enabled: false,
    })
    const [lines, setLines] = useState<Line[]>([])
    const [selectedStop, setSelectedStop] = useState({value: '', selectedState: false})
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
        if (!selectedStop.selectedState && selectedStop.value && selectedStopsLine) {
            refetchStopArrivals()
        }
    }, [selectedStop, selectedStopsLine ,refetchStopArrivals])

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

    useEffect(() => {
        if (stopArrivals && selectedStop.value && selectedStopsLine) {
            setLines(lines.map(line => {
                if (selectedStopsLine === line.value) {
                    const newStops =  line.stops
                    for (let i = 0; i < newStops.length; i++){
                        if (newStops[i].id === selectedStop.value && selectedStop.selectedState) {
                            newStops[i].arrivals = []
                        } else if (newStops[i].id === selectedStop.value) {
                            newStops[i].arrivals = stopArrivals
                        }
                    }
                    return {...line, stops: newStops}
                }
                return {...line}
            }))
        }
    }, [stopArrivals, selectedStop, selectedStopsLine])

    if (isLoading || !lines) return <div>loading values...</div>
    if (isError) return <div>Error: {error?.message}</div>

    const handleSelected = (value:string, selectedState: boolean) => {
        setSelectedLine({value:value, selectedState: selectedState})
    }

    const handleSelectedStop = (lineId:string, stopId:string, stopState: boolean) => {
        setSelectedStop({value: stopId, selectedState: stopState})
        setSelectedStopsLine(lineId)
    }

    const reduceSelected = () => {
        for (let i = 1; i < lines.length; i++){
            if ((lines[i].stops.length === 0) !== (lines[i-1].stops.length === 0)){
                return 'multi'
            }
        }
        return lines[0].stops.length !== 0
    }

    const reduceSelectedStops = (stops:Stop[]) => {
        for (let i = 1; i < stops.length; i++){
            if ((stops[i].arrivals.length === 0) !== (stops[i-1].arrivals.length === 0)){
                return 'multi'
            }
        }   
        return stops[0].arrivals.length !== 0
    }

    const toggleAll = () => {
        if(reduceSelected() === 'multi' || reduceSelected()){
            setLines(lines.map((line) => ({...line, stops: []})))
        }
    }

    const toggleAllStops = (lineId:string) => {
        setLines(lines.map((line) => {
            if (line.value === lineId) {
                if(reduceSelectedStops(line.stops) === 'multi' || reduceSelectedStops(line.stops)){
                    const newStops = line.stops
                    for (let i = 0; i < newStops.length; i++) {
                        newStops[i].arrivals = []
                    }
                    return {...line, stops:newStops}
                }
            }
            return {...line}
        }))
    }

        /*for (let i = 1; i < lines.length; i++){
            if (lines[i].value === lineId){
                if(reduceSelectedStops(lines[i].stops) === 'multi' || reduceSelectedStops(lines[i].stops)){
                    setLines(lines.map((line) => ({...line, stops: []})))
                }
            }
        }*/
    

    return (
        <div className='border-solid border-2 border-black m-2'>
            <LineMultiSelect
                name="Bus Routes"
                toggleAll={toggleAll} 
                lines={lines}
                handleSelected={handleSelected} 
                reduceSelected={reduceSelected} 
            /> 
            {lines.filter(line => line.stops.length !== 0).map(line => (
                <div key={line.value} className='border-solid border-2 border-black m-2'>
                    <StopMultiSelect 
                        lineId={line.value}
                        name={line.label} 
                        stops={line.stops} 
                        handleSelected={handleSelectedStop}
                        toggleAll={toggleAllStops} 
                        reduceSelected={reduceSelectedStops}                    
                    />
                    {/*<div key={line.value}>
                        {line.stops.map(stop=>(
                            <div key={stop.id}>{stop.commonName}</div>
                        ))}
                    </div>*/}
                    {line.stops.filter(stop => stop.arrivals.length !== 0).map(stop => (
                        <StopComponent
                            key={stop.id}
                            name={stop.commonName}
                            arrivals={stop.arrivals}
                        />
                    ))}
                </div>
            ))}

        </div>
    )
}

export default BusContainer