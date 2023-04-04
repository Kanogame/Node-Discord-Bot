const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("./axiosRequests");
const { useQueue } = require('discord-player');

const app = express();
app.use(cors());
app.use(bodyParser.json());
module.exports = {startServer, getServerStatus}

let server = false;

app.get("/links/get", async (req, res) => {
    console.log("got get");
    const guildid = await axios.getGuild(req.query.token,  req.query.pass);
    const queue = useQueue(guildid);
    if (queue === null) {
    }
    const tracks = queue.tracks.map((track, idx) => {return `**${++idx})** [${track.title}](${track.url})`});
    console.log(JSON.stringify(tracks));
    res.json(JSON.stringify(tracks));
});

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