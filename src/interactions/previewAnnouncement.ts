import { ButtonInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import Store from '../utils/store';
import { createPreviewAnnouncement } from '../utils/templates';

export default {
    name: "previewAnnouncement",
    async execute(interaction: ButtonInteraction) {
        var announcement = Store.get("announcement");
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('sendAnnouncement')
                    .setLabel('Send')
                    .setStyle(ButtonStyle.Success)
            )

        await interaction.reply({
            content: createPreviewAnnouncement(announcement),
            ephemeral: false,
            //@ts-ignore
            components: [row]
        });
    }
};
