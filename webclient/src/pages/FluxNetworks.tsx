import { Bolt, ExpandMore } from "@mui/icons-material"
import { AppPage, ReactState } from "../types"
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Modal, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { addApplyEffect, usePageContext } from "../App"
import '@/styles/Page.scss'
import SortableTable from "../components/SortableTable"
import {Line} from 'react-chartjs-2'
import { CategoryScale, Chart, ChartData, LinearScale, LineElement, Point, PointElement } from "chart.js"
import { FluxNetworksData } from "../types/fluxnetworks"

const pageId = 2

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    opened: boolean;
    data: FluxNetworksData;
  }

interface ChangeGraphProps {
    children?: React.ReactNode;
    data: ChartData<"line", (number | Point | null)[], unknown>
}

const getGraphData = (data: number[]) => {
    return {
        labels: ["25", "20", "15", "10", "5", "0"],
        datasets: [
            {
                label: "Chages",
                data,
                borderColor: "rgb(75, 100, 192)"
            }
        ]
    }
}

const ChangeGraph = (props: ChangeGraphProps) => {
    return(
        <div>
            <Line
                height={300}
                width={300}
                data={props.data}
                options={{maintainAspectRatio:false}}
                id="chart-key"
            />
        </div>
    )
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, opened, ...other } = props;
  
    const [isModalOpen, setModalOpen] = useState(false)

    const deviceHeaders = [
        {label:"Device Name", key:"name"},
        {label:"Device Type", key:"type"},
        {label:"x", key:"x"},
        {label:"y", key:"y"},
        {label:"z", key:"z"},
    ]

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Accordion defaultExpanded={opened}>
                <AccordionSummary expandIcon={<ExpandMore style={{color:"#FFFFFF"}}/>}>
                    <h2>Network Info</h2>
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Network Name</TableCell>
                                    <TableCell align="right">Security Level</TableCell>
                                    <TableCell align="right">Owner Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell scope="row">{props.data.networkInfo.name}</TableCell>
                                    <TableCell align="right">{props.data.networkInfo.securityLevel}</TableCell>
                                    <TableCell align="right">{props.data.networkInfo.owner}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded={opened}>
                <AccordionSummary expandIcon={<ExpandMore style={{color:"#FFFFFF"}}/>}>
                    <h2>Devices</h2>
                </AccordionSummary>
                <AccordionDetails>
                    <SortableTable heads={deviceHeaders} rows={props.data.connections.map((connection: any, i: number)=>({
                        id: i,
                        name: connection.name, 
                        type:connection.type,
                        x:connection.pos.x,
                        y:connection.pos.y,
                        z:connection.pos.z
                        }))}/>
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded={opened}>
                <AccordionSummary expandIcon={<ExpandMore style={{color:"#FFFFFF"}}/>}>
                    <h2>Statistics</h2>
                </AccordionSummary>
                <AccordionDetails>
                    <table>
                        <tbody>
                            <tr>
                                <td><Typography>Total Energy:</Typography></td>
                                <td><Typography align="right">{props.data.statistics.totalEnergy}</Typography></td>
                                <td><Typography>RF</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography>Total Buffer:</Typography></td>
                                <td><Typography align="right">{props.data.statistics.totalBuffer}</Typography></td>
                                <td><Typography>RF</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography>Energy Input:</Typography></td>
                                <td><Typography align="right">{props.data.statistics.energyInput}</Typography></td>
                                <td><Typography>RF/t</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography>Energy Output:</Typography></td>
                                <td><Typography align="right">{props.data.statistics.energyOutput}</Typography></td>
                                <td><Typography>RF/t</Typography></td>
                            </tr>
                        </tbody>
                    </table>
                    <Button variant="outlined" className="button" onClick={()=>setModalOpen(true)}>Show More</Button>
                </AccordionDetails>
            </Accordion>
            <Accordion className="accordion" defaultExpanded={opened}>
                <AccordionSummary expandIcon={<ExpandMore style={{color:"#FFFFFF"}}/>}>
                    <h2>Members</h2>
                </AccordionSummary>
                <AccordionDetails>
                    <SortableTable heads={[{
                        label: "Member Name",
                        key: "name"
                    }]} rows={props.data.networkInfo.members.map((member:any, i: number)=>{
                        return {
                            id: i,
                            name: member
                        }
                    })}/>
                </AccordionDetails>
            </Accordion>
            <Modal open={isModalOpen} onClose={()=>setModalOpen(false)}>
                <Box className="modal-box">
                    <h2>Statistics</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td><Typography>Total Energy:</Typography></td>
                                <td><Typography align="right">{props.data.statistics.totalEnergy}</Typography></td>
                                <td><Typography>RF</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography>Total Buffer:</Typography></td>
                                <td><Typography align="right">{props.data.statistics.totalBuffer}</Typography></td>
                                <td><Typography>RF</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography>Energy Input:</Typography></td>
                                <td><Typography align="right">{props.data.statistics.energyInput}</Typography></td>
                                <td><Typography>RF/t</Typography></td>
                            </tr>
                            <tr style={{marginBottom: 20}}>
                                <td><Typography>Energy Output:</Typography></td>
                                <td><Typography align="right">{props.data.statistics.energyOutput}</Typography></td>
                                <td><Typography>RF/t</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography>Flux Storages:</Typography></td>
                                <td><Typography align="right">x{props.data.statistics.fluxStorageCount}</Typography></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><Typography>Flux Controllers:</Typography></td>
                                <td><Typography align="right">x{props.data.statistics.fluxControllerCount}</Typography></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><Typography>Flux Plugs:</Typography></td>
                                <td><Typography align="right">x{props.data.statistics.fluxPlugCount}</Typography></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><Typography>Flux Points:</Typography></td>
                                <td><Typography align="right">x{props.data.statistics.fluxPointCount}</Typography></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    <Typography>Energy Change:</Typography>
                    <ChangeGraph data={getGraphData(props.data.statistics.energyChange)}/>
                </Box>
            </Modal>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }



