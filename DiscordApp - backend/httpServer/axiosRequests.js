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
    console.log(resp);
}

async function getToken(guildId) {
    sendType("getToken");
    const resp = await axios.post(url, guildId);
    return resp.data;
}

async function deleteToken(token) {
    sendType("removeToken");
    const resp = await axios.post(url, token)
    console.log(resp.data);
}

async function sendType(Type) {
    const resp = await axios.post(url, Type)
    console.log(resp.data);
}
