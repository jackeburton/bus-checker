import { useState } from 'react'
import MultiSelectTopCheckbox from './multiSelectTopCheckbox'
import { Line, Stop } from './types/busState'
import { MultiSelectProps } from './types/multiSelectProps'
import TickBox from './tickBox'
import { IconSelect } from '@tabler/icons-react';

const MultiSelect = ({name, props}: MultiSelectProps) => {

    const toggle = () => {
        if ('lineId' in props){
            props.toggleAll(props.lineId)
        } else {
            props.toggleAll()
        }
    }

    const reduce = () => {
        if ('lineId' in props){
            return props.reduceSelected(props.items)
        } else {
            return props.reduceSelected()
        }
    }

    const handleMultiSelect = (item: Line | Stop) => {
        if ('lineId' in props && 'arrivals' in item){
            props.handleSelected(props.lineId, item.id, item.arrivals.length !== 0)
        } else if (!('lineId' in props) && 'stops' in item){
            props.handleSelected(item.id, item.stops.length !== 0)
        }
    }

    const handleTickBoxSelect = (item: Line | Stop) => {
        if ('lineId' in props && 'arrivals' in item){
            return item.arrivals.length > 0
        } else if (!('lineId' in props) && 'stops' in item){
            return item.stops.length > 0
        }
        return false
    }

    const [isHidden, setIsHidden] = useState(true)
    const [searchText, setSearchText] = useState('')

    let classname ='border-solid border-2 border-black rounded-md m-2 bg-white shadow-custom relative h-10 text-lg'

    if (isHidden) return <div className={classname} onClick={() => setIsHidden(!isHidden)}><div className='mt-1 ml-3'>{name} <IconSelect className='z-0 rotate-90 float-right mr-2 h-7' stroke={2} /> </div></div>
    
    return (
        <div className={classname}>
            <div className='mt-1 ml-3' onClick={() => setIsHidden(!isHidden)}>{name} <IconSelect className=' z-0 float-right h-10 mr-2' stroke={2} /></div>
            <ul className='absolute bg-white border-2  border-black rounded-md mt-2 left-0 z-50 w-full'>
                <li className='m-1'>
                    <input className='border-2  border-black w-full' 
                        autoFocus
                        value={searchText}
                        onChange={text => setSearchText(text.target.value)}
                    />
                </li>
                <li onClick={() => toggle()} className='m-0.5'>
                    <MultiSelectTopCheckbox isAllSelected={reduce()}/>
                </li>
                {props.items.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())).map((item) => (
                    <li onClick={() => handleMultiSelect(item)} key={item.id} className='cursor-pointer w-full m-0.5'>
                        <TickBox selected = {handleTickBoxSelect(item)}/> {item.name}
                    </li>
                )
                
                )}
            </ul>
        </div>
    )

}

export default MultiSelect 
