import { Button, TextField, Typography } from "@mui/material"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Check } from "@mui/icons-material"

declare const AUTH_PASSWORD : string

type AuthModeState = {
    isAuth: boolean,
    setAuth: Dispatch<SetStateAction<boolean>>
}

const Authorizer = ({isAuth, setAuth}: AuthModeState) => {
    const [canInput, setCanInput] = useState(false)
    const [password, setPassword] = useState('')

    const handleAuthButtonClick = () => {
        setCanInput(true)
    }

    const confirmPassword = () => {
        console.log(AUTH_PASSWORD)
        setAuth(password === AUTH_PASSWORD)
        setCanInput(false)
    }

    useEffect(()=>{
        const param = new URLSearchParams(location.search)
        if(param.has("password")){
            const paramPass = param.get("password")
            setPassword(paramPass ? paramPass : '')
            confirmPassword()
        }
    })

    return(
    <>
        {
        canInput && 
        <span style={{alignItems:"center", display:"flex"}}>
            <TextField variant="filled" type="password" label="Password" onChange={(evt)=>setPassword(evt.target.value)}></TextField>
            <Button color="inherit" onClick={confirmPassword}>Confirm</Button>
        </span>
        }
        {
        !canInput && !isAuth &&
        <span>
            <Button color="inherit" onClick={handleAuthButtonClick}>Authorize</Button>
        </span>
        }
        {
        !canInput && isAuth &&
        <span style={{alignItems:"center", display:"inline-flex"}}>
            <Check/>
            <Typography>Authorized</Typography>
        </span>
        }
    </>
    )
    
}

export default Authorizer