import "dotenv/config"

export const TOKEN = process.env["TOKEN"]
export const CLIENT_ID = process.env["CLIENT_ID"]

type Setting = "SUBU_AUTH" | "GUILD_ID" | "POLL_CHANNEL_ID" | "ADMIN_CHANNEL_ID"

let cache = {
    SUBU_AUTH: process.env["SUBU_AUTH"],
    GUILD_ID: process.env["GUILD_ID"],
    POLL_CHANNEL_ID: process.env["POLL_CHANNEL_ID"],
    ADMIN_CHANNEL_ID: process.env["ADMIN_CHANNEL_ID"],
}

export const Settings = {
    get(setting: Setting): string {
        return cache[setting]
    },

    set(key: Setting, value: string) {
        cache[key] = value
    },
}
