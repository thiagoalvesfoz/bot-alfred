const fs = require('fs')
const embed  = require('../utils/setErrorMessage');
const { getUserFromMention } = require('../utils/getUserFromMention')
const { convertPcmToWav } = require('../utils/convertPcmToWav')

module.exports = {

  run: async (client, message, args) => {
    
    // if (!!client) {
    //   return embed.sendErrorMessage(message, {
    //     title: "Essa funcionalidade foi desabilitada temporariamente até resolver o problema com mic do moreira"
    //   });
    // }
    
    const fileName = `${process.cwd()}/${message.author.id}.pcm`;
    const fileWav = `${process.cwd()}/${message.author.id}.wav`;
    
    if (!fs.existsSync(fileWav)) {
      
      if (fs.existsSync(fileName)) {
        convertPcmToWav(fileName, fileWav);
      }
      else {
        return embed.sendErrorMessage(message, {
          title: "Calma la, você precisa gravar um áudio primeiro."
        });
      }      
    }
    
    const user = client.users.cache.get(message.author.id);
    const mentions = args.map(mention => getUserFromMention(mention, client)).join();
    const msgWithMentions = `${user} disse para ${mentions}:`
    const msg = `${user} disse:`
    
    return message.channel.send(!!mentions ? msgWithMentions : msg, {
      files: [fileWav]
    });

  },

  help: {
    name: "play",
    description: "Envia sua voz linda no chat",
    usage: 'play',
    category: 'gravação'
  }
}