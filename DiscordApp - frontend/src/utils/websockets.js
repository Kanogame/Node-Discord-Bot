export default class Websocket {
    constructor(url, token, password) {
        this.token = token;
        this.password = password;
        this.url = url;
        this.ws = new WebSocket(url); //"ws://192.168.2.149:9000"
        this.setWS(this.ws);
        this.progress = 0;
        this.timeSubscribed = [];
        this.pauseSubscribed = [];
    }

    setWS(ws) {
        ws.addEventListener("open", (event) => {this.open(event, this.ws)})
        ws.addEventListener("message", (event) => {this.messageTypeManager(event)});
    }

    messageBuilder(type, payload) {
        return {
            type: type,
            payload: payload,
        }
    }

    sendMessage(ws, message) {
        ws.send(JSON.stringify(message));
    }

    open = (event, ws) => {
        this.sendMessage(ws, this.messageBuilder("init", {token: this.token, password: this.password}));
    }

    messageTypeManager = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "init") {
            if (message.payload.success === true) {
                console.log("success"); //TODO
            }
        } else if (message.type === "time") {
            for (const func of this.timeSubscribed) {
                func(message.payload.progress);
            }
        } else if (message.type === "pause") {
            for (const func of this.pauseSubscribed) {
                func(message.payload.isPlaying);
            }
        } 
    }

    sendPause() {
        this.sendMessage(this.ws, this.messageBuilder("pause", {token: this.token}))
    }

    sendSkip() {
        this.sendMessage(this.ws, this.messageBuilder("next", {token: this.token}))
    }

    timeSubscribe(setTime) {
        this.timeSubscribed.push(setTime)
        return(() => {
            const index = this.timeSubscribed.indexOf(setTime);
            this.timeSubscribed = this.timeSubscribed.splice(index, 1);
        })
    }

    pauseSubscribe(setPause) {
        this.pauseSubscribed.push(setPause)
        return(() => {
            const index = this.pauseSubscribed.indexOf(setPause);
            this.subscribed = this.pauseSubscribed.splice(index, 1);
        })
    }
}