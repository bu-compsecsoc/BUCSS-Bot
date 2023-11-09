import type {
    ModalActionRowComponentBuilder,
    BaseInteraction,
    ModalSubmitInteraction,
    ModalComponentData,
    APIModalInteractionResponseCallbackData,
} from "discord.js"
import { ActionRowBuilder, ModalBuilder } from "discord.js"

type InteractionHandler = (
    interaction: ModalSubmitInteraction
) => void | Promise<void>
const interactions = new Map<string, InteractionHandler>()

function createModalCallback(handler: InteractionHandler): string {
    const buttonId = Math.random().toString(36).slice(2, 10)
    interactions.set(buttonId, handler)
    setTimeout(() => interactions.delete(buttonId), 60 * 60 * 1000)
    return buttonId
}

export async function runModalSubmitInteraction(
    interaction: ModalSubmitInteraction
) {
    const handler = interactions.get(interaction.customId)
    if (handler) await handler(interaction)
}

type ModalSettings = {
    title: string
    components: ModalActionRowComponentBuilder[]
    callback: InteractionHandler
}

export function createModal({ title, components, callback }: ModalSettings) {
    return new ModalBuilder()
        .setTitle(title)
        .addComponents(...components.map(createModalRow))
        .setCustomId(createModalCallback(callback))
}
function createModalRow(component: ModalActionRowComponentBuilder) {
    return new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        component
    )
}
