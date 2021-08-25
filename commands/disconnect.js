const embed  = require('../utils/setErrorMessage');

module.exports = {

  run: async (client, message, args) => {

    // if (!!client) {
    //   return embed.sendErrorMessage(message, {
    //     title: "Essa funcionalidade foi desabilitada temporariamente até resolver o problema com mic do moreira"
    //   });
    // }

    const inSameChannel = client.voice.connections.some(
      (connection) => connection.channel.id === message.member.voice.channelID
    )

    if (!inSameChannel)
      return embed.sendErrorMessage(message, {
        title: 'Você precisa estar no mesmo canal que o bot!'
      });


    message.member.voice.channel.leave();
  },

  help: {
    name: "disconnect",
    description: "desconecta o bot da chamada",
    usage: 'disconnect',
    category: 'gravação'
  }
}
