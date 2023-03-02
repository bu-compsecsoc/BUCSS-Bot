require('dotenv').config()
// Require Discord.JS
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const { commands } = require('./commands');
const { events } = require('./events');
const token = process.env.TOKEN;

// Create Client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Create Collection
client.commands = new Collection();


for (const command of commands) {
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
        );
    }
}

for (const event of events) {
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}


client.login(token);