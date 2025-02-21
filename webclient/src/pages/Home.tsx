import { Box, Container } from "@mui/material"
import { AppPage } from "../types"
import { Home } from "@mui/icons-material"

const pageId = 0

const HomePage = () => {

    return (
    <Box className={"page"}>
        <header>
            <h1>Web Page of DXMC</h1>
        </header>

        <h2>What is DXMC?</h2>
        <p>DX Minecraft (DXMC) is a world where all systems are IoT-enabled using CC:Tweaked. Note that "DX" here stands for "Digital Transformation", not "Deluxe."</p>
        <p>IoT-integrated systems can receive remote commands via WebSocket communication from both web servers and web clients. This means that even users who don't own Minecraft Java Edition can control in-game infrastructure—whether they're on the go or using a smartphone.</p>
        <p>This webpage serves as the infrastructure management system for the DXMC world.</p>

        <h2>Usage</h2>
        <p>Use the menu drawer to select the information you want to view.</p>
        <p>Click the AUTHORIZE button in the top-right corner and enter the password to gain access to system commands.</p>
    </Box>
    )
}

const page: AppPage = {
    id: pageId,
    page: HomePage,
    menu: {
        icon: (<Home/>),
        label: "Home"
    }
}

export default page