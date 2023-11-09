import { REST, Routes } from "discord.js"
import type {
    SlashCommandBuilder,
    CommandInteraction,
    ChatInputCommandInteraction,
    AutocompleteInteraction,
} from "discord.js"
import { TOKEN, CLIENT_ID } from "../config"

export type Command = {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    autocomplete?: (interaction: AutocompleteInteraction) => Promise<unknown>
    execute: (interaction: CommandInteraction) => Promise<unknown>
}

const command_lookup = new Map<string, Command>()

export async function runCommandInteraction(
    interaction: ChatInputCommandInteraction
) {
    const command = command_lookup.get(interaction.commandName)
    if (!command) {
        interaction.reply("Command not found")
        return
    }

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(`Error executing ${interaction.commandName}`)
        console.error(error)
    }
}

export async function runAutocompleteInteraction(
    interaction: AutocompleteInteraction
) {
    const command: Command | undefined = command_lookup.get(
        interaction.commandName
    )
    if (command?.autocomplete === undefined) {
        throw new Error(
            `Autocomplete function not set for /${interaction.commandName}`
        )
    }

    await command.autocomplete(interaction)
}

export async function registerSlashCommands(...commands: Command[]) {
    const rest = new REST({ version: "10" }).setToken(TOKEN)
    const body = commands.map((command) => command.data.toJSON())
    for (const command of commands) {
        const name = command.data.name
        command_lookup.set(name, command)
    }

    console.log(`Loading ${commands.length} application (/) commands.`)
    try {
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body })
    } catch (error) {
        console.error(error)
    }
}
