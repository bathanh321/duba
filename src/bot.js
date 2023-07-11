require('dotenv').config();
const{ Client, TextChannel, Collection } = require('discord.js');
const client = new Client();
const moment = require('moment-timezone');
const channelId = '1100462394725113888'; 
client.on('ready', ()=>{
    console.log(`${client.user.tag} has logged in.`);
    scheduleGoodMorning();
});

client.commands = new Collection();
client.aliases = new Collection();
["command"].forEach(handler=>{
    require(`./handlers/${handler}`)(client);
});
client.on('message', (message) =>{
    if(message.author.bot) return;
    const prefix = ".";
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args);
    
})
let isScheduled = false;

function scheduleGoodMorning() {
  const now = moment().tz('Asia/Saigon');
  const targetTime = now.clone().set({ hour: 0, minute: 0, second: 0 }); // Đặt giờ 0:00 AM
  let timeUntilTarget = targetTime.diff(now);

  if (timeUntilTarget < 0) {
    targetTime.add(1, 'day'); // Nếu đã qua 0 giờ, chờ đến 0 giờ hôm sau
    timeUntilTarget = targetTime.diff(now);
  }

  setTimeout(() => {
    sendGoodMorningMessage();
  }, timeUntilTarget);
}

async function sendGoodMorningMessage() {
  if (!isScheduled) {
    try {
      const channel = await client.channels.fetch(channelId);
      if (channel instanceof TextChannel) {
        channel.send("Chào ngày mới, chúc bạn ngày mới tốt lành", { files: ["https://media.discordapp.net/attachments/1100462394725113888/1117860873176883261/Sus.png"] });
      }
      isScheduled = true;
    } catch (error) {
      console.error(`Error sending good morning message: ${error}`);
    }
  }
}

// Gọi hàm scheduleGoodMorning() để bắt đầu lập lịch
scheduleGoodMorning();
client.login("MTEyMzI1NzExNzM0OTAwMzI3NA.GmcLBj.8h9BaXAUn_k8tb4MwF0eni6lT5GpYCR_migrOU");