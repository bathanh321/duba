const { Util } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'addemoji',
    category: 'user',
    aliases: ['ae'],
    run: async (client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You dont have the require perrmission');
        if (!args.length) return message.channel.send('Specify some emojis to add');

        for (const emoji of args) {
            const parsedEmoji = Util.parseEmoji(emoji);

            if (parsedEmoji.id) {
                const emojiExt = parsedEmoji.animated ? '.gif' : '.png';
                const emojiURL = `http://cdn.discordapp.com/emojis/${parsedEmoji.id}${emojiExt}`;

                try {
                    const response = await fetch(emojiURL);
                    const emojiData = await response.buffer();

                    const createdEmoji = await message.guild.emojis.create(emojiData, parsedEmoji.name);
                    message.channel.send(`Added :${createdEmoji.name}: to the server`);
                } catch (error) {
                    console.log(`Failed to add emoji ${emoji}: ${error}`);
                }
            }
        }
    }
};
