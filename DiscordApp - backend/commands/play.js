const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueryType } = require("discord-player");
const path = require('node:path');
const serverPath = path.join(__dirname, 'handleServer.js');

const handleServer = require("../handleServer");

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
        if (!interaction.member.voice.channel) { return await interaction.reply("get in voice and try again") }

        if (interaction.options.getSubcommand() === "song") {

            let url = interaction.options.getString("url");

            const result = await interaction.client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            });

            if (result.tracks.length === 0)
                return interaction.reply("No results");
            
            const song = result.tracks[0];

            let queue = interaction.client.player.getQueue(interaction.guild);
            console.log("queue is defined now");
            
            if (!queue) {
                console.log("queue not exist")
                queue = await interaction.client.player.createQueue(interaction.guild);
                handleServer.startServer("asd");
            }
            console.log("refreshing list!");
            handleServer.refreshList(queue.tracks);
    
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
            
            await queue.addTrack(song);

            if (!queue.playing) await queue.play();

            await interaction.reply(`**[${song.title}](${song.url})** has been added to the Queue`);
		}
    }
}