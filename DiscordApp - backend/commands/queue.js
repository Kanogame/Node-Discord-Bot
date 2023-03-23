const { SlashCommandBuilder } = require("@discordjs/builders");
const { useQueue, useMasterPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("shows first 10 songs in the queue"),

    async execute(interaction) {
        const queue = useQueue(interaction.guildId);
        const tracks = queue.tracks.map((track, idx) => {return `**${++idx})** [${track.title}](${track.url})`});
        let reply = "";

        for(const track of tracks) {
            reply += track + "\n";
        }
        interaction.reply(reply);
    }
}