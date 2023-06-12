import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { member_role_id, member_view_channel } from '../utils/config';
import { encodeCustomId } from '../interactions';

export default{
    data: new SlashCommandBuilder()
        .setName('membership')
        .setDescription('Sends your account for a membership review!')
        .addStringOption(option =>
            option.setName('studentid')
                .setDescription('Your student ID - (With the "s" prefix)')
                .setRequired(true)
        ),
    async execute(interaction) {
        let usersRoles = interaction.member.roles.member._roles
        for (const role of usersRoles) {
            if (member_role_id == role) {
                await interaction.reply({
                    content: ':rotating_light: You are already a member!',
                    ephemeral: true
                });
                return;
            }
        }

        const id = interaction.options.getString('studentid');
        const studentIdRegEx = new RegExp('s[0-9]{7}');
        if (!studentIdRegEx.test(id)) {
            await interaction.reply({
                content: ':rotating_light: Invalid student ID! Make sure it starts with the "s"',
                ephemeral: true
            });
            return;
        }

        let userID = interaction.member.user;

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(encodeCustomId("memberVerify", userID.id))
                    .setLabel('Yes, this is a member')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId(encodeCustomId("memberReject", userID.id))
                    .setLabel('No, Reject Request')
                    .setStyle(ButtonStyle.Danger),
            )

        const channel = interaction.client.channels.cache.get(member_view_channel);
        if (!channel) {
            await interaction.reply({
                content: ':rotating_light: An Error Occured! Unabled to retrive member verifcation channel!'
            });
            throw new TypeError("Unabled to retrive member verifcation channel")
        }

        channel.send({
            content: `================\nCheck ${userID} against ${id}`,
            components: [row]
        });

    
        await interaction.reply({
            content: `:white_check_mark: Your account (${id}) has been sent for a membership review!`,
            ephemeral: true
        });
    },
};