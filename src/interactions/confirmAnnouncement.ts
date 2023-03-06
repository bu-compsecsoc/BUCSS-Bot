import { ButtonInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { createPreviewAnnouncement } from '../utils/templates';
import { encodeCustomId } from './utils';

export default {
    name: "confirmAnnouncement",
    generateCustomID(announcement_id: string) {
        return encodeCustomId("confirmAnnouncement", announcement_id)
    },
    async execute(interaction: ButtonInteraction, announcement_id: string) {
        const button = new ButtonBuilder({
            custom_id: encodeCustomId('sendAnnouncement', announcement_id),
            label: "I'm Definitely Sure",
            style: ButtonStyle.Danger,
        })
        const row = new ActionRowBuilder({
            components: [button]
        })

        await interaction.reply({
            content: "Are you sure you want to send this announcement?",
            ephemeral: true,
            //@ts-ignore
            components: [row]
        });
    }
};
