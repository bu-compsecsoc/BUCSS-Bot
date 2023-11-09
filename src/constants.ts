import { Client, Guild, TextChannel } from "discord.js"
import { Settings } from "./config"

export function getBucssGuild(client: Client): Guild {
    return client.guilds.resolve(Settings.get("GUILD_ID"))
}

export function getPollChannel(client: Client): TextChannel | null {
    const channel = client.channels.resolve(Settings.get("POLL_CHANNEL_ID"))
    const isChannel = channel instanceof TextChannel
    return isChannel ? channel : null
}

export function getAdminChannel(client: Client): TextChannel | null {
    const channel = client.channels.resolve(Settings.get("ADMIN_CHANNEL_ID"))
    const isChannel = channel instanceof TextChannel
    return isChannel ? channel : null
}
