module.exports = {
    name: 'ping',
    category: 'user',
    aliases: ['p'],
    run: (client, message, args)=>{
        message.reply("Pong! Bot Latency: " + client.ws.ping + "ms");
    }
}