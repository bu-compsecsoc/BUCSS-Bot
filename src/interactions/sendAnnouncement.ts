import { ButtonInteraction, TextChannel, NewsChannel } from 'discord.js';
import { encodeCustomId } from './utils';
import { announcement_channel_id } from '../utils/config';
import { createAnnouncement } from '../utils/templates';
import Store from '../utils/store';

export default {
    name: "sendAnnouncement",
    generateCustomID(announcement_id: string) {
        return encodeCustomId("sendAnnouncement", announcement_id)
    },
    async execute(interaction: ButtonInteraction, announcement_id: string) {
        const channel = interaction.client.channels.cache.get(announcement_channel_id);
        console.log(channel instanceof TextChannel)
        console.log(channel)
        
        if (!(channel instanceof TextChannel || channel instanceof NewsChannel)) {
            console.warn("Unable To Retrieve Usable Announcement Channel")
            await interaction.reply({
                content: ":x: Could Not Retrieve Announcement Channel!",
                ephemeral: true
            });
            return
        }

        let announcement = Store.get(announcement_id);
        if (!announcement) {
            await interaction.reply({
                content: ":x: No announcement saved, please try entering again!",
                ephemeral: true
            });
            return
        }
        
        channel.send({ content: createAnnouncement(announcement) });
        await interaction.reply({
            content: `Announcement send in <#${channel.id}> ! :white_check_mark:`,
            ephemeral: true
        });
    },
}