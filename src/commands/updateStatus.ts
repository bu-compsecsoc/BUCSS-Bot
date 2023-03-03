import { SlashCommandBuilder } from 'discord.js';

export default{
	data: new SlashCommandBuilder()
		.setName('update_status')
		.setDescription('Sets the bots status')
        .addStringOption(option => 
            option.setName('statusfield')
                .setDescription('The status to set')
                .setRequired(true)
                .addChoices(
                    {name: "Online", value: "online"},
                    {name: "Idle", value: "idle"},
                    {name: "Do Not Disturb", value: "dnd"},
                    {name: "Invisible", value: "invisible"}
                )
        ),
	async execute(interaction) {
        const status = interaction.options.getString('statusfield');
        await interaction.client.user.setStatus(status);
        await interaction.reply(
            {
                content: 'Status set to ' + status + '!',
                ephemeral: true
            }
        )
	},
};