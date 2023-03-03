import { Client, GatewayIntentBits } from "discord.js";
import { load_event_handlers } from './events';
import { refresh_slash_commands } from './commands';
import { token } from './config';


(async () => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    
    await refresh_slash_commands()
    load_event_handlers(client)
    client.login(token)
})();