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

    const [routes, setRoutes] = useState<ListOption[]>([])
    useEffect(() => {
        if (data){setRoutes(data)}
    }, [data])

    if (isLoading || !routes) return <div>loading values...</div>
    if (isError) return <div>Error: {error?.message}</div>

    const handleSelected = (value:string) => {
        setRoutes(routes.map((select) => {
            if (select.value === value){
                return {...select, selected: !select.selected}
            }
            return select
        }))
    }

    const reduceSelected = () => {
        for (let i = 1; i < routes.length; i++){
            if (routes[i].selected !== routes[i-1].selected){
                return 'multi'
            }
        }
        return routes[0].selected 
    }

    const toggleAll = () => {
        if(reduceSelected() === 'multi' || reduceSelected()){
            setRoutes(routes.map((option) => ({...option, selected: false})))
        } else {
            setRoutes(routes.map((option) => ({...option, selected: true})))
        }
    }

    return (
        <div className='border-solid border-2 border-black rounded-md w-80'>
            <MultiSelect 
                name="Bus Routes"
                toggleAll={toggleAll} 
                options={routes} 
                handleSelected={handleSelected} 
                reduceSelected={reduceSelected} 
            /> 
            
            {routes.filter(line => line.selected === true).map((line) => (
                <LineWrapper key={line.value} value={line.value} label={line.label}/>
            ))}
            
        </div>
    )
    
}

export default BusWrapper