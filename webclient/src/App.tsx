import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Toolbar, Typography } from "@mui/material";
import { createContext, useContext, useState, useEffect } from "react";
import { AppContext, AppEffect, AppPage, ReactState } from "./types";
import { Menu } from "@mui/icons-material";
import Authorizer from "./components/Authorizer";
import Home from "./pages/Home";
import FluxNetworks from "./pages/FluxNetworks";
import ThemeSwitcher from "./components/ThemeSwitcher";

import "@/styles/App.scss"
import { User } from "firebase/auth";
import AppliedEnergistics2 from "./pages/AppliedEnergistics2";

const PageContext = createContext<AppContext | undefined>(undefined)

const Pages: AppPage[] = [
  Home,
  FluxNetworks,
  AppliedEnergistics2
]

export const addApplyEffect = (id: number, effect:AppEffect) => {
  Pages.forEach(page=>{
    if(page.id===id){
      page.applyEffect=effect
    }
  })
}

const App = () => {
  const [isDark, setDark] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [pageId, setPageId] = useState(0)
  const [user, setUser]:ReactState<User | undefined> = useState()
  const [roles, setRoles] = useState([] as string[])
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterText, setFilterText] = useState("")
  

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  useEffect(()=>{
    setDark(Boolean(localStorage.getItem("darkmode")))
    let s =new WebSocket("ws://"+location.hostname+":56122")
    s.onmessage=(ev)=>{
      let data = JSON.parse(ev.data) 
      
      for(let page of Pages){
          if(page.id === data.id && page.applyEffect){
            page.applyEffect(s, data.data)
          }
      }
    }
  },[])

  useEffect(()=>{
    setMobile(window.innerWidth < window.innerHeight)
  })
  
  useEffect(()=>{
    if(isDark) {
      document.documentElement.setAttribute("theme", "dark");
    } else {
      document.documentElement.setAttribute("theme", "light")
    }
    localStorage.setItem("darkmode", String(isDark))
  },[isDark])
  
  const DrawerList = () => {
    const handleClick = (page: AppPage) => {
      setPageId(page.id)
    }

    const listItem:JSX.Element[] = []
    for(const page of Pages){
      if(filterText === "" || page.menu.label.toLowerCase().includes(filterText.toLowerCase())){
        listItem.push((
          <ListItem key={page.menu.label} disablePadding>
            <ListItemButton onClick={()=>handleClick(page)}>
              <ListItemIcon>
                {page.menu.icon}
              </ListItemIcon>
              <ListItemText primary={page.menu.label} />
            </ListItemButton>
          </ListItem>
        ))
      }
    }

    if(listItem.length < 1 && filterText !== ""){
      listItem.push(
        <ListItem key={"404"} disablePadding>
            <ListItemButton>
              <ListItemText><i>No pages were found.</i></ListItemText>
            </ListItemButton>
          </ListItem>
      )
    }
    return(<List>{listItem}</List>)
  }

  const Page = () => {
    for(const page of Pages){
      if(page.id === pageId){
        return page.page()
      }
    }
    return <></>
  }

  return (
    <PageContext.Provider value={{ page: pageId, setPage: setPageId, isMobile, roles, user}}>
      <span>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" component="nav">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={()=>setDrawerOpen(true)}
              >
                <Menu />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                DXMC
              </Typography>
                <ThemeSwitcher isDark={isDark} setDark={setDark}/>
                <Authorizer user={user} roles={roles} setUser={setUser} setRoles={setRoles}/>
            </Toolbar>
          </AppBar>
          <nav>
            <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
              <span className="drawer">
                <h3>DXMC</h3>
                <TextField label="filter" variant="filled" size="small" className="filter" value={filterText} onChange={(evt)=>setFilterText(evt.target.value)}></TextField>
                {DrawerList()}
              </span>
            </Drawer>
          </nav>
        </Box>
        
        <Box component="main" sx={{ p: 3 }}>
          <Page/>
        </Box>
      </span>
    </PageContext.Provider>
  );
};

export default App

export const usePageContext = () => {
  return useContext(PageContext);
};