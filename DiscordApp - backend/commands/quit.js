const { SlashCommandBuilder } = require("@discordjs/builders")
const { getToken, deleteToken } = require('../httpServer/axiosRequests');

module.exports = {
    data: new SlashCommandBuilder()
    .name("quit")
    .setDescription("quit session"),

    async execute(interaction) {
        const guildId = interaction.guildId;
        const token = getToken(guildId);
        deleteToken(token, guildId);
        interaction.client.player.nodes.delete(guildId);
        interaction.reply("DONE!");
    }
}