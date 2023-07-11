const moment = require('moment-timezone');
const targetTimezone = 'Asia/Saigon';
const now = moment().tz(targetTimezone);

module.exports =  {
    name: 'date',
    category: 'user',
  run: (client, message, args) => {
    
      const serverTimezone = moment.tz.guess();
      const botTimezone = moment.tz.guess();

      message.channel.send(`Múi giờ của máy chủ là: ${serverTimezone}`);
      message.channel.send(`Múi giờ của bot là: ${botTimezone}`);
      console.log('Thời gian hiện tại theo múi giờ của bot:', now.format());
    
  }
};
