const { Events, italic, bold, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const template = require('../utils/announceTemplate.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isButton()) return;

        // Announcement Send Button
        if (interaction.customId === 'sendAnnouncement') {
            const announceData = require('../announcement.json');
            const channel = interaction.client.channels.cache.get(process.env.ANNOUNCECHANNEL);
            channel.send({ content: template.createAnnoucement(announceData) });
            await interaction.reply({ content: ":white_check_mark: Sent!", ephemeral: true });
        }

        // Preview Announcement Button
        if (interaction.customId === 'previewAnnouncement') {
            const announceData = require('../announcement.json');
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('sendAnnouncement')
                        .setLabel('Send')
                        .setStyle(ButtonStyle.Success),
                )

            await interaction.reply({ content: ":rotating_light:" + italic(bold("THIS IS A PREVIEW MESSAGE")) + ":rotating_light:\n\n" + template.createAnnoucement(announceData), ephemeral: false, components: [row] });
        }
	},
};