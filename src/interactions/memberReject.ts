import { ButtonInteraction } from 'discord.js';
import { member_role_id } from '../utils/config';

export default {
    name: "memberReject",
    async execute(interaction: ButtonInteraction, userID: string) {
        let member = interaction.guild.members.cache.get(userID);
        interaction.message.delete();
        interaction.reply({
            content: `Deleted message and rejected request for ${member}`,
            ephemeral: true
        });
    }
};
