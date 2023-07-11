 const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'banner',
  category: 'user',
  aliases: ['b'],
  run: async (client, message, args) => {
    
    const ID = message.mentions.users.first()?.id || message.author.id;

    const userData = await axios.get(`https://discord.com/api/users/${ID}`, {
      headers: {
        Authorization: `Bot ${client.token}`,
      },
    }).then((res) => res.data);

    const bannerUrl = userData.banner ? `https://cdn.discordapp.com/banners/${userData.id}/${userData.banner}?size=512` : null;
    const embed = new MessageEmbed()
      .setTitle(`${userData.username}'s banner`)
      if (bannerUrl) {
        embed.setDescription(`Look at ${userData.username}'s banner, how cool is that?`)
          .setImage(bannerUrl);
          
      
      } else {
        embed.setDescription(`${userData.username} doesn't have nitro to get banner, how sad`);
      }
      message.channel.send(embed);
  }
};
