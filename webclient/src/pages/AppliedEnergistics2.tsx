import { useEffect, useState } from 'react'
import '../styles/Page.scss'
import { AppPage, ReactState } from '../types'
import { Box } from '@mui/material'
import { AE2Data } from '../types/appliedEnergistics2'
import { addApplyEffect } from '../App'

const pageId = 3

const AppliedEnergistics2Page = () => {
    const[socket, setSocket]:ReactState<WebSocket | undefined> = useState()
    const[data, setData]:ReactState<AE2Data> = useState({})

    useEffect(()=>{
        addApplyEffect(pageId, (ws: WebSocket, data: any) => {
            if(!socket){
                setSocket(ws)
            }

            let addFlg = true
            const dataCopy = JSON.parse(JSON.stringify(data))
            
            if()
            setData(data)
        })
    },[])

    return(
        <Box className={"page"}>

        </Box>
    )
}

const page: AppPage = {
    id: pageId,
    page: AppliedEnergistics2Page,
    menu: {
        icon:(),
        label: "Applied Energistics 2"
    }
}