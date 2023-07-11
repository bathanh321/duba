const Discord = require('discord.js');

module.exports = {
    name: 'simleave',
    category: 'simulation',
    aliases: ['sl'],
    run: async (client, message, args) =>{
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You dont have the require perrmission');
        client.on('guildMemberRemove', member =>{
            message.channel.send(`${member} has left the server!`)
        })
        client.emit('guildMemberRemove', message.member);
    }
}