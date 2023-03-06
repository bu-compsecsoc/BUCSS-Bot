import type { ButtonInteraction } from 'discord.js';
export { encodeCustomId, decodeCustomId } from './utils';
import previewAnnouncement from './previewAnnouncement';
import memberVerify from './memberVerify';
import sendAnnouncement from './sendAnnouncement';
import memberReject from './memberReject';

type Interaction = {
    name: string,
    execute: (interaction: ButtonInteraction, data: any) => (void | Promise<void>),
}

const interactions: Interaction[] = [
    sendAnnouncement,
    previewAnnouncement,
    memberVerify,
    memberReject
]


export const interaction_map = new Map<string, Interaction>();
for (let interaction of interactions) {
    interaction_map.set(interaction.name, interaction)
}
