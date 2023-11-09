import {
    SlashCommandBuilder,
    EmbedBuilder,
    CommandInteraction,
    PermissionFlagsBits,
} from "discord.js"
import { Settings } from "../config"
import { Command } from "../discord/commands"

export const setGuildCommand: Command = {
    data: new SlashCommandBuilder()
        .setName("set_guild")
        .setDescription("Sets this as the BUCSS guild")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction: CommandInteraction) {
        Settings.set("GUILD_ID", interaction.guildId)
        await interaction.reply({
            ephemeral: true,
            content: `Guild set to ${interaction.guildId}`,
        })
    },
}

export const setAdminChannelCommand: Command = {
    data: new SlashCommandBuilder()
        .setName("set_admin_channel")
        .setDescription("Sets the admin channel for bot messages")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction: CommandInteraction) {
        Settings.set("ADMIN_CHANNEL_ID", interaction.channelId)
        await interaction.reply({
            ephemeral: true,
            content: `Admin channel set to <#${interaction.channelId}>`,
        })
    },
}

export const setPollChannelCommand: Command = {
    data: new SlashCommandBuilder()
        .setName("set_poll_channel")
        .setDescription("Sets the channel polls are placed")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction: CommandInteraction) {
        Settings.set("POLL_CHANNEL_ID", interaction.channelId)
        await interaction.reply({
            ephemeral: true,
            content: `Poll channel set to <#${interaction.channelId}>`,
        })
    },
}

export const setSubuLoginCommand: Command = {
    data: new SlashCommandBuilder()
        .setName("set_subu_cookie")
        .setDescription("Sets the cookie that SUBU login will use")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption((option) =>
            option
                .setName("cookie")
                .setDescription("The cookie to use for SUBU login")
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        let cookie = interaction.options.get("cookie").value as string
        Settings.set("SUBU_AUTH", cookie)
        await interaction.reply({
            ephemeral: true,
            content: `SuBU auth cookie updated`,
        })
    },
}
