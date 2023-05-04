const { SlashCommandBuilder } = require("@discordjs/builders");

const MusicApi = require("../utils/Music");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resume the current song"),
	async execute(interaction) {
		const music = new MusicApi(interaction, interaction.guildId);

		if (!music.isCurrent()) {
			await music.resume();
        	await interaction.reply("music has been resumed.");
		}
	},
}