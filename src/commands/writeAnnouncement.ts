import { SlashCommandBuilder, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle, italic, bold } from 'discord.js';
import { generateCustomId } from '../interactions';
import Store from '../utils/store';

export default{
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Opens a Menu to write an announcement')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('announceText')
            .setTitle('Make an Announcement');

        // Add components to modal

        // Create the text input components
        const announcementInput = new TextInputBuilder()
            .setCustomId('announcementInput')
            .setLabel("What's the announcement?")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Paragraph);

        // An action row only holds one text input,
        // so you need one action row per text input.
        const actionRow: any = new ActionRowBuilder().addComponents(announcementInput);

        // Add inputs to the modal
        modal.addComponents(actionRow);
        await interaction.showModal(modal);

        const submitted = await interaction.awaitModalSubmit({
            time: 120*1000, // 60 seconds
            filter: i => i.user.id === interaction.user.id
        }).catch(error => {
            console.error(error);
            interaction.reply({ content: "An error occured!!", ephemeral: true });
        })

        if (!submitted) return
        let announcement: string = submitted.fields.getTextInputValue("announcementInput");
        
        Store.set("announcement", announcement);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(generateCustomId('previewAnnouncement'))
                    .setLabel('Preview')
                    .setStyle(ButtonStyle.Primary),
            )

        await submitted.reply({
            content: ":white_check_mark: Saved Announcement!",
            components: [row],
            ephemeral: true
        });
    },
};