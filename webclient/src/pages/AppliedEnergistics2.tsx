import { useEffect, useState } from 'react'
import '../styles/Page.scss'
import { AppPage, ReactState } from '../types'
import { Box } from '@mui/material'
import { AE2Data } from '../types/appliedEnergistics2'
import { addApplyEffect } from '../App'
import { Public } from '@mui/icons-material'

const pageId = 3

const AppliedEnergistics2Page = () => {
    const[socket, setSocket]:ReactState<WebSocket | undefined> = useState()
    const[data, setData]:ReactState<AE2Data> = useState({})

    useEffect(()=>{
        addApplyEffect(pageId, (ws: WebSocket, data: any) => {
            if(!socket){
                setSocket(ws)
            }

            const dataCopy = JSON.parse(JSON.stringify(data)) as AE2Data
            
            if(data.items){
                dataCopy.items = data.items
            }
            setData(data)
        })
    },[])

    return(
        <Box className={"page"}>
            <header>
                <h1>Applied Energistics 2</h1>
            </header>
            <div>{data.items ? JSON.stringify(data.items[0]) : ''}</div>
        </Box>
    )
}

const AppliedEnergistics2: AppPage = {
    id: pageId,
    page: AppliedEnergistics2Page,
    menu: {
        icon:(<Public/>),
        label: "Applied Energistics 2"
    }
}

export default AppliedEnergistics2