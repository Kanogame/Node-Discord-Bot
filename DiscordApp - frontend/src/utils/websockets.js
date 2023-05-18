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

    open(event, ws) {
        const data = { type: "init", payload: {token: this.token, password: this.password}};
        ws.send(JSON.stringify(data));
    }

    messageTypeManager = (event) => {
        const message = JSON.parse(event.data);
        console.log(message);
        if (message.type === "init") {
            if (message.payload.success === true) {
                console.log("success"); //TODO
            }
        } else if (message.type === "time") {
            console.log(this.subscribed)
            for (const func of this.subscribed) {
                func(message.payload.progress);
            }
        }
    }

    subscribe(setTime) {
        this.subscribed.push(setTime)
        return(() => {
            const index = this.subscribed.indexOf(setTime);
            this.subscribed = this.subscribed.splice(index, 1);
        })
    }
}