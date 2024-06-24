import MultiSelect from "./multiSelect"
import StopMultiSelect from "./stopMultiSelect"
import { Line } from "./types/busState"

type LineComponentProps = {
    line: Line,
    selectStop: (value:string, selectedState: boolean) => void,
    toggleAll: () => void,
    reduceSelected: () => boolean | 'multi'
}

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