const { SlashCommandBuilder } = require("@discordjs/builders");
const { getToken, deleteToken } = require('../httpServer/axiosRequests');

const MusicApi = require("../utils/Music");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("quit")
    .setDescription("quit session"),

    async execute(interaction) {
        const guildId = interaction.guildId;
        const token = getToken(guildId);
        deleteToken(token, guildId);

        const music = MusicApi(interaction, interaction.guildId);

		if (!music.isCurrent()) {
			await music.quit();
        	await interaction.reply("quit.");
		}
    }
}