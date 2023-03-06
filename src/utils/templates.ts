const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('discord.js');

export function createPreviewAnnouncement(announcement: string) {
    let message = createAnnouncement(announcement);
    message += "\n\n"
    message += `:rotating_light: ${italic(bold("THIS IS A PREVIEW MESSAGE"))} :rotating_light:`
    return message
}

export function createAnnouncement(announcement: string) {
    return `${bold("Hey ")} @everyone ${bold("!")}\n\n${announcement.trim()}\n\n${italic("- The BUCSS Committee")}`;
}