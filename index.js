require('dotenv').config()

const Discord = require('discord.js');
const config = require("./config.json");

const client = new Discord.Client();

client.on("ready", () => {
  client.user.setActivity(`on ${client.guilds.cache.size} servers`);
  console.log(`Ready to serve on ${client.guilds.cache.size} servers, for ${client.users.cache.size} users.`);
});

client.on('message', message => {
  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  switch (command) {
    case "ping" :
      message.channel.send('Pong!');
      break;
    case "bah" :
      message.channel.send('Tche');
      break;    
  }
});

client.on("debug", (e) => console.info(e));
client.login(process.env.TOKEN);