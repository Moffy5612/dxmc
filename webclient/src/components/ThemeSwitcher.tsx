import { DarkMode, LightMode } from "@mui/icons-material"
import { Button, IconButton } from "@mui/material"
import { Dispatch, SetStateAction } from "react"

type DarkModeState = {isDark: boolean, setDark:Dispatch<SetStateAction<boolean>>}



const ThemeSwitcher=({isDark, setDark}:DarkModeState)=>{

    const switchTheme = () => {
        setDark(!isDark)
    }

    return(
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="switch theme"
            sx={{ mr: 2 }}
            onClick={switchTheme}
            >
            {
                isDark &&
                <DarkMode />
            }
            {
                !isDark &&
                <LightMode />
            }
        </IconButton>
    )
}

export default ThemeSwitcher