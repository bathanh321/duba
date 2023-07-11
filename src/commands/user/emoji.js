const {Util, MessageEmbed } = require('discord.js');
const {parse } = require('twemoji-parser');

module.exports = {
    name: 'emoji',
    category: 'user',
    aliases: ['e'],
    run: (client, message, args) =>{
            const emoji = args[0];
            if(!emoji) return message.channel.send("Input an emoji");
            let custom = Util.parseEmoji(emoji);
            const embed = new MessageEmbed()
            .setTitle(`Vẫn là emoji nhưng to hơn cái ${emoji}`)
            .setColor("RANDOM");
            if(custom.id){
                let link = `http://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`
                embed.setImage(link)
                .setFooter(`Emoji ID: ${custom.id}`)
                return message.channel.send(embed);
            } else{
                let parsed = parse(emoji, {assetType: 'png'});
                if(!parsed[0]) return message.channel.send("Invalid!");
                embed.setImage(parsed[0].url);
                return message.channel.send(embed);
            }
    }
}