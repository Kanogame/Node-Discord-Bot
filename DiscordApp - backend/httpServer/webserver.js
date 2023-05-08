const WebSocket = require("ws");

class WebSocketServer {
    constructor(port) {
        this.WsServer = new WebSocket.Server({ port: port });
        this.Nextid = 0;
        this.Clients = new Map();
        this.setServer();
    }

    setServer() {
        this.WsServer.on("connection", this.onConnect);
    }

    onConnect(wsClient) {  
        wsClient.on("message", this.onMessage);
    }

    onMessage(messageStr) {
        const message = JSON.parse(messageStr);
        console.log(message);
    }
}

module.exports = { WebSocketServer }