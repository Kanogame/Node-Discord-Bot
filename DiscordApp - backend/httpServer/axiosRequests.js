const axios = require('axios');
const { url } = require("../config.json");

module.exports = {newToken, getToken, deleteToken, getGuild}

async function newToken(token, password, guildId) {
    sendType("newToken");
    const data = { 
        Token: token, 
        Password: password, 
        GuildId: guildId };
    console.log(data);
    const resp = await axios.post(url + "token/new", data,  
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(resp.data);
}

async function getGuild(token, password) {
    sendType("getQueue");
    const data = { 
        Token: token, 
        Password: password, 
        GuildId: guildId };
    console.log(data);
    const resp = await axios.post(url + "guild/get", data,  
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(resp.data);
}

async function getToken(guildId) {
    sendType("getToken");
    const resp = await axios.post(url + "token/get", guildId);
    return resp.data;
}

async function deleteToken(token) {
    sendType("removeToken");
    const resp = await axios.post(url + "token/remove", token)
    console.log(resp.data);
}
