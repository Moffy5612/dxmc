import { AppBar, Container, Toolbar } from "@mui/material";
import { createContext, useContext, useState, useEffect } from "react";
import { AppEffect, AppPage } from "./types";

const PageContext = createContext<AppPage | undefined>(undefined)

const AppEffects: AppEffect[] = []
const addAppEffect = (effect:AppEffect) => {
  for(let e of AppEffects){
    if(e.id === effect.id) return
  }
  AppEffects.push(effect)
}

const App = () => {
  const [isDark, setDark] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [page, setPage] = useState(0)

  useEffect(()=>{
    setMobile(window.innerWidth < window.innerHeight)
    setDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
  })
  
  useEffect(()=>{
    if(isDark) {
      document.documentElement.setAttribute("theme", "dark");
    } else {
      document.documentElement.setAttribute("theme", "light")
    }
  },[isDark])
  

  return (
    <PageContext.Provider value={{ page, setPage, isMobile }}>
      <div className="app">
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </PageContext.Provider>
  );
};

export default App

export const usePageContext = () => {
  return useContext(PageContext);
};