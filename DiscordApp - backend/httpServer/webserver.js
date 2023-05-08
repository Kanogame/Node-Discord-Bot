const WebSocket = require("ws");

module.exports = { startWSserver }

class WebSocketServer {
    constructor(port) {
        this.WsServer = new WebSocket.Server({ port: port });
        this.Nextid = 0;
        this.Clients = new Map();
        setServer();
    }

    startServer() {
        this.WsServer.on("connection", onConnect);
    }

    onConnect(wsClient) {  
        wsClient.on("message", onMessage);
    }

    onMessage(messageStr) {
        const message = JSON.parse(messageStr);
        console.log(message);
    }
}

function startWSserver() {
    

    WsServer.on("connection", onConnect);
    
    WsServer.on("close", () => { console.log("closed") });
}

function onConnect() {

}