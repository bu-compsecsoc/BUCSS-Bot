const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('discord.js');

export function createPreviewAnnouncement(message: string) {
    const HEADER = `:rotating_light: ${italic(bold("THIS IS A PREVIEW MESSAGE"))} :rotating_light:\n\n`
    return HEADER + createAnnouncement(message);
}

export function createAnnouncement(message: string) {
    return `${bold("Hey ")} @everyone ${bold("!")}\n\n${message.trim()}\n\n${italic("- The BUCSS Committee")}`;
}