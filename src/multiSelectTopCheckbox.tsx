type MultiSelectTopCheckboxProps = {
    isAllSelected: boolean | 'multi'
}


const MultiSelectTopCheckbox = ({isAllSelected}: MultiSelectTopCheckboxProps) => {
    if(isAllSelected === 'multi'){
        return <span>multi</span>
    } else if(isAllSelected){
        return <span>all</span>
    } else {
        return <span>none</span> 
    }
}

export default MultiSelectTopCheckbox