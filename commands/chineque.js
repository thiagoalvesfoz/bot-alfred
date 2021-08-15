const fs = require('fs')
const embed  = require('../utils/setErrorMessage');
const { getUserFromMention } = require('../utils/getUserFromMention');

module.exports = {

  run: async (client, message, args) => {
    
    const user = client.users.cache.get(message.author.id);
    const mention = getUserFromMention(args[0], client)

    if (!mention) {
      return message.channel.send(`Aqui está o seu o chineque :bagel:`);
    }

    const msgWithMentions = `${user} deu um chineque para ${mention} :bagel:`    
    return message.channel.send(msgWithMentions);
  },

  help: {
    name: "chineque",
    description: "manda um chineque para outra pessoa",
    usage: 'chineque <USER>',
    category: 'funny'
  }
}