const { SlashCommandBuilder } = require("@discordjs/builders");

const MusicApi = require("../utils/Music");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resume the current song"),
	async execute(interaction) {
		const music = MusicApi(interaction, interaction.guildId);

		await music.resume();
        await interaction.reply("music has been resumed.")
	},
}