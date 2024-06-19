import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import { ListOption } from './types/listOption'
import { memo, useEffect, useState } from 'react'
import MultiSelect from './multiSelect'
import Line from './line'

type LineWrapperProps = {
    value: string,
    label: string,
}

const fetchBusLineStops = async (value: string): Promise<ListOption[]> => { 
    const response = await axios.get(`https://api.tfl.gov.uk/line/${value}/stoppoints`)
    return response.data.map((line: any) => ({
            value: line.id,
            label: line.commonName,
            selected: false
        }))
}

const LineWrapper = ({value, label}:LineWrapperProps) => {
    
    const {isLoading, isError, data, error} = useQuery({
        queryKey: ['fetchBusLineStops'],
        queryFn: () => fetchBusLineStops(value),
    })

    const [busStops, setBusStops] = useState<ListOption[]>([])
    useEffect(() => {
        if (data){setBusStops(data)}
    }, [data])
    if (isLoading || !busStops) return <div>loading values...</div>
    if (isError) return <div>Error: {error?.message}</div>

    const handleSelected = (value:string) => {
        setBusStops(busStops.map((select) => {
            if (select.value === value){
                return {...select, selected: !select.selected}
            }
            return select
        }))
    }

    const reduceSelected = () => {
        for (let i = 1; i < busStops.length; i++){
            if (busStops[i].selected !== busStops[i-1].selected){
                return 'multi'
            }
        }
        return busStops[0].selected 
    }

    const toggleAll = () => {
        if(reduceSelected() === 'multi' || reduceSelected()){
            setBusStops(busStops.map((option) => ({...option, selected: false})))
        } else {
            setBusStops(busStops.map((option) => ({...option, selected: true})))
        }
    }

    return (
        <div className='border-solid border-2 border-black rounded-md m-2'>
            linewrapper
        <MultiSelect
            name={label}
            toggleAll={toggleAll} 
            options={busStops} 
            handleSelected={handleSelected} 
            reduceSelected={reduceSelected} 
        /> 
        {busStops.filter(stop => stop.selected === true).map((stop) => (
            <Line 
                key={value + stop.value} 
                lineValue={stop.value}
                lineLabel={stop.label}
                lineId={value}
            />
        ))}
        </div>
    )

}

export default memo(LineWrapper)
