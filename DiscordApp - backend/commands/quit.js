const { SlashCommandBuilder } = require("@discordjs/builders");
const { useQueue } = require('discord-player');
const { getToken, deleteToken } = require('../httpServer/axiosRequests');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("quit")
    .setDescription("quit session"),

    async execute(interaction) {
        const guildId = interaction.guildId;
        const token = getToken(guildId);
        deleteToken(token, guildId);
        const queue = useQueue(guildId);
        queue.delete();
        interaction.reply("DONE!");
    }
}