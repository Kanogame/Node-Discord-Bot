const { SlashCommandBuilder } = require("@discordjs/builders")
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("shows first 10 songs in the queue"),

    async execute(interaction) {
        queue = useQueue(interaction.guild.id);
        const tracks = queue.tracks.map((track, idx) => {`**${++idx})** [${track.title}](${track.url})`});
        console.log(tracks);
            for (let i = 0; i < tracks.length; i++)
            {
                await interaction.reply(tracks[i]);
            }
    }
}