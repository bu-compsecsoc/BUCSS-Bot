import type { SlashCommandBuilder, BaseInteraction} from 'discord.js';

type Command = {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">,
    execute:  (BaseInteraction) => Promise<void>
}

import activity from "./activity";
import status from "./status";
import updateStatus from "./updateStatus";
import verifyMember from "./verifyMember";
import writeAnnouncement from "./writeAnnouncement";

export const commands: Command[] = [
    activity,
    status,
    updateStatus,
    verifyMember,
    writeAnnouncement
]
export const command_map = new Map<string, Command>();

for (let command of commands) {
    command_map.set(command.data.name, command)
}

export { refresh_slash_commands } from "./deploy";