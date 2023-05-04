const { SlashCommandBuilder } = require("@discordjs/builders");

const MusicApi = require("../utils/Music");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses the current song"),
	async execute(interaction) {
		const music = MusicApi(interaction, interaction.guildId);

		if (!music.isCurrent()) {
			await music.pause();
        	await interaction.reply("music has been paused."); 
		}
	},
}