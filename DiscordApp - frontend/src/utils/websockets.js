class Websocket {
    constructor(url, token, password) {
        this.token = token;
        this.password = password;
        this.url = url;
        this.ws = new WebSocket(url); //"ws://192.168.2.149:9000"
        this.setWS(this.ws);
    }

    setWS(ws) {
        ws.addEventListener("open", this.open)
        webSocket.addEventListener("message", this.messageTypeManager);
    }

    open() {
        const data = { type: "init", payload: {token: this.token, password: this.password}};
        webSocket.send(JSON.stringify(data));
    }

    messageTypeManager() {
        
    }


}