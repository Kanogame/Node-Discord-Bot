const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { QueryType } = require("discord-player");

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

        const queue = await interaction.client.player.createQueue(interaction.guild);

        if (!queue.connection) await queue.connect(interaction.member.voice.channel)

        if (interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url");

            const result = await interaction.client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            });

            if (result.tracks.length === 0)
                return interaction.reply("No results");
            
            const song = result.tracks[0];

            await queue.addTrack(song);

            if (!queue.playing) await queue.play();

            await interaction.reply(`**[${song.title}](${song.url})** has been added to the Queue`);
            await interaction.reply(song.thumbnail);
            await interaction.reply({ text: `Duration: ${song.duration}`});
		}
    }
}