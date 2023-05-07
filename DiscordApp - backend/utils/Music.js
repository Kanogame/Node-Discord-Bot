const { useTimeline, useQueue, Player, useHistory } = require("discord-player");

module.exports = class Music {
    constructor (interaction, guildId) {
        this.guildId = guildId;
        this.interaction = interaction;
        async () => {
            this 
            this.queue = await useQueue(this.guildId);
            this.timeline = await useTimeline(this.guild);
            this.history = await useHistory(this.guild);
        }
    }

    play(url) {
        return new Promise(async (resolve) => {
            const player = Player.singleton(this.interaction.client);
            player.nodes.create(this.interaction.guildId);
            try {
                await player.play(this.interaction.member.voice.channel, url, {
                    nodeOptions: {
                        metadata: this.interaction
                    }
                });
                resolve();
            } catch (e) {
                console.log(e);
                resolve();
            }
        });
    }

    resume() {
        return new Promise(async (resolve) => {
            await this.timeline.resume();
            return resolve();
        });
    }

    pause() {
        return new Promise(async (resolve) => {
            await this.timeline.pause();
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
        try {
            return this.queue.currentTrack === null;
        } catch (e) {
            return false;
        }
    }
}