import { Guild, Role, type RoleCreateOptions } from "discord.js"

async function upsertRole(
    guild: Guild,
    config: RoleCreateOptions
): Promise<Role> {
    const existingRole = guild.roles.cache.find(
        (role) => role.name === config.name
    )

    if (existingRole) {
        return existingRole
    } else {
        const role = await guild.roles.create(config)
        return role
    }
}

export async function upsertMemberRole(guild: Guild): Promise<Role> {
    return upsertRole(guild, {
        name: "Member",
        color: "#cc0000",
    })
}

export async function upsertStudentRole(guild: Guild): Promise<Role> {
    return upsertRole(guild, {
        name: "Student",
        color: "#009fe3",
    })
}
