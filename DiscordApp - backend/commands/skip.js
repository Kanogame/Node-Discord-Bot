const { SlashCommandBuilder } = require("@discordjs/builders");

const MusicApi = require("../utils/Music");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips the current song"),
    async execute(interaction) {
        const music = new MusicApi(interaction, interaction.guildId);

        if (!music.isCurrent()) {
            await music.skip();
            await interaction.reply("music has been resumed.");
        }
	},
}