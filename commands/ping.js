const Discord = require('discord.js')

module.exports = {

  run: async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
      .setAuthor(`🏓 Pong`)
      .setColor(message.member ? message.member.displayColor : global.CLIENT_DEFAULT_COLOR)

    message.channel.send(embed).catch(console.error);
  },

  get help () {
    return {
      name: 'ping',
      description: 'Mostra a latência do bot.',
      usage: 'ping',
      category: 'Info'
    }
  }
}