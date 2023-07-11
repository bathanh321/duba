const Discord = require('discord.js');

module.exports = {
    name: 'simjoin',
    category: 'simulation',
    aliases: ['sj'],
    run: async (client, message, args) =>{
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You dont have the require perrmission');
        client.on('guildMemberAdd', member =>{
            message.channel.send(`${member} has joined the server!`)
        })
        client.emit('guildMemberAdd', message.member);
    }
}