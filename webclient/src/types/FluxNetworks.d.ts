type Connections = {
    name: string
    type: string
    pos: {
        x: number
        y: number
        z: number
    }
}

export type FluxNetworksData = {
    networkInfo: {
        name: string
        securityLevel: string
        owner: string
        members: string[]
    }
    connections: Connections[]
    statistics: {
        totalEnergy: number
        totalBuffer: number
        energyInput: number
        energyOutput: number
        fluxStorageCount: number
        fluxControllerCount: number
        fluxPlugCount: number
        fluxPointCount: number
        averageTickMicro: number
        energyChange:number[]
    }
}