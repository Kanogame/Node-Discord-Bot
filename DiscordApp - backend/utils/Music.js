const { usePlayer, useQueue } = require("discord-player");

module.exports = class Music {
    constructor (interaction, guildId) {
        this.guildId = guildId;
        this.interaction = interaction;
        async () => {
            this.queue = getMusicQueue(this.guildId);
        }
    }

    getMusicQueue(guildId) {
        return useQueue(guildId);
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

    tracks() { 
        try {
            const tracks = this.queue.tracks.map((track, idx) => {return {
                id: idx++,
                title: track.title,
                length: track.duration,
                url: track.url,
                request: track.requestedBy,
            }});
            return tracks;
        } catch (e) {
            return null;
        }
    }

    isCurrent() {
        return this.queue.currentSong === null;
    }
}