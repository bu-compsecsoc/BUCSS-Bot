import { ButtonInteraction } from 'discord.js';
import { member_role_id } from '../utils/config';
import { encodeCustomId } from './utils';

export default {
    name: "memberVerify",
    generateCustomID(userID: string) {
        return encodeCustomId("memberVerify", userID)
    },
    async execute(interaction: ButtonInteraction, userID: string) {
        const role = interaction.guild.roles.cache.get(member_role_id)
        const member = role.guild.members.cache.get(userID)
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