const FluxNetworksPage = () => {

    const pageContext = usePageContext()

    const[socket, setSocket]:ReactState<WebSocket | undefined> = useState()
    const[dataList, setDataList]:ReactState<any[]> = useState([] as any[])

    useEffect(()=>{
        addApplyEffect(pageId, (ws: WebSocket, data: any) => {
            if(!socket){
                setSocket(ws)
            }

            let addFlg = true
            const dataListCopy = JSON.parse(JSON.stringify(dataList))
            for(let i = 0; i < dataListCopy.length; i++){
                if(dataListCopy[i].networkInfo.name === data.networkInfo.name){
                    dataListCopy[i] = data
                    addFlg = false
                    break
                }
            }

            if(addFlg){
                dataListCopy.push(data)
            }
            console.log(data.connections)
            setDataList(dataListCopy)
        })
    },[])

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
      };

    useEffect(()=>{
        Chart.register(LineElement, CategoryScale, LinearScale, PointElement)
    },[])

    return(
        <Box className={"page"}>
            <header>
                <h1>Flux Networks</h1>
            </header>
            {
                dataList.length < 1 && 
                <h4><i>No Network...</i></h4>
            }
            <Box sx={{ flexGrow: 1, display: pageContext?.isMobile ? 'block':'flex'}}>
                <Tabs orientation={pageContext?.isMobile ? "horizontal":"vertical"} value={tabValue} onChange={handleTabChange}>
                    {
                        dataList.map((data, i)=>{
                            return <Tab label={data.networkInfo.name} {...a11yProps(i)}/>
                        })
                    }
                </Tabs>
                
                {
                    dataList.map((data, i)=>{
                        return <TabPanel value={tabValue} index={i} data={data} opened={!pageContext?.isMobile}/>
                    })
                }
            </Box>
        </Box>
    )
}

const page: AppPage = {
    id: pageId,
    page: FluxNetworksPage,
    menu: {
        icon: (<Bolt/>),
        label: "Flux Networks"
    }
}

export default page