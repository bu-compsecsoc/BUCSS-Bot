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

        // Member Verification Button
        if (interaction.customId.startsWith('memberVerify')) {
            const role = interaction.guild.roles.cache.get(process.env.MEMBERID)
            const member = role.guild.members.cache.get(interaction.customId.split('|')[1])
            member.roles.add(role);
            member.createDM().then(channel => {
                channel.send({ content: "Congratulations, you have been Verified as a member of BUCSS!" });
            }).catch(error => {
                console.error(error);
                interaction.reply({ content: "An error occured! Please DM an admin", ephemeral: true });
            });
            await interaction.reply({ content: `Added Role to ${member}!` , ephemeral: true });
        }
	},
};