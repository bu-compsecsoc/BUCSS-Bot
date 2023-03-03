import { ButtonInteraction, TextChannel } from 'discord.js';
import Store from '../utils/store';
import { announcement_channel_id } from '../utils/config';
import { createAnnouncement } from '../utils/templates';

export default {
    name: "sendAnnouncement",
    async execute(interaction: ButtonInteraction) {
        const announcement = Store.get("announcement");
        const channel = interaction.client.channels.cache.get(announcement_channel_id);
        if (channel instanceof TextChannel) {
            channel.send({ content: createAnnouncement(announcement) });
            await interaction.reply({
                content: ":white_check_mark: Sent!",
                ephemeral: true
            });
        } else {
            console.warn("Unable to send announcement")
            await interaction.reply({
                content: ":white_check_mark: Sent!",
                ephemeral: true
            });
        }
    }

};