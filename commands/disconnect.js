module.exports = {

  run: async (client, message, args) => {

    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("ô caraio, entra num canal de voz primeiro antes de pedir algo!")

    message.member.voice.channel.leave();
  },

  help: {
    name: "disconnect",
    description: "desconecta o bot da chamada",
    usage: 'disconnect',
    category: 'gravação'
  }
}
