const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
		.addChannelOption(option => option.setName("channel").setDescription('The channel to echo into'))
		.addMentionableOption(option => option.setName("usertoping").setDescription("user to ping")),
	async execute(interaction) {
		const channel = interaction.options.getChannel('channel');
		const user = interaction.options.getMentionable("usertoping");

		await channel.send(`${user.toString()}`);
		await channel.send("this channel");
		await channel.send({
			files: [{
				attachment: "./files/disk.jpg",
				name: "file.jpg",
			}]
		});
		await interaction.reply('Pong!');
	},
};