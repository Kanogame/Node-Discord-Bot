const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses the current song"),
		async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guildId);

        if (!queue) {
			await interaction.reply("There are no songs in the queue");
			return;
		}

		const currentSong = queue.current;
        queue.setPaused(true);
        await interaction.reply(currentSong.title + " has been paused.")
	},
}