import { Avatar, Box, Button, ClickAwayListener, Divider, List, ListItem, ListItemText, Modal, Tooltip, Typography } from "@mui/material"
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react"
import { initializeApp } from "firebase/app"
import { getAuth, User } from "firebase/auth"
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore"
import { FIREBASE_CONFIG } from "../env/env"
import { auth } from "firebaseui"
import firebase from "firebase/compat/app"

declare const AUTH_PASSWORD : string

type AuthModeState = {
    user: User | undefined,
    roles: string[]
    setUser: Dispatch<SetStateAction<User | undefined>>
    setRoles: Dispatch<SetStateAction<string[]>>
}

const app = initializeApp(FIREBASE_CONFIG) 
const authInfo = getAuth()
const fbAuthUI = new auth.AuthUI(authInfo)
const db = getFirestore(app)

const Authorizer = ({user, roles, setUser, setRoles}: AuthModeState) => {

    const [isModalOpen, setModalOpen] = useState(false)
    const [isTooltipOpen, setTooltipOpen] = useState(false)

    const handleAuthButtonClick = () => {
        setModalOpen(true)
    }

    const logout = async() => {
        await authInfo.signOut()
        setUser(undefined)
    }

    const getRoles = (user: User) => {
        getDoc(doc(db, "roles", user.uid)).then((roleDoc)=>{
            if(roleDoc.exists()){
                setRoles(roleDoc.get("roles"))
            }else{
                setDoc(doc(db, "roles", user.uid),{roles:[]})
            }
        })
    }

    useEffect(()=>{
        authInfo.onAuthStateChanged((user) => {
            if(user){
                setUser(user)
                getRoles(user)
            }
        })

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                        if(node.nodeType === 1){
                            const element = node as HTMLElement
                            if(element.id === "authorize-modal"){
                                fbAuthUI.start('#firebaseui-auth-container',{
                                    callbacks:{
                                        signInSuccessWithAuthResult(authResult, _redirectUrl) {
                                            setUser(authResult)
                                            getRoles(authResult)
                                            return true
                                        },
                                        signInFailure(){
                                            setUser(undefined)
                                        }
                                    },
                                    signInSuccessUrl: location.href,
                                    signInFlow: "popup",
                                    signInOptions:[
                                        {provider: firebase.auth.EmailAuthProvider.PROVIDER_ID},
                                        {provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID},
                                        {provider: firebase.auth.GithubAuthProvider.PROVIDER_ID},
                                    ]
                                })
                            }
                        }
                });
            });
        });

        observer.observe(document.body, { childList: true });
        
        
    },[])

    return(
    <>
        {
        !user &&
        <span>
            <Button color="inherit" onClick={handleAuthButtonClick}>Login</Button>
        </span>
        }
        {
        user &&
        <span style={{alignItems:"center", display:"inline-flex"}}>
            <ClickAwayListener onClickAway={()=>setTooltipOpen(false)}>
            <div>
              <Tooltip
                onClose={()=>setTooltipOpen(false)}
                open={isTooltipOpen}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={
                    <Fragment>
                        <div style={{padding:10}}>
                            <h3>UserName</h3>
                            <Typography variant="h6" sx={{marginBottom: 3}}>{user.displayName}</Typography>
                            <Divider/>
                            <h3>Roles</h3>
                            <List>
                                {
                                    roles.length < 1 &&
                                    <ListItem>
                                        <ListItemText>Visitor</ListItemText>
                                    </ListItem>
                                }
                                {
                                    roles.map((role, i)=>{
                                        if(i < 5){
                                            return (
                                                <ListItem>
                                                    <ListItemText>{role}</ListItemText>
                                                </ListItem>
                                            )
                                        }
                                        return <></>
                                    })
                                }
                            </List>
                                {
                                    roles.length > 4 &&
                                    <Typography align="right">...more {roles.length - 4}</Typography>
                                }
                            <Divider/>
                            <Button onClick={(logout)}>Logout</Button>
                        </div>
                    </Fragment>
                }
                slotProps={{
                  popper: {
                    disablePortal: true,
                  },
                }}
              >
                <Button onClick={()=>setTooltipOpen(true)}>
                    <Avatar src={user.photoURL ? user.photoURL : ''}>{user.photoURL == null ? (user.displayName ? user.displayName[0] : "") : ""}</Avatar>
                </Button>
              </Tooltip>
            </div>
          </ClickAwayListener>
        </span>
        }
        <Modal open={isModalOpen} onClose={()=>setModalOpen(false)} id="authorize-modal">
            <Box className="modal-box">
                <div id="firebaseui-auth-container"></div>
            </Box>
        </Modal>
    </>
    )
    
}

export default Authorizer