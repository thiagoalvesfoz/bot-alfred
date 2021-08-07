const fs = require('fs')
const embed  = require('../utils/setErrorMessage');
const { getUserFromMention } = require('../utils/getUserFromMention')
const { convertPcmToWav } = require('../utils/convertPcmToWav')

module.exports = {

  run: async (client, message, args) => {

    if (!!client) {
      return embed.sendErrorMessage(message, {
        title: "Essa funcionalidade foi desabilitada temporariamente até resolver o problema com mic do moreira"
      });
    }

    const voicechannel = message.member.voice.channel;

    if (!voicechannel) {
      return embed.sendErrorMessage(message, {
        title: "Você deve estar conectado a um canal de voz antes de usar este comando!"
      });
    }

     // check if there is already a voice connection
     if (message.member.voice.channel.connection) {
      console.log('conn status: ' + message.member.voice.channel.connection.status);
    }

    message.react('🎙️');

    const fileName = `${process.cwd() + message.author.id}.pcm`;
    const fileWav = `${process.cwd()+ message.author.id}.wav`;


    // Pega a tag do usuário e as menções
    const user = client.users.cache.get(message.author.id);
    const mentions = args.map(mention => getUserFromMention(mention, client)).join();
    const msgWithMentions = `${user} disse para ${mentions}:`
    const msg = `${user} disse:`

    try {
      const connection = await message.member.voice.channel.join();
      const receiver = connection.receiver.createStream(message.member, {
        mode: "pcm",
        end: "silence"
      });   

      const writer = receiver.pipe(fs.createWriteStream(fileName));
      writer.on("finish", () => {    
        convertPcmToWav(fileName, fileWav);
        message.member.voice.channel.leave();
        message.channel.send(!!mentions ? msgWithMentions : msg, {
          files: [ fileWav ]
        });
      });
    } catch(err) {
      console.log("ERROR", err)

      return embed.sendErrorMessage(message, {
        title: "Audio não gravado. Um problema inesperado ocorreu. :("
      });
    }

  },

  help: {
    name: "rec",
    description: "grava sua voz para enviar no chat",
    usage: 'rec',
    category: 'gravação'
  }
}