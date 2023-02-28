const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const list = [];
module.exports = { refreshList, startServer }

async function refreshList(list) {
    list = list;

    await app.get("/links/get", (req, res) => {
        res.json(list);
    });
}

async function startServer(link) {
    await app.listen(13532, () => {
        console.log("Сервер запущен на порту 13532");
    });
}

