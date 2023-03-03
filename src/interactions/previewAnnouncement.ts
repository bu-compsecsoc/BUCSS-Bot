import { ButtonInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import Store from '../utils/store';
import { createPreviewAnnouncement } from '../utils/templates';
import { generateCustomId } from '.';

export default {
    name: "previewAnnouncement",
    async execute(interaction: ButtonInteraction, announcement: string) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(generateCustomId('sendAnnouncement', announcement))
                    .setLabel('Send')
                    .setStyle(ButtonStyle.Success)
            )

        await interaction.reply({
            content: createPreviewAnnouncement(announcement),
            ephemeral: true,
            //@ts-ignore
            components: [row]
        });
    }
};
