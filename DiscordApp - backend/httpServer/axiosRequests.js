const axios = require('axios');
const { url } = require("../config.json");

module.exports = {newToken, getToken, deleteToken, getGuild}

async function newToken(token, password, guildId) {
    console.log("newToken");
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
    const data = { 
        Token: token, 
        Password: password
    };
    const resp = await axios.post(url + "guild/get", data,  
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const formatedResp = resp.data.guild.slice(0, resp.data.guild.length - 1)
    return formatedResp;
}

async function getToken(guildId) {
    const resp = await axios.post(url + "token/get", guildId);
    return resp.data;
}

async function deleteToken(token) {
    const resp = await axios.post(url + "token/remove", token)
    console.log(resp.data);
}
