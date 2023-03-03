require('dotenv').config()
// Require Discord.JS
import { Client, GatewayIntentBits, Collection } from "discord.js";
import { commands } from './commands';
import { events } from './events';
import { deployCommands } from "./deployCommands";
const token = process.env.TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

for (const event of events) {
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}


deployCommands().then(() => client.login(token));