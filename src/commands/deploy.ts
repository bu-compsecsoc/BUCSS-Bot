import { REST, Routes } from 'discord.js';
import { commands } from '.';
import { token, client_id } from '../utils/config';


export async function refresh_slash_commands() {
    const rest = new REST({ version: '10' }).setToken(token);
    const body = commands.map(command => command.data.toJSON());

    console.log(`Refreshing ${commands.length} application (/) commands.`);
    try {
        await rest.put(Routes.applicationCommands(client_id), { body });
        console.log(`Successfully reloaded ${commands.length} application (/) commands`);
    } catch (error) {
        console.error(error);
    }
}