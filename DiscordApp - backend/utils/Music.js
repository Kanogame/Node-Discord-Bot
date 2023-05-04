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

    play(url) {
        return new Promise(async (resolve) => {
            const player = usePlayer(this.guildId);
            player.nodes.create(interaction.guildId);
            try {
                await player.play(interaction.member.voice.channel, url, {
                    nodeOptions: {
                        metadata: interaction
                    }
                });
                resolve();
            } catch (e) {
                resolve();
            }
        });
    }

    resume() {
        return new Promise(async (resolve) => {
            await this.queue.currentSong.resume();
            return resolve();
        });
    }

    pause() {
        return new Promise(async (resolve) => {
            await this.queue.currentSong.pause();
            return resolve();
        });
    }

    skip() {
        return new Promise(async (resolve) => {
            await this.queue.node.skip();
            return resolve();
        });
    }

    resume() {
        return new Promise(async (resolve) => {
            await this.queue.node.resume();
            return resolve();
        });
    }

    addTrack() {
        return new Promise(async (resolve) => {
            await this.queue.addTrack(track);
            return resolve();
        });
    }

    quit() {
        return new Promise(async (resolve) => {
            await this.queue.delete();
            return resolve();
        });
    }

    isCurrent() {
        return this.queue.currentSong === null;
    }
}