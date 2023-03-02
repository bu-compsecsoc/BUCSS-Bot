const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('discord.js');

export default {
    createAnnoucement: function(data) {
        return `${bold("Hey ")} @everyone ${bold("!")}\n\n${data.message.trim()}\n\n${italic("- The BUCSS Committee")}`;
    }
}