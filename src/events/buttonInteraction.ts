import { Events, italic, bold, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import type { ButtonInteraction } from 'discord.js';
import { createAnnouncement, createPreviewAnnouncement } from '../utils/templates';
import Store from '../utils/store';
import { annoucnment_channel_id, member_role_id } from '../config';

export default{
	name: Events.InteractionCreate,
	async execute(interaction: ButtonInteraction|any) {
		if (!interaction.isButton()) return;

        // Announcement Send Button
        if (interaction.customId === 'sendAnnouncement') {
            const announcement = Store.get("announcement");
            const channel = interaction.client.channels.cache.get(annoucnment_channel_id);
            channel.send({ content: createAnnouncement(announcement) });
            await interaction.reply({
                content: ":white_check_mark: Sent!",
                ephemeral: true
            });
        }

        // Preview Announcement Button
        if (interaction.customId === 'previewAnnouncement') {
            var announcement = Store.get("announcement");
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('sendAnnouncement')
                        .setLabel('Send')
                        .setStyle(ButtonStyle.Success),
                )

            await interaction.reply({
                content: createPreviewAnnouncement(announcement),
                ephemeral: false,
                components: [row]
            });
        }

        // Member Verification Button
        if (interaction.customId.startsWith('memberVerify')) {
            const role = interaction.guild.roles.cache.get(member_role_id)
            const member = role.guild.members.cache.get(interaction.customId.split('|')[1])
            member.roles.add(role);
            member.createDM().then(channel => {
                channel.send({
                    content: "Congratulations, you have been Verified as a member of BUCSS!"
                });
            }).catch(error => {
                console.error(error);
                interaction.reply({
                    content: "An error occured! Please DM an admin",
                    ephemeral: true
                });
            });
            await interaction.reply({
                content: `Added Role to ${member}!`,
                ephemeral: true
            });
        }
	},
};