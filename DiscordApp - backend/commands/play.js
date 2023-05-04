const { SlashCommandBuilder } = require("@discordjs/builders");
const { Player, useQueue, useTimeline } = require('discord-player');

const handleServer = require("../httpServer/handleServer");
const { newToken } = require("../httpServer/axiosRequests");
const { randomString } = require("../utils/randomSrting");
const { createNewToken } = require("../utils/NetworkMusic");
const MusicApi = require("../utils/Music");

module.exports= {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("play a song from YouTube.")
        .addSubcommand(subcommand =>
            subcommand
                .setName("song")
                .setDescription("Plays a single song from YT")
                .addStringOption(option => option.setName("url").setDescription("the song's url").setRequired(true))
        ),
    async execute(interaction) {
        const music = MusicApi(interaction, interaction.guildId);

        if (!interaction.member.voice.channel) { 
            return await interaction.reply("get in voice and try again") 
        }
        await interaction.deferReply({
            ephemeral: true,
        });

        if (interaction.options.getSubcommand() === "song") {
            if (music.isCurrent()) {
                const {token, password} = createNewToken();
                interaction.followUp(`http://localhost:3000/player/${password}`);
                interaction.followUp(token);
                newToken(token, password, interaction.guildId);
            }
            await music.play(interaction.options.getString('url', true));
            const timeline = useTimeline(interaction.guildId);
            var myInt = setInterval(function () {
                console.log(timeline.timestamp);
            }, 500);
            await interaction.followUp("DONE!");
		}
    }
}