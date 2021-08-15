const Discord = require('discord.js')
const keywords = require("../keywords.json");

module.exports = {

  run: async (client, message, args) => {
    if(message.content.startsWith('oa.')) return;

    const word = keywords.CE[Math.floor(Math.random() * keywords.CE.length)];
    
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${word}`)
      .setColor(message.member ? message.member.displayColor : global.CLIENT_DEFAULT_COLOR)

    message.channel.send(embed).catch(console.error);
  },

  help: {
    name: "valha",
    description: "responde quando alguem falar valha",
    usage: 'valha',
    category: 'cearence'
  }

}