type TickBoxProps = {
    selected: boolean
}
const TickBox = ({selected = false} : TickBoxProps) => {
    
    if (selected){
        return (
        <span className="box-border border-solid border-2 border-black min-h-5 min-w-5 max-h-5 max-w-5 inline-block align-middle">
            &#x2713;
        </span>
        )
    }
    return (
        <span className="box-border border-solid border-2 border-black min-h-5 min-w-5 max-h-5 max-w-5 inline-block align-middle"></span>
    )
}

export default TickBox