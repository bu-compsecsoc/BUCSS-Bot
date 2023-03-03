import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';


const startup_time = new Date();

export default{
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('View the current status of the bot')
    ,
    async execute(interaction) {
        const status = interaction.options.getString('statusfield');
        await interaction.client.user.setStatus(status);

        let embed = new EmbedBuilder()
            .addFields({
                name: "Status",
                value: "Online",
            })
            .addFields({
                name: "Running Since",
                value: startup_time.toUTCString(),
            })
        
        await interaction.reply(
            {
                embeds: [embed],
                ephemeral: true
            }
        )
    },
};