const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("./axiosRequests");
const { useQueue, useTimeline } = require('discord-player');

const app = express();
app.use(cors());
app.use(bodyParser.json());
module.exports = {startServer, getServerStatus}

let server = false;

app.get("/tracks/get", async (req, res) => {
    console.log("got get");
    const guildid = await axios.getGuild(req.query.token,  req.query.pass);
    const queue = useQueue(guildid);
    if (queue === null) {
        res.json(null);
    } else {
    const tracks = queue.tracks.map((track, idx) => {return {
        id: idx++,
        title: track.title,
        length: track.duration,
        url: track.url,
        request: track.requestedBy,
    }});
    res.json(tracks);
}
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

app.post("/player/pause", (req, res) => {
    const data = req.body;
    console.log(data);
    const guild = data.guildid.slice(0, data.guildid.length - 1)
    const timeline = useTimeline(guild);
    timeline.paused ? timeline.resume() : timeline.pause();
    res.json({ success: true });
});
