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
        wsClient.on("message", (messageStr) => {
            const message = JSON.parse(messageStr);
            if (message.type === "init") {
                this.newMusicConnection(message.payload);
            }
        });
    }

    newMusicConnection(data) {
        getGuild(data.token, data.password) 
    }
}

module.exports = { WebSocketServer }