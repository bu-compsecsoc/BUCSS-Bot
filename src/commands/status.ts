import { SlashCommandBuilder, EmbedBuilder, CommandInteraction } from 'discord.js';
import { member_role_id } from '../utils/config';

export default{
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('View the current status of the bot')
    ,
    async execute(interaction: CommandInteraction) {
        let embed = new EmbedBuilder()
            .addFields({
                name: "Status",
                value: "Online",
            })
            .addFields({
                name: "Running Since",
                value: getRunningSince(),
            })
            .addFields({
                name: "Verified Users",
                value: await getVerifiyMemberCount(interaction),
            })
        
        await interaction.reply(
            {
                embeds: [embed],
                ephemeral: true
            }
        )
    },
};

const startup_time = new Date();
function getRunningSince() {
    return startup_time.toUTCString()
}

async function getVerifiyMemberCount(interaction: CommandInteraction) {
    const member_role = await interaction.guild.roles.fetch(member_role_id);
    const count = member_role.members.values.length
    return count.toString()
}
