import { Button, TextField, Typography } from "@mui/material"
import { Dispatch, SetStateAction, useState } from "react"
import { AUTH_PASSWORD } from "../api/pwd"
import { Check } from "@mui/icons-material"

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
        setAuth(password === AUTH_PASSWORD)
        setCanInput(false)
    }

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