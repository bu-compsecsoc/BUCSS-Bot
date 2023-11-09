import {
    SlashCommandBuilder,
    EmbedBuilder,
    CommandInteraction,
} from "discord.js"
import { Settings } from "../config"
import { Command } from "../discord/commands"

export const statusCommand: Command = {
    data: new SlashCommandBuilder()
        .setName("status")
        .setDescription("View the current status of the bot"),
    async execute(interaction: CommandInteraction) {
        let embed = new EmbedBuilder()
            .addFields({
                name: "Status",
                value: "Online",
            })
            .addFields({
                name: "Running Since",
                value: getRunningSince(),
            })

        await interaction.reply({
            embeds: [embed],
            ephemeral: true,
        })
    },
}

const startup_time = new Date()
function getRunningSince() {
    return startup_time.toUTCString()
}
