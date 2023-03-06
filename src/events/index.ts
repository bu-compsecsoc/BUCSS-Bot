import type { Client } from "discord.js";
type Event = {
    name: string,
    once?: boolean,
    execute: (...args: any[]) => (void | Promise<void>),
}

import buttonInteraction from "./handleButtons";
import handleCommands from "./handleCommands";
import ready from "./ready";

export const events: Event[] = [
    buttonInteraction,
    handleCommands,
    ready,
];


export function load_event_handlers(client: Client) {
    for (const event of events) {
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}