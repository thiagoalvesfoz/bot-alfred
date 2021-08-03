const Discord = require('discord.js')
const keywords = require("../keywords.json");

module.exports = {

  run: async (client, message, args) => {
    if(message.content.startsWith('oa.')) return;
      
    const word = keywords[Math.floor(Math.random() * keywords.length)];
    
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${word} 🧉`)
      .setColor(message.member ? message.member.displayColor : global.CLIENT_DEFAULT_COLOR)

    message.channel.send(embed).catch(console.error);
  },

  help: {
    name: "bah",
    description: "responde tchê quando alguem falar bah",
    usage: 'bah',
    category: 'sulista'
  }

}