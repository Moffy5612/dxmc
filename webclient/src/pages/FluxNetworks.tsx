import { Bolt, ExpandMore } from "@mui/icons-material"
import { AppPage } from "../types"
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Modal, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { usePageContext } from "../App"
import '@/styles/Page.scss'
import SortableTable from "../components/SortableTable"
import {Line} from 'react-chartjs-2'
import { CategoryScale, Chart, ChartData, LinearScale, LineElement, Point, PointElement } from "chart.js"

const pageId = 1

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    opened: boolean;
  }

interface ChargeGraphProps {
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

const ChargeGraph = (props: ChargeGraphProps) => {
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
        {id:0, disablePadding:true, label:"Device Name", numeric:false},
        {id:1, disablePadding:true, label:"Device Type", numeric:false},
        {id:2, disablePadding:true, label:"x", numeric:false},
        {id:3, disablePadding:true, label:"y", numeric:false},
        {id:4, disablePadding:true, label:"z", numeric:false},
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
                                    <TableCell component="th" scope="row"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
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
                    <SortableTable heads={deviceHeaders} rows={[]}/>
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
                                <td><Typography></Typography></td>
                                <td><Typography>RF</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography>Total Buffer:</Typography></td>
                                <td><Typography></Typography></td>
                                <td><Typography>RF</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography>Energy Input:</Typography></td>
                                <td><Typography></Typography></td>
                                <td><Typography>RF/t</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography>Energy Output:</Typography></td>
                                <td><Typography></Typography></td>
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
                        id:0,
                        disablePadding: false,
                        label: "Member Name",
                        numeric: false
                    }]} rows={[]}/>
                </AccordionDetails>
            </Accordion>
            <Modal open={isModalOpen} onClose={()=>setModalOpen(false)}>
                <Box className="modal-box">
                    <h2>Statistics</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td><Typography>Total Energy:</Typography></td>
                                <td><Typography></Typography></td>
                                <td><Typography>RF</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography>Total Buffer:</Typography></td>
                                <td><Typography></Typography></td>
                                <td><Typography>RF</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography>Energy Input:</Typography></td>
                                <td><Typography></Typography></td>
                                <td><Typography>RF/t</Typography></td>
                            </tr>
                            <tr style={{marginBottom: 20}}>
                                <td><Typography>Energy Output:</Typography></td>
                                <td><Typography></Typography></td>
                                <td><Typography>RF/t</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography>Flux Storages:</Typography></td>
                                <td><Typography>x</Typography></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><Typography>Flux Controllers:</Typography></td>
                                <td><Typography>x</Typography></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><Typography>Flux Plugs:</Typography></td>
                                <td><Typography>x</Typography></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><Typography>Flux Points:</Typography></td>
                                <td><Typography>x</Typography></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    <Typography>Energy Charge:</Typography>
                    <ChargeGraph data={getGraphData([0,0,0,0,0,0])}/>
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
            <Box sx={{ flexGrow: 1, display: pageContext?.isMobile ? 'block':'flex'}}>
                <Tabs orientation={pageContext?.isMobile ? "horizontal":"vertical"} value={tabValue} onChange={handleTabChange}>
                    <Tab label="Network 0" {...a11yProps(0)}/>
                </Tabs>

                <TabPanel value={tabValue} index={0} opened={!pageContext?.isMobile}/>
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