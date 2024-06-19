import { useState } from 'react'
import { ListOption } from './types/listOption'
import MultiSelectTopCheckbox from './multiSelectTopCheckbox'

type MultiSelectProps = {
    name: string,
    options: ListOption[],
    handleSelected: (value:string) => void,
    toggleAll: () => void,
    reduceSelected: () => boolean | 'multi'
}

const MultiSelect = ({name, options, handleSelected, toggleAll, reduceSelected}: MultiSelectProps) => {

    const [isHidden, setIsHidden] = useState(true)

    if (isHidden) return <div className='border-solid border-2 border-black rounded-md m-2' onClick={() => setIsHidden(!isHidden)}>{name} <span className='float-right pr-2'>v</span></div>

    return (
        <div className='box-border border-solid border-2 border-black rounded-md m2 relative'>
            <div onClick={() => setIsHidden(!isHidden)}>{name} <span className='float-right pr-2'>^</span></div>
            <ul className='absolute z-10 bg-white border-2  border-black rounded-md w-full mt-1 left-0'>
                <li onClick={toggleAll}>
                    <MultiSelectTopCheckbox isAllSelected={reduceSelected()}/>
                </li>
                {options.map((option) => (
                    <li onClick={() => handleSelected(option.value)} key={option.value} >
                        {option.label} {option.selected ? <span>selected</span> : null}
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default MultiSelect 
