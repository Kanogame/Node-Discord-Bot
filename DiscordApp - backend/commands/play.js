const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueryType } = require("discord-player");
const { Player, useQueue } = require('discord-player');

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

        const player = interaction.client.player;

        if (interaction.options.getSubcommand() === "song") {
            const query = interaction.options.getString('url', true);
            const queue = useQueue(interaction.guildid);
            try {
                player.play(interaction.member.voice.channel, query, {
                    nodeOptions: {
                        metadata: interaction
                    }
                });
            } catch (e) {
                return interaction.reply(`Something went wrong: ${e}`);
            }

            if (!handleServer.getServerStatus())
            {
                handleServer.startServer();
            }
            if (queue)
            {
                handleServer.refreshList(queue.tracks);
            }
            await console.log(queue.currentTrack);
            await interaction.reply("DONE!");
		}
    }
}