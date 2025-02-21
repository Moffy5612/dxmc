import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { createContext, useContext, useState, useEffect } from "react";
import { AppContext, AppPage } from "./types";
import { Menu } from "@mui/icons-material";
import Authorizer from "./components/Authorizer";
import Home from "./pages/Home";
import ThemeSwitcher from "./components/ThemeSwitcher";

import "@/styles/App.scss"

const PageContext = createContext<AppContext | undefined>(undefined)

const Pages: AppPage[] = [
  Home,
]

const App = () => {
  const [isDark, setDark] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [pageId, setPageId] = useState(0)
  const [isAuthMode, setAuthMode] = useState(false)
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
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
    const listItem:JSX.Element[] = []
    for(const page of Pages){
      listItem.push((
        <ListItem key={page.menu.label} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {page.menu.icon}
            </ListItemIcon>
            <ListItemText primary={page.menu.label} />
          </ListItemButton>
        </ListItem>
      ))
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
    <PageContext.Provider value={{ page: pageId, setPage: setPageId, isMobile, isAuthMode}}>
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
                onClick={()=>setOpen(true)}
              >
                <Menu />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                DXMC
              </Typography>
                <ThemeSwitcher isDark={isDark} setDark={setDark}/>
                <Authorizer isAuth={isAuthMode} setAuth={setAuthMode}/>
            </Toolbar>
          </AppBar>
          <nav>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              <span className="drawer">
                <h3>DXMC</h3>
                {DrawerList()}
              </span>
            </Drawer>
          </nav>
        </Box>
        
        <Box component="main" sx={{ p: 3 }}>
          {Page()}
        </Box>
      </span>
    </PageContext.Provider>
  );
};

export default App

export const usePageContext = () => {
  return useContext(PageContext);
};