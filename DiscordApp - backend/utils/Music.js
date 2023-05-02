const { usePlayer } = require("discord-player");

module.exports = class Music {
    constructor (interaction, guildId) {
        this.guildId = guildId;
        this.interaction = interaction;
        async () => {
            this.queue = getMusicQueue(this.guildId);
        }
    }

    async getMusicQueue(guildId) {
        return await this.getQueue(guildId);
    }

    async play(url) {
            const player = usePlayer(this.guildId);
            player.nodes.create(interaction.guildId);
            try {
                await player.play(interaction.member.voice.channel, url, {
                    nodeOptions: {
                        metadata: interaction
                    }
                });
            } catch (e) {
                return e;
            }
    }

    async pause() {
        return new Promise(async (resolve) => {
            await this.queue.currentSong.pause();
            return resolve();
        });
    }

    async skip() {
        return new Promise(async (resolve) => {
            await this.queue.node.skip();
            return resolve();
        });
    }

    async resume() {
        return new Promise(async (resolve) => {
            await this.queue.node.resume();
            return resolve();
        });
    }

    async addTrack() {
        return new Promise(async (resolve) => {
            await this.queue.addTrack(track);
            return resolve();
        });
    }
}