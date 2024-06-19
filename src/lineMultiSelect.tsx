import { useState } from 'react'
import MultiSelectTopCheckbox from './multiSelectTopCheckbox'
import { Line } from './types/busState'

type MultiSelectProps = {
    name: string,
    lines: Line[],
    handleSelected: (value:string) => void,
    toggleAll: () => void,
    reduceSelected: () => boolean | 'multi'
}

const LineMultiSelect = ({name, lines, handleSelected, toggleAll, reduceSelected}: MultiSelectProps) => {

    const [isHidden, setIsHidden] = useState(true)

    if (isHidden) return <div className='border-solid border-2 border-black rounded-md m-2' onClick={() => setIsHidden(!isHidden)}>{name} <span className='float-right pr-2'>v</span></div>

    return (
        <div className='box-border border-solid border-2 border-black rounded-md m2 relative'>
            <div onClick={() => setIsHidden(!isHidden)}>{name} <span className='float-right pr-2'>^</span></div>
            <ul className='absolute z-10 bg-white border-2  border-black rounded-md w-full mt-1 left-0'>
                <li onClick={toggleAll}>
                    <MultiSelectTopCheckbox isAllSelected={reduceSelected()}/>
                </li>
                {lines.map((line) => (
                    <li onClick={() => handleSelected(line.value)} key={line.value} >
                        {line.label} {line.stops.length > 0 ? <span>selected</span> : null}
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default LineMultiSelect 
