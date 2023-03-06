import type { ButtonInteraction } from 'discord.js';
export { encodeCustomId as encodeCustomID, decodeCustomId as decodeCustomID } from './utils';
import previewAnnouncement from './previewAnnouncement';
import memberVerify from './memberVerify';
import sendAnnouncement from './sendAnnouncement';

type Interaction = {
    name: string,
    generateCustomID: (...args: any[]) => string,
    execute: (interaction: ButtonInteraction, data: any) => (void | Promise<void>),
}

const interactions: Interaction[] = [
    sendAnnouncement,
    previewAnnouncement,
    memberVerify,
]

export const interaction_map = new Map<string, Interaction>();

for (let interaction of interactions) {
    interaction_map.set(interaction.name, interaction)
}
