import { Events } from 'discord.js';
import type { ButtonInteraction } from 'discord.js';
import { decodeCustomId, interaction_map } from '../interactions';

export default {
    name: Events.InteractionCreate,
    async execute(interaction: ButtonInteraction) {
        if (!interaction.isButton()) return;

        let { interaction_name, data } = decodeCustomId(interaction.customId);
        let interaction_object = interaction_map.get(interaction_name);

        if (!interaction_object) {
            console.error(`No command matching ${interaction_name} was found.`);
            return;
        }

        try {
            const user = `${interaction.user.username}#${interaction.user.discriminator}`
            console.log(`Executing /${interaction_name} from ${user} with data: ${JSON.stringify(data)}`)
            await interaction_object.execute(interaction, data);
        } catch (error) {
            console.error(`Error executing ${interaction_name}`);
            console.error(error);
        }
        
    },
};