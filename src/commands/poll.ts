import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    CommandInteraction,
    ActionRowBuilder,
    ButtonBuilder,
    Client,
    TextInputBuilder,
    TextInputStyle,
    Message,
} from "discord.js"
import { createButton, createButtons, createModal } from "../discord"
import { Command } from "../discord/commands"
import { getPollChannel, getAdminChannel } from "../constants"

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

export const pollCommand: Command = {
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("View the current status of the bot")
        .addStringOption((option) =>
            option
                .setName("question")
                .setDescription("What do you want to poll?")
                .setRequired(true)
        )
        .addIntegerOption((option) =>
            option
                .setName("duration")
                .setDescription("The poll duration in minutes")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("options")
                .setDescription("Options, seperated by semicolons ';'")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction: CommandInteraction) {
        const question = interaction.options.get("question").value as string
        const duration = interaction.options.get("duration").value as number
        const option_string = interaction.options.get("options").value as string

        const options = option_string.split(";")
        let message = await createPoll(
            interaction.client,
            question,
            options,
            duration * 60 * 1000
        )
        await interaction.reply({
            content: `Poll Created at ${message.url}`,
            ephemeral: true,
        })
    },
}

function createOptionName(index: number) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    return alphabet.at(index).toUpperCase()
}

async function createPoll(
    client: Client,
    question: string,
    options: string[],
    duration: number = 24 * 60 * 60 * 1000
): Promise<Message<true>> {
    const startTime = Date.now()
    const endDate = new Date(startTime + duration)
    const selections: Record<string, string> = {}
    let open = true

    const getCount = (option: string) =>
        Object.values(selections).filter((selection) => selection === option)
            .length

    const pollChannel = getPollChannel(client)
    const pollMessage = await pollChannel.send({
        content: `@everyone, **${question}**`,
    })
    await updatePoll()
    setTimeout(closePoll, duration)

    async function updatePoll() {
        if (!open) return

        let embed = new EmbedBuilder({
            fields: [
                {
                    name: `Ending ${dayjs(endDate).fromNow()}`,
                    value: endDate.toLocaleString(),
                },
                ...options.map((option, i) => ({
                    name: `${createOptionName(i)} - ${option}`,
                    value: getCount(option).toString(),
                    inline: true,
                })),
            ],
        })

        let buttons = new ActionRowBuilder<ButtonBuilder>({
            components: options.map((option, i) =>
                createButton({
                    title: createOptionName(i),
                    type: "primary",
                    callback: async (interaction) => {
                        selections[interaction.user.id] = option
                        await interaction.reply({
                            ephemeral: true,
                            content: `You selected "${option}"`,
                        })
                        setTimeout(async () => {
                            await interaction.deleteReply()
                        }, 10_000)
                        await updatePoll()
                    },
                })
            ),
        })

        await pollMessage.edit({
            embeds: [embed],
            components: [buttons],
        })
    }

    async function closePoll() {
        open = false
        pollMessage.edit({
            content: `Poll Closed: **${question}**`,
            embeds: [
                new EmbedBuilder({
                    fields: options.map((option) => ({
                        name: option,
                        value: getCount(option).toString(),
                    })),
                }),
            ],
            components: [],
        })

        const adminChannel = getAdminChannel(client)
        adminChannel.send({
            embeds: [
                new EmbedBuilder({
                    title: `Poll Results: ${question}`,
                    fields: [
                        ...options.map((option) => ({
                            name: option,
                            value: getCount(option).toString(),
                            inline: true,
                        })),
                        ...options.map((option) => ({
                            name: option,
                            value:
                                Object.entries(selections)
                                    .filter(
                                        ([_, selection]) => selection === option
                                    )
                                    .map(([user_id, _]) => `<@${user_id}>`)
                                    .join(" ") || "Nobody",
                        })),
                    ],
                }),
            ],
        })
    }

    return pollMessage
}
