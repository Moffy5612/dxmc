import { User } from "firebase/auth";
import { Component, Dispatch, SetStateAction } from "react";

export type ReactState<T> = [T, Dispatch<SetStateAction<T>>]

export type AppContext = {
    page: number,
    setPage: Dispatch<SetStateAction<number>>,
    isMobile: boolean,
    roles: string[]
    user?: User
}

export type AppEffect=(ws:WebSocket, data:any)=>void 

export type AppPage={
    id: number,
    page:()=>JSX.Element,
    menu:{
        icon:JSX.Element,
        label:string
    },
    applyEffect?: AppEffect
}
