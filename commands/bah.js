const Discord = require('discord.js')
const keywords = require("../keywords.json");

module.exports = {

  run: async (client, message, args) => {
    if(message.content.startsWith('oa.')) return;

    const word = keywords.RS[Math.floor(Math.random() * keywords.RS.length)];
    
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${word} 🧉`)
      .setColor(message.member ? message.member.displayColor : global.CLIENT_DEFAULT_COLOR)

    message.channel.send(embed).then(() => message.react('🧉')).catch(console.error);
  },

  help: {
    name: "bah",
    description: "responde tchê quando alguem falar bah",
    usage: 'bah',
    category: 'sulista'
  }

}