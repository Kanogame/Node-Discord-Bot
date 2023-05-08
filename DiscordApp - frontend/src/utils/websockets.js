class Websocket {
    constructor(url) {
        this.url = url;
        this.Websocket = new WebSocket("ws://192.168.2.149:9000");
    }
}