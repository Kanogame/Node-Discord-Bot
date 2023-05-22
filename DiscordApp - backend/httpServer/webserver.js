const { useTimeline } = require("discord-player");
const axios = require("./axiosRequests");
const WebSocket = require("ws");
const Music = require("../utils/Music");

class WebSocketServer {
    constructor(port) {
        this.WsServer = new WebSocket.Server({ port: port });
        this.Nextid = 0;
        this.Clients = new Map();
        this.setServer();
    }

    messageBuilder(type, payload) {
        return {
            type: type,
            payload: {...payload},
        }
    }

    sendMessage(wsClient, data) {
        wsClient.send(JSON.stringify(data));
    }

    setServer() {
        this.WsServer.on("connection", this.onConnect);
    }

    onConnect = (wsClient) => {
        wsClient.on("message", (messageStr) => {this.onMessage(messageStr, wsClient)});
    }

    onMessage = (messageStr, wsClient) => {
        const message = JSON.parse(messageStr);
        if (message.type === "init") {
            if (this.verifyUser(message.payload)) {
                this.Clients.set(message.payload.token, async () => { return await axios.getGuild(data.token, data.password)})
                this.sendMessage(wsClient, this.messageBuilder("init", {success: true}));
                this.newMusicConnection(message.payload, wsClient, this.Clients.get(message.payload.token));
            } else {
                this.sendMessage(wsClient, this.messageBuilder("error", {error: "no server with this token or token expired"}));
            }
        }
    } 

    isPlaying(guildId) {
        try { const timeline = useTimeline(guildId);
        timeline.timestamp
        } catch (e) {
            return false
        }
        return true
    }

    verifyUser = async (data) =>  {
        try  {
            const guild =await axios.getGuild(data.token, data.password);
            const timeline = useTimeline(guild);
            timeline.timestamp;
        } catch (e) {
            return false
        }
        return true
    }

    async newMusicConnection(data, wsClient, guildId) {
        const guildid = await axios.getGuild(data.token, data.password);
        const timeline = useTimeline(guildid);
        let interval = setInterval(() => {
            wsClient.send(JSON.stringify(this.messageBuilder("time", {progress: timeline.timestamp.progress})));
        }, 1000);
    }
}

module.exports = { WebSocketServer }