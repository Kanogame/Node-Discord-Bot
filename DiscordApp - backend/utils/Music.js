const { usePlayer } = require("discord-player");

module.exports = class Music {
    constructor (interaction, guildId) {
        this.guildId = guildId;
        this.interaction = interaction;
    }

    async getMusicQueue(guildId) {
        return await this.getQueue(guildId);
    }

    async play(url) {
            const player = usePlayer(this.guildId);
            const queue = player.nodes.create(interaction.guildId);
            try {
                await player.play(interaction.member.voice.channel, url, {
                    nodeOptions: {
                        metadata: interaction
                    }
                });
            } catch (e) {
                return interaction.followUp(`Something went wrong: ${e}`);
            }
    }
}