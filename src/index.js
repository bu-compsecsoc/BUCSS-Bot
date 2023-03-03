require('dotenv').config()
// Require Discord.JS
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { commands } = require('./commands');
const { events } = require('./events');
const { deployCommands } = require("./deployCommands");
const token = process.env.TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });


client.commands = new Collection();
for (const command of commands) {
    client.commands.set(command.data.name, command);
}

for (const event of events) {
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}


deployCommands().then(() => client.login(token));