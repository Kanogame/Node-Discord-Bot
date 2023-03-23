const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json);
module.exports = { refreshList, startServer, getServerStatus}

let server = false;

async function refreshList(list) {
    list = list;

    await app.get("/links/get", (req, res) => {
        res.json(list);
    });
}

function getServerStatus() {
    return server;
}

async function startServer() {
    await app.listen(13532, () => {
        console.log("Сервер запущен на порту 13532");
        server = true;
    });
}

app.post("/", (req, res) => {
    console.log("post");
    console.log(req.body);
});