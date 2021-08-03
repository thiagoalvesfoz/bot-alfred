const Discord = require('discord.js')

module.exports = {

  run: async (client, message, args) => {

    const voicechannel = message.member.voice.channel;

    if (!voicechannel) {

      const embed = new Discord.MessageEmbed()
        .setAuthor("Você deve estar conectado a um canal de voz antes de usar este comando!")
        .setColor("#ED4245");

      return message.channel.send(embed);
    }

    message.member.voice.channel.leave();
  },

  help: {
    name: "disconnect",
    description: "desconecta o bot da chamada",
    usage: 'disconnect',
    category: 'gravação'
  }
}
