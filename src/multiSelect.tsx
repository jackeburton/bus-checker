import { useState } from 'react'
import MultiSelectTopCheckbox from './multiSelectTopCheckbox'
import { Line, Stop } from './types/busState'
import { MultiSelectProps } from './types/multiSelectProps'
import TickBox from './tickBox'

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

    if (isHidden) return <div className='border-solid border-2 border-black rounded-md m-2' onClick={() => setIsHidden(!isHidden)}>{name} <span className='float-right pr-2'>v</span></div>

    

    return (
        <div className='border-solid border-2 border-black rounded-md m-2'>
            <div onClick={() => setIsHidden(!isHidden)}>{name} <span className='float-right pr-2'>^</span></div>
            <ul className='absolute z-10 bg-white border-2  border-black rounded-md w-full mt-1 left-0'>
                <li>
                    <input className='border-2  border-black' 
                        value={searchText}
                        onChange={text => setSearchText(text.target.value)}
                    />
                </li>
                <li onClick={() => toggle()}>
                    <MultiSelectTopCheckbox isAllSelected={reduce()}/>
                </li>
                {props.items.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())).map((item) => (
                    <li onClick={() => handleMultiSelect(item)} key={item.id} >
                        <TickBox selected = {handleTickBoxSelect(item)}/> {item.name} 
                    </li>
                )
                
                )}
            </ul>
        </div>
    )

}

export default MultiSelect 
