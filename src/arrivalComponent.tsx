type ArrivalProps = {
    arrivalTime: string
}

const StopComponent = ({arrivalTime}:ArrivalProps) => {
    return (
        <div>
            {arrivalTime}
        </div>
    )
}

export default StopComponent