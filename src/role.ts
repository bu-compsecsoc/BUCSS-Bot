import { getBucssGuild } from "./constants"
import { Client, Role, type RoleCreateOptions } from "discord.js"

export async function upsertRole(
    client: Client,
    config: RoleCreateOptions
): Promise<Role> {
    const guild = getBucssGuild(client)
    const existingRole = guild.roles.cache.find(
        (role) => role.name === config.name
    )
    if (existingRole) {
        return existingRole
    }

    const role = await guild.roles.create(config)
    return role
}
