const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueryType } = require("discord-player");

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
            try {
                player.play(interaction.member.voice.channel, query, {
                    nodeOptions: {
                        metadata: interaction
                    }
                });
            } catch (e) {
                return interaction.followUp(`Something went wrong: ${e}`);
            }

            if (!handleServer.getServerStatus())
            {
                handleServer.startServer();
            }
            console.log(player.nodes.get(interaction.guildid).tracks);
            //handleServer.refreshList(player.nodes.get(1023567810972102746));
            await interaction.reply("DONE!");
		}
    }
}