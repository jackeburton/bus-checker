import axios from "axios"
import MultiSelect from "./multiSelect"
import { ListOption } from "./types/listOption"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import LineWrapper from "./lineWrapper"

const fetchBusLines = async (): Promise<ListOption[]> => { 
    const response = await axios.get('https://api.tfl.gov.uk/Line/Mode/bus/Route')
    return response.data.map((line: any) => ({
            value: line.id,
            label: line.name,
            selected: false
        }))
}

const BusWrapper = () => {

    const {isLoading, isError, data, error} = useQuery({
        queryKey: ['fetchBusLines'],
        queryFn: fetchBusLines,
    })

    const [options, setOptions] = useState<ListOption[]>([])
    useEffect(() => {
        if (data){setOptions(data)}
    }, [data])

    if (isLoading || !options) return <div>loading values...</div>
    if (isError) return <div>Error: {error?.message}</div>

    const handleSelected = (value:string) => {
        setOptions(options.map((select) => {
            if (select.value === value){
                return {...select, selected: !select.selected}
            }
            return select
        }))
    }

    const reduceSelected = () => {
        for (let i = 1; i < options.length; i++){
            if (options[i].selected !== options[i-1].selected){
                return 'multi'
            }
        }
        return options[0].selected 
    }

    const toggleAll = () => {
        if(reduceSelected() === 'multi' || reduceSelected()){
            setOptions(options.map((option) => ({...option, selected: false})))
        } else {
            setOptions(options.map((option) => ({...option, selected: true})))
        }
    }

    return (
        <div className='border-solid border-2 border-black rounded-md w-80'>
            <MultiSelect 
                name="Bus Routes"
                toggleAll={toggleAll} 
                options={options} 
                handleSelected={handleSelected} 
                reduceSelected={reduceSelected} 
            /> 
            
            {options.filter(line => line.selected === true).map((line) => (
                <LineWrapper key={line.value} value={line.value} label={line.label}/>
            ))}
            
        </div>
    )
    
}

export default BusWrapper