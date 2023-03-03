import { ButtonInteraction } from 'discord.js';
import { member_role_id } from '../utils/config';

export default {
    name: "memberVerify",
    async execute(interaction: ButtonInteraction) {
        const role = interaction.guild.roles.cache.get(member_role_id)
        const member = role.guild.members.cache.get(interaction.customId.split('|')[1])
        member.roles.add(role);
        try {
            let channel = await member.createDM();
            channel.send({
                content: "Congratulations, you have been Verified as a member of BUCSS!"
            });
            await interaction.reply({
                content: `Added Role to ${member}!`,
                ephemeral: true
            });
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: "An error occured! Please DM an admin",
                ephemeral: true
            });
        }
        
    }
};
