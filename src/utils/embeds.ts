import { EmbedBuilder } from 'discord.js';

export default{
    createEmbed: function(data: any) {
        const embed = new EmbedBuilder()
            .setTitle(data.title)
            .setColor(0x007BFF)
            .setAuthor({name: "BUCSS Committee", iconURL: 'https://i.imgur.com/AfFp7pu.png'})
            .addFields({
                name: 'Message',
                value: data.message
            });
        return embed;
    }
}