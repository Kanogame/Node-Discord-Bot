const { SlashCommandBuilder } = require("@discordjs/builders");
const { useQueue, useMasterPlayer } = require('discord-player');
const Music = require("../utils/Music");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("shows first 10 songs in the queue"),

    async execute(interaction) {
        const music = MusicApi(interaction, interaction.guildId);
        const tracks = music.tracks();
        let reply = "";
        for (const track of tracks) {
            reply += `**${track.idx})** [${track.title}](${track.url})\n`;
        }
        interaction.reply(reply);
    }
}