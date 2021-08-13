const Discord = require('discord.js')
const keywords = require("../keywords.json");

module.exports = {

  run: async (client, message, args) => {
    if(message.content.startsWith('oa.')) return;
      
    const word = keywords.PR[Math.floor(Math.random() * keywords.PR.length)];
    
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${word}`)
      .setColor(message.member ? message.member.displayColor : global.CLIENT_DEFAULT_COLOR)

    message.channel.send(embed).catch(console.error);
  },

  help: {
    name: "pia",
    description: "responde tesão pia quando alguem digitar pia",
    usage: 'pia',
    category: 'sulista'
  }

}