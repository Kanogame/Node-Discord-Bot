const { useTimeline, useQueue, Player, useHistory } = require("discord-player");

module.exports = class Music {
    constructor (interaction, guildId) {
        this.guildId = guildId;
        this.interaction = interaction;
        this.timeline = useTimeline(this.guildId);
        this.queue = useQueue(this.guildId);
        this.history = useHistory(this.guildId);
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
            this.timeline.resume();
            resolve();
        });
    }

    pause() {
        return new Promise(async (resolve) => {
            this.timeline.pause();
            resolve();
        });
    }

    skip() {
        return new Promise(async (resolve) => {
            await this.queue.node.skip();
            resolve();
        });
    }

    addTrack(track) { //TODO
        return new Promise(async (resolve) => {
            await this.queue.addTrack(track);
            resolve();
        });
    }

    quit() {
        return new Promise(async (resolve) => {
            await this.queue.delete();
            resolve();
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
            console.log(this.history.currentTrack);
            console.log(tracks);
            return tracks;
        } catch (e) {
            console.log(e);
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