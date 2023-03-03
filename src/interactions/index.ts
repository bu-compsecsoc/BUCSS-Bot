import type { ButtonInteraction } from 'discord.js';
import previewAnnouncement from './previewAnnouncement';
import memberVerify from './memberVerify';
import sendAnnouncement from './sendAnnouncement';

type Interaction = {
    name: string,
    execute: (interaction: ButtonInteraction, data: any) => (void | Promise<void>),
}

export const interactions: Interaction[] = [
    sendAnnouncement,
    previewAnnouncement,
    memberVerify,
]

type InteractionName = 
    "sendAnnouncement" |
    "previewAnnouncement" |
    "memberVerify"

export function generateCustomId(name: InteractionName, data: any|null = null) {
    let json = JSON.stringify(data);
    let b64_data = Buffer.from(json).toString("base64")
    return `${name}|${b64_data}`;
}
