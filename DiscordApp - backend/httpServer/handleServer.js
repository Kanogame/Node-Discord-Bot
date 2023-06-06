const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("./axiosRequests");
const { useQueue, useTimeline, useHistory } = require('discord-player');

const app = express();
app.use(cors());
app.use(bodyParser.json());
module.exports = {startServer}

app.get("/tracks/get", async (req, res) => {
    const guildid = await axios.getGuild(req.query.token,  req.query.pass);
    const queue = useQueue(guildid);
    console.log(guildid);
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

app.get("/tracks/current/get", async (req, res) => {
    const guildid = await axios.getGuild(req.query.token,  req.query.pass);
    const History = useHistory(guildid);
    try {
        const track = History.currentTrack;
        const ResOBj = {
            title: track.title,
            length: track.duration,
            url: track.url,
            request: track.requestedBy,
        };
        res.json(track);
    } catch (e) {
        res.json({error: e});
    }
});

async function startServer() {
    await app.listen(13532, () => {
        console.log("Сервер запущен на порту 13532");
    });
}
