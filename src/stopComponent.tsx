import ArrivalComponent from "./arrivalComponent"
import { Arrival } from "./types/busState"

type StopProps = {
    name: string
    arrivals: Arrival[]
}

const StopComponent = ({name, arrivals}:StopProps) => {
    if (arrivals.length === 0) return <div>loading values...</div>
    return (
        <div>
            {name} :          
            {arrivals.map(arrival => (
                <ArrivalComponent key={arrival.id} arrivalTime={arrival.arrivalTime}/>
            ))
            }
        </div>
    )
}

export default StopComponent