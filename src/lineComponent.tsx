import MultiSelect from "./multiSelect"
import { Line } from "./types/busState"

const LineComponent = ({value, label, stops}:Line) => {
    return (
        <StopMultiSelect
            name={label}
            toggleAll={toggleAll} 
            stops={stops}
            handleSelected={handleSelected} 
            reduceSelected={reduceSelected} 
        />
    )
} 

export default LineComponent