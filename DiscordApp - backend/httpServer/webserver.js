const { useTimeline } = require("discord-player");
const WebSocket = require("ws");
const Music = require("../utils/Music");

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
        wsClient.on("message", (messageStr, wsClient) => {
            const message = JSON.parse(messageStr);
            if (message.type === "init") {
                this.newMusicConnection(message.payload, wsClient);
            }
        });
    }

    newMusicConnection(data, wsClient) {
        const guildid = getGuild(data.token, data.password);
        const timeline = useTimeline(guildid);
        let inteval = setInterval(() => {
            wsClient.send(timeline.timestamp.progress);
        }, 1000);
    }
}

module.exports = { WebSocketServer }