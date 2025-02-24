import { WebSocket, WebSocketServer } from "ws"

const CC_PORT = 56121
const PAGE_PORT = 56122

 
const wsServer = () => {
    const cc_server=new WebSocketServer({port:CC_PORT})
    const web_server=new WebSocketServer({port:PAGE_PORT})

    let cc_socket:WebSocket | undefined

    cc_server.on('connection', (s)=>{
        cc_socket = s
        s.on('message', (data)=>{
            web_server.clients.forEach((client)=>{client.send(data.toString())})
        })
    })

    web_server.on("connection",(s)=>{
        s.on('message', (data)=>{
            console.log(data.toString())
            if(cc_socket)cc_socket.send(data.toString())
        })
    })
}

export default wsServer