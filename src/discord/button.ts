import { ButtonBuilder, ButtonStyle } from "discord.js"
import {
    ButtonInteraction,
    APIMessageComponentEmoji,
    ActionRowBuilder,
} from "discord.js"

type InteractionHandler = (
    interaction: ButtonInteraction
) => void | Promise<void>
const interactions = new Map<string, InteractionHandler>()

export function createButtonCallback(handler: InteractionHandler) {
    const buttonId = Math.random().toString(36).slice(2, 10)
    interactions.set(buttonId, handler)
    setTimeout(() => interactions.delete(buttonId), 60 * 60 * 1000)
    return buttonId
}

export async function runButtonInteraction(interaction: ButtonInteraction) {
    const handler = interactions.get(interaction.customId)
    if (handler) await handler(interaction)
}

const ButtonTypesLookup = {
    primary: ButtonStyle.Primary,
    secondary: ButtonStyle.Secondary,
    success: ButtonStyle.Success,
    danger: ButtonStyle.Danger,
    link: ButtonStyle.Link,
} as const
type ButtonType = keyof typeof ButtonTypesLookup
type ButtonSettings = {
    title: string
    type: ButtonType
    disabled?: boolean
    emoji?: APIMessageComponentEmoji
} & (
    | { type: "link"; url: string }
    | { type: Exclude<ButtonType, "link">; callback: InteractionHandler }
)
export function createButton(settings: ButtonSettings): ButtonBuilder {
    let clickSettings =
        settings.type === "link"
            ? { url: settings.url }
            : { custom_id: createButtonCallback(settings.callback) }

    return new ButtonBuilder({
        label: settings.title,
        emoji: settings.emoji,
        disabled: settings.disabled,
        style: ButtonTypesLookup[settings.type],
        ...clickSettings,
    })
}

export function createButtons(
    ...settings: ButtonSettings[]
): ActionRowBuilder<ButtonBuilder> {
    return new ActionRowBuilder<ButtonBuilder>({
        components: settings.map(createButton),
    })
}
