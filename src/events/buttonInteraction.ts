import { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import type { ButtonInteraction } from 'discord.js';
import { createAnnouncement, createPreviewAnnouncement } from '../utils/templates';
import Store from '../utils/store';
import { interactions } from '../interactions';
import { announcement_channel_id, member_role_id } from '../utils/config';

export default {
	name: Events.InteractionCreate,
    async execute(interaction: ButtonInteraction) {
        if (!interaction.isButton()) return;

        for (let interaction_handler of interactions) {
            if (interaction.customId.startsWith(interaction_handler.name)) {
                interaction_handler.execute(interaction)
                return;
            }
        }
	},
};