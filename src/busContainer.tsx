import axios from "axios"
import {Line} from "./types/busState"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import MultiSelect from "./multiSelect"

const fetchBusLines = async (): Promise<Line[]> => { 
    const response = await axios.get('https://api.tfl.gov.uk/Line/Mode/bus/Route')
    return response.data.map((line: any) => ({
            value: line.id,
            label: line.name,
            selected: false
        }))
}

const BusContainer = () => {

    const {isLoading, isError, data, error} = useQuery({
        queryKey: ['fetchBusLines'],
        queryFn: fetchBusLines,
    })

    const [lines, setLines] = useState<Line[]>([])
    useEffect(() => {
        if (data){setLines(data)}
    }, [data])

    if (isLoading || !lines) return <div>loading values...</div>
    if (isError) return <div>Error: {error?.message}</div>

    const handleSelected = (value:string) => {
        setLines(lines.map((select) => {
            if (select.value === value){
                return {...select, selected: !select.selected}
            }
            return select
        }))
    }

    const reduceSelected = () => {
        for (let i = 1; i < lines.length; i++){
            if (lines[i].selected !== lines[i-1].selected){
                return 'multi'
            }
        }
        return lines[0].selected 
    }

    const toggleAll = () => {
        if(reduceSelected() === 'multi' || reduceSelected()){
            setLines(lines.map((option) => ({...option, selected: false})))
        } else {
            setLines(lines.map((option) => ({...option, selected: true})))
        }
    }

    return (
        <div>hello
            <MultiSelect 
                name="Bus Routes"
                toggleAll={toggleAll} 
                options={lines}
                handleSelected={handleSelected} 
                reduceSelected={reduceSelected} 
            /> 
            {lines.filter(line => line.selected === true).map(line => (
                line.label
            ))}

        </div>
    )
}

export default BusContainer