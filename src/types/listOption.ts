export type InitialOption = {
    value: string,
    label: string,
}

export type InitialOptions = {
    options: InitialOption[]
}

export type ListOption = {
    value: string,
    label: string,
    selected: boolean
}

export type ListOptions = {
    options: ListOption[]
}