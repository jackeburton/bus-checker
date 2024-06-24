import { useState } from 'react'
import MultiSelectTopCheckbox from './multiSelectTopCheckbox'
import { Stop } from './types/busState'

type StopMultiSelectProps = {
    lineId: string
    name: string,
    stops: Stop[],
    handleSelected: (lineId:string, stopId:string, stopState:boolean) => void,
    toggleAll: (lineId:string) => void,
    reduceSelected: (stops:Stop[]) => boolean | 'multi'
}

const StopMultiSelect = ({lineId, name, stops, handleSelected, toggleAll, reduceSelected}: StopMultiSelectProps) => {

    const [isHidden, setIsHidden] = useState(true)

    if (isHidden) return <div className='border-solid border-2 border-black rounded-md m-2' onClick={() => setIsHidden(!isHidden)}>{name} <span className='float-right pr-2'>v</span></div>

    return (
        <div className='border-solid border-2 border-black rounded-md m-2'>
            <div onClick={() => setIsHidden(!isHidden)}>{name} <span className='float-right pr-2'>^</span></div>
            <ul className='absolute z-10 bg-white border-2  border-black rounded-md w-full mt-1 left-0'>
                <li onClick={() => toggleAll(lineId)}>
                    <MultiSelectTopCheckbox isAllSelected={reduceSelected(stops)}/>
                </li>
                {stops.map((stop) => (
                    <li onClick={() => handleSelected(lineId, stop.id, stop.arrivals.length !== 0)} key={stop.id} >
                        {stop.commonName} {stop.arrivals.length > 0 ? <span>selected</span> : null}
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default StopMultiSelect 
