export type Line = {
    value: string,
    label: string,
    stops: Stop[]
}

export type Stop = {
    id: string,
    arrivals?: Arrival[]
}

export type Arrival = {
    arrivalTime : string
}