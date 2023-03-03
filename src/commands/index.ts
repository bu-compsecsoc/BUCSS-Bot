import type { SlashCommandBuilder, Interaction } from 'discord.js';

type Command = {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">,
    execute:  (Interaction) => Promise<void>
}

import activity from "./activity";
import status from "./updateStatus";
import verifyMember from "./verifyMember";
import writeAnnouncement from "./writeAnnouncement";

export const commands: Command[] = [
    activity,
    status,
    verifyMember,
    writeAnnouncement
]