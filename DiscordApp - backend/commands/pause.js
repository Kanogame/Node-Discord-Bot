const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses the current song"),
		async execute(interaction) {
		const queue = interaction.client.player.nodes.get(interaction.guildid);

        if (!queue) {
			await interaction.reply("There are no songs in the queue");
			return;
		}

		const currentSong = queue.currentTrack;
        queue.currentSong.pause();
        await interaction.reply(currentSong.title + " has been paused.")
	},
}