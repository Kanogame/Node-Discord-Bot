const WebSocket = require("ws");

module.exports = { startWSserver }

function startWSserver() {
    const WsServer = new WebSocket.Server({ port: 9000 });

    WsServer.on("connection", () => { console.log("connected") });
    
    WsServer.on("close", () => { console.log("closed") });
}