import { Client, GatewayIntentBits } from "discord.js";
import { load_event_handlers } from './events';
import { refresh_slash_commands } from './commands';
import { token } from './config';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

(async () => {
    await refresh_slash_commands()
    load_event_handlers(client)
    client.login(token)
})();