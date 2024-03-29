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

    onMessage = async (messageStr, wsClient) => {
        const message = JSON.parse(messageStr);
        if (message.type === "init") {
            if (await this.verifyUser(message.payload)) {
                this.sendMessage(wsClient, this.messageBuilder("init", {success: true}));
                this.newMusicConnection(message.payload, wsClient);
            } else {
                this.sendMessage(wsClient, this.messageBuilder("error", {error: "no server with this token or token expired"}));
            }
        } else if (message.type === "pause") {
            console.log("pause");
            if (this.isPlaying(this.Clients.get(message.payload.token).guild)) {
                const timeline = useTimeline(this.Clients.get(message.payload.token).guild);
                timeline.paused ? timeline.resume() : timeline.pause();
                this.sendMessage(wsClient, this.messageBuilder("pause", {success: true, isPlaying: timeline.paused}));
            }
        } else if (message.type === "next") {
            console.log(this.Clients);
            const music = new Music(null, this.Clients.get(message.payload.token).guild);
            //clearInterval(this.Clients.get(message.payload.token).interval);
            await music.skip();
        }
    } 

    getGuildByToken(data) {
        const guildId = async () => { return await axios.getGuild(data.token, data.password)};
        return guildId();
    } 

    isPlaying(guildId) {
        try { const timeline = useTimeline(guildId);
        timeline.timestamp === null;
        return true;
        } catch (e) {
            return false
        }
        
    }

    verifyUser = async (data) =>  {
        try  {
            const guild = await axios.getGuild(data.token, data.password);
            const timeline = useTimeline(guild);
            timeline.timestamp === null;
            return true;
        } catch (e) {
            return false
        }
    }

    async newMusicConnection(data, wsClient) {
        const guildid = await axios.getGuild(data.token, data.password);
        const timeline = useTimeline(guildid);
        let interval = setInterval(() => {
            wsClient.send(JSON.stringify(this.messageBuilder("time", {progress: timeline.timestamp.progress})));
        }, 1000);
        this.Clients.set(data.token, {guild: guildid, interval: interval })
    }
}

module.exports = { WebSocketServer }