import { Interaction, SlashCommandBuilder, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, ModalSubmitInteraction, CacheType, ActionRow } from 'discord.js';
import { encodeCustomID } from '../interactions';

export default {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Opens a Menu to write an announcement')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    async execute(interaction: CommandInteraction) {
        const modal = createModal();
        await interaction.showModal(modal);

        const minute = 60 * 1000;
        const is_command_sender = (i: Interaction) => i.user.id === interaction.user.id;

        let submitted: ModalSubmitInteraction<CacheType>;
        try {
            submitted = await interaction.awaitModalSubmit({
                time: 5 * minute,
                filter: is_command_sender
            })
        } catch (err) {
            console.error(err);
            interaction.reply({
                content: "An error occured!!",
                ephemeral: true
            });
            return
        }

        let announcement: string = submitted.fields.getTextInputValue("AnnouncementInput");
        const preview_button_row: any = createPreviewButtonRow(announcement)
        await submitted.reply({
            content: ":white_check_mark: Saved Announcement!",
            components: [preview_button_row],
            ephemeral: true
        });
    },
};


function createModal() {
    const text_input = new TextInputBuilder({
        custom_id: "AnnouncementInput",
        label: "What's the announcement?",
        style: TextInputStyle.Paragraph, // Multi-line
    })
    const row: any = new ActionRowBuilder({ components: [text_input] })
    
    return new ModalBuilder({
        custom_id: "AnnouncementModal",
        title: "Make an Announcement",
        components: [row]
    })
}

function createPreviewButtonRow(announcement: string) {
    const button = new ButtonBuilder()
        .setCustomId(encodeCustomID('previewAnnouncement', announcement))
        .setLabel('Preview')
        .setStyle(ButtonStyle.Primary)
    
    return new ActionRowBuilder({components: [button]})
}