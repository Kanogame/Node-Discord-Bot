const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
		.setName('addchannel')
		.setDescription('creates channel')
		.addStringOption(option => option.setName("channelname").setDescription('The channel name')),
	async execute(interaction) {
		const channelName = interaction.options.getString("channelname");

		interaction.guild.channels.create({name: channelName});
		await interaction.reply('DONE!');
	},
}