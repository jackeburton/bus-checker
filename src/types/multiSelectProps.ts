import { Line, Stop } from "./busState"

export type StopProps = {
    lineId: string
    handleSelected: (lineId:string, stopId:string, stopState:boolean) => void,
    toggleAll: (lineId:string) => void,
    reduceSelected: (stops:Stop[]) => boolean | 'multi',
    items: Stop[],
}

export type LineProps = {
    handleSelected: (value:string, selectedState: boolean) => void,
    toggleAll: () => void,
    reduceSelected: () => boolean | 'multi'
    items: Line[],
}

export type MultiSelectProps = {
    name: string,
    props: StopProps | LineProps
}