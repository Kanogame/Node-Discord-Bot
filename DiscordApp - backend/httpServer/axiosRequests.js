const axios = require('axios');
const { url } = require("../config.json");

module.exports = {newToken, getToken, deleteToken}

async function newToken(token, password, guildId) {
    sendType("newToken");
    const data = { 
        Token: token, 
        Password: password, 
        GuildId: guildId };
    console.log(data);
    const resp = await axios.post(url, data,  
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(resp.text());
}

async function getToken(guildId) {
    sendType("getToken");
    const resp = await axios.post(url, guildId);
    return resp.text();
}

async function deleteToken(token) {
    sendType("removeToken");
    const resp = await axios.post(url, token)
    console.log(resp.text());
}

async function sendType(Type) {
    const resp = await axios.post(url, Type)
    console.log(resp.text());
}
