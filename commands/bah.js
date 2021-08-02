const Discord = require('discord.js')

module.exports = {

  run: async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
      .setAuthor(`Tchê`)
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