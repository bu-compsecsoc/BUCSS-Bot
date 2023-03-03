type Event = {
    name: string,
    once?: boolean
    execute: (...any) => (void | Promise<void>)
}

import buttonInteraction from "./buttonInteraction";
import handleCommands from "./handleCommands";
import ready from "./ready";

export const events: Event[] = [
    buttonInteraction,
    handleCommands,
    ready,
];