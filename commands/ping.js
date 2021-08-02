const Discord = require('discord.js')

module.exports = {

  run: async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
      .setAuthor(`🏓 Pong! Latência: ${Math.round(client.ws.ping)}ms`)
      .setColor(message.member ? message.member.displayColor : global.CLIENT_DEFAULT_COLOR)

    message.channel.send(embed).catch(console.error);
  },

  help: {
    name: 'ping',
    description: 'Mostra a latência do bot.',
    usage: 'ping',
    category: 'Info'
  }
}