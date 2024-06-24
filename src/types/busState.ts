export type Line = {
    value: string,
    label: string,
    stops: Stop[]
}

export type Stop = {
    id: string,
    commonName: string,
    arrivals: Arrival[]
}

export type Arrival = {
    id: string
    arrivalTime : string
}