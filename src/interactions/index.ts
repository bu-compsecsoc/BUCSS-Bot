import type { ButtonInteraction } from 'discord.js';
import previewAnnouncement from './previewAnnouncement';
import memberVerify from './memberVerify';
import sendAnnouncement from './sendAnnouncement';
import memberReject from './memberReject';

type Interaction = {
    name: string,
    execute: (interaction: ButtonInteraction, data: any) => (void | Promise<void>),
}

export const interactions: Interaction[] = [
    sendAnnouncement,
    previewAnnouncement,
    memberVerify,
    memberReject
]

type InteractionName = 
    "sendAnnouncement" |
    "previewAnnouncement" |
    "memberVerify" | 
    "memberReject"

export function generateCustomId(name: InteractionName, data: any|null = null) {
    let json = JSON.stringify(data);
    let b64_data = Buffer.from(json).toString("base64")
    return `${name}|${b64_data}`;
}
