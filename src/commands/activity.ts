import { SlashCommandBuilder } from 'discord.js';

export default{
	data: new SlashCommandBuilder()
		.setName('activity')
		.setDescription('Sets the bot activity')
        .addStringOption(option => 
            option.setName('activity')
                .setDescription('The activity to set')
                .setRequired(true)
        ),
	async execute(interaction) {
        const activity = interaction.options.getString('activity');
        interaction.client.user.setActivity(activity);
        await interaction.reply(
            {
                content: `Activity set to "${activity}"!`,
                ephemeral: true
            }
        )
	},
};