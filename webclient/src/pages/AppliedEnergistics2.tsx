import { useState } from 'react'
import '../styles/Page.scss'
import { ReactState } from '../types'
import { Box } from '@mui/material'

const pageId = 3

const AppliedEnergistics2Page = () => {
    const[socket, setSocket]:ReactState<WebSocket | undefined> = useState()
    const[data, setData]:ReactState<any> = useState({})

    return(
        <Box className={"page"}>

        </Box>
    )
}