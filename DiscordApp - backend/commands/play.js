const { SlashCommandBuilder } = require("@discordjs/builders");
const { Player, useQueue } = require('discord-player');

const handleServer = require("../httpServer/handleServer");
const { randomString } = require("../utils/randomSrting");

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
        await interaction.deferReply({
            ephemeral: true,
        });
        const player = Player.singleton(interaction.client)

        if (interaction.options.getSubcommand() === "song") {
            const queue = player.nodes.create(interaction.guildId);
            if (queue.currentTrack === null) {
                const token = randomString(15);
                const password = randomString(20);
                interaction.followUp("token: " + token, "password: " + password);
                handleServer.newToken(token, password, interaction.guildId);
            }
            const query = interaction.options.getString('url', true);
            try {
                await player.play(interaction.member.voice.channel, query, {
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
                handleServer.refreshList(useQueue(interaction.guildId).tracks);
            }
            await interaction.followUp("DONE!");
		}
    }
}