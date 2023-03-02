require('dotenv').config()
const { REST, Routes } = require('discord.js');
const { commands } = require('./commands');
const clientId = process.env.CLIENTID;
const token = process.env.TOKEN;


export async function deployCommands() {
	const rest = new REST({ version: '10' }).setToken(token);
	const body = commands.map(command => command.data.toJSON());

	console.log(`Started refreshing ${commands.length} application (/) commands.`);
	(async () => {
		try {
			// The put method is used to fully refresh all commands in the guild with the current set
			const data = await rest.put(Routes.applicationCommands(clientId), { body });
	
			console.log(`Successfully reloaded ${data.length} application (/) commands.`);
		} catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
		}
	})();

}