import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { memo, useEffect, useState } from "react"

type LineProps = {
    lineValue: string,
    lineLabel: string,
    lineId: string
}

type Arrival = {
    timeToStation: string,
    lineId: string,
    id: string
}

const fetchBusStopArrivals = async (stop:string, lineId:string): Promise<Arrival[]> => { 
    const response = await axios.get(`https://api.tfl.gov.uk/Line/${lineId}/Arrivals/${stop}`)
    return response.data.map((arrival: any) => ({
            timeToStation: arrival.timeToStation,
            lineId: arrival.lineId,
            id: arrival.id
        }))
}

const Line = ({lineValue, lineLabel, lineId}:LineProps) => {
    console.log('line render')
    console.log(lineLabel)

    const {isLoading, isError, data, error} = useQuery({
        queryKey: ['fetchBusStopArrivals'],
        queryFn: () => fetchBusStopArrivals(lineValue, lineId),
    })

    const [arrivals, setArrivals] = useState<Arrival[]>([])
    useEffect(() => {
        if (data){setArrivals(data.filter(arrival => arrival.lineId === lineId))}
    }, [data])
    if (isLoading || !arrivals) return <div>loading values...</div>
    if (isError) return <div>Error: {error?.message}</div>

    return (
        <ul>
            {arrivals.map((arrival) => (
                <li key={arrival.id}>
                    <div className="m-2">
                    {lineLabel} {arrival.timeToStation}
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default Line