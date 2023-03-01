const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resume the current song"),
		async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guildId);

        if (!queue) {
			await interaction.reply("There are no songs in the queue");
			return;
		}

		const currentSong = queue.current;
        queue.setPaused(false);
        await interaction.reply(currentSong.title + " has been resumed.")
	},
}