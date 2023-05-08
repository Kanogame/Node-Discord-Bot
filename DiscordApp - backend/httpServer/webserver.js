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
                if (this.verifyUser(message.payload)) {
                    wsClient.send(JSON.stringify({type: "success"}));
                    this.newMusicConnection(message.payload, wsClient);
                } else {
                    wsClient.send(JSON.stringify({type: "error", payload: {error: "no server with this token or token expired"}}));
                }
            }
        });
    }

    verifyUser(data) {
        try  {getGuild(data.token, data.password);}
        catch (e) {
            return false
        }
        return true
    }

    newMusicConnection(data, wsClient) {
        const guildid = getGuild(data.token, data.password);
        const timeline = useTimeline(guildid);
        let inteval = setInterval(() => {
            wsClient.send(JSON.stringify({type: "time", payload: {progress: timeline.timestamp.progress}}));
        }, 1000);
    }
}

module.exports = { WebSocketServer }