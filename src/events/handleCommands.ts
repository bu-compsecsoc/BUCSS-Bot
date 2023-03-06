import { Events, CommandInteraction } from 'discord.js';
import { command_map } from '../commands';

export default{
    name: Events.InteractionCreate,
    async execute(interaction: CommandInteraction) {
        if (!interaction.isChatInputCommand()) return;

        const command = command_map.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            const user = `${interaction.user.username}#${interaction.user.discriminator}`
            console.log(`Executing /${interaction.commandName} from ${user}`)
            await command.execute(interaction);
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}`);
            console.error(error);
        }
    },
};