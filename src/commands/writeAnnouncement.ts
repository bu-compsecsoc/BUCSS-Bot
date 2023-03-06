import { Interaction, SlashCommandBuilder, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, ModalSubmitInteraction, CacheType, ActionRow } from 'discord.js';
import { encodeCustomId } from '../interactions';
import { createPreviewAnnouncement } from '../utils/templates';
import Store from '../utils/store';


const minute = 60 * 1000;
const hour = 60 * minute;

export default {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Opens a Menu to write an announcement')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    async execute(interaction: CommandInteraction) {
        const modal = createModal();
        await interaction.showModal(modal);

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
        let random_id = Math.random().toString(36).slice(2, 10);

        let announcement_id = "announcement-" + random_id;

        Store.set(announcement_id, announcement, 24 * hour)

        const button_row: any = createSubmitButtonRow(announcement_id)
        await submitted.reply({
            content: createPreviewAnnouncement(announcement),
            components: [button_row],
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

function createSubmitButtonRow(announcement_id) {
    const button = new ButtonBuilder()
        .setCustomId(encodeCustomId('confirmAnnouncement', announcement_id))
        .setLabel('Send')
        .setStyle(ButtonStyle.Primary)
    
    return new ActionRowBuilder({components: [button]})
}