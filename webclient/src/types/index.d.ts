import { Component, Dispatch, SetStateAction } from "react";

export type ReactState<T> = [T, Dispatch<SetStateAction<T>>]

export type AppContext = {
    page: number,
    setPage: Dispatch<SetStateAction<number>>,
    isMobile: boolean,
    isAuthMode: boolean
}

export type AppPage={
    id: number,
    page:()=>JSX.Element,
    menu:{
        icon:JSX.Element,
        label:string
    },
    applyEffect?: (ws:WebSocket, data:any)=>void 
}
