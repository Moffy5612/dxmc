import { Dispatch, SetStateAction } from "react";

export type ReactState<T> = [T, Dispatch<SetStateAction<T>>]

export type AppPage = {
    page: number,
    setPage: Dispatch<SetStateAction<number>>,
    isMobile: boolean
}

export type AppEffect={
    id: number,
    applyEffect: (ws:WebSocket, data:any)=>void 
}