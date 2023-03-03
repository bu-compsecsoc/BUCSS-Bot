import type { ButtonInteraction } from 'discord.js';
import sendAnnouncement from "./sendAnnouncement";
import previewAnnouncement from './previewAnnouncement';
import memberVerify from './memberVerify';

type Interaction = {
    name: string,
    execute: (interaction: ButtonInteraction) => (void | Promise<void>),
}

export const interactions: Interaction[] = [
    sendAnnouncement,
    previewAnnouncement,
    memberVerify,
]