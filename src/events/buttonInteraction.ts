import { Events } from 'discord.js';
import type { ButtonInteraction } from 'discord.js';
import { interactions } from '../interactions';

export default {
    name: Events.InteractionCreate,
    async execute(interaction: ButtonInteraction) {
        if (!interaction.isButton()) return;

        let [interaction_name, data] = interaction.customId.split("|");
        if (data !== undefined) {
            let b64_decoded_data = Buffer.from(data, "base64").toString();
            data = JSON.parse(b64_decoded_data);
        }

        for (let interaction_handler of interactions) {
            if (interaction_name === interaction_handler.name) {
                interaction_handler.execute(interaction, data)
                return;
            }
        }
    },
};