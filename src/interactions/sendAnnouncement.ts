import { ButtonInteraction, TextChannel } from 'discord.js';
import { encodeCustomId } from './utils';
import { announcement_channel_id } from '../utils/config';
import { createAnnouncement } from '../utils/templates';

export default {
    name: "sendAnnouncement",
    generateCustomID(announcement: string) {
        return encodeCustomId("sendAnnouncement", announcement)
    },
    async execute(interaction: ButtonInteraction, announcement: string) {
        const channel = interaction.client.channels.cache.get(announcement_channel_id);
        if (channel instanceof TextChannel) {
            channel.send({ content: createAnnouncement(announcement) });
            await interaction.reply({
                content: "Success! :white_check_mark:",
                ephemeral: true
            });
        } else {
            console.warn("Unable To Retrieve Usable Announcement Channel")
            await interaction.reply({
                content: ":x: Could Not Retrieve Announcement Channel!",
                ephemeral: true
            });
        }
    },
}