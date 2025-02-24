export type AE2Item = {
    name: string
    fingerPrint?: string
    amount: number
    displayName: string
    isCraftable: boolean
    nbt?: any
    tags: string[] 
}

export type AE2Data = {
    items?: AE2Item[]
}