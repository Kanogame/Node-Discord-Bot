export default class Websocket {
    constructor(url, token, password) {
        this.token = token;
        this.password = password;
        this.url = url;
        this.ws = new WebSocket(url); //"ws://192.168.2.149:9000"
        this.setWS(this.ws);
        this.progress = 0;
        this.subscribed = []
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
            for (const func of this.subscribed) {
                func(message.payload.progress);
            }
        } else if (message.type === "pause") {
            
        } 
    }

    sendPause() {
        this.sendMessage(this.ws, this.messageBuilder("pause", null))
    }

    subscribe(setTime) {
        this.subscribed.push(setTime)
        return(() => {
            const index = this.subscribed.indexOf(setTime);
            this.subscribed = this.subscribed.splice(index, 1);
        })
    }
}