export default class Websocket {
    constructor(url, token, password, setTime) {
        this.setTime = setTime;
        this.token = token;
        this.password = password;
        this.url = url;
        this.ws = new WebSocket(url); //"ws://192.168.2.149:9000"
        this.setWS(this.ws);
        this.progress = 0;
    }

    setWS(ws) {
        ws.addEventListener("open", (event) => {this.open(event, this.ws)})
        ws.addEventListener("message", this.messageTypeManager);
    }

    open(event, ws) {
        const data = { type: "init", payload: {token: this.token, password: this.password}};
        ws.send(JSON.stringify(data));
    }

    messageTypeManager(event) {
        const message = event.data;
        if (message.type === "init") {
            if (message.payload.success === true) {
                console.log("success"); //TODO
            }
        } else if (message.type === "time") {
            this.setTime(message.payload.progress);
        }
    }
}