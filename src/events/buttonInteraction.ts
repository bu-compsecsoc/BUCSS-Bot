import { Events } from 'discord.js';
import type { ButtonInteraction } from 'discord.js';
import { decodeCustomID, interaction_map } from '../interactions';

export default {
    name: Events.InteractionCreate,
    async execute(interaction: ButtonInteraction) {
        if (!interaction.isButton()) return;

        let { interaction_name, data } = decodeCustomID(interaction.customId);
        let interaction_object = interaction_map.get(interaction_name);

        if (!interaction_object) {
            console.error(`No command matching ${interaction_name} was found.`);
            return;
        }

        try {
            await interaction_object.execute(interaction, data);
        } catch (error) {
            console.error(`Error executing ${interaction_name}`);
            console.error(error);
        }
        
    },
};