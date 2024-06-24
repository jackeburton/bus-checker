export type Line = {
    id: string,
    name: string,
    stops: Stop[]
}

export type Stop = {
    id: string,
    name: string,
    arrivals: Arrival[]
}

export type Arrival = {
    id: string
    arrivalTime : string
}