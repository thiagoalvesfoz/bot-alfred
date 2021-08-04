const Discord = require('discord.js')
const fs = require('fs')
var wav 	= require('wav');

const { getUserFromMention } = require('../utils/getUserFromMention')
const { convertPcmToWav } = require('../utils/convertPcmToWav')

module.exports = {

  run: async (client, message, args) => {

    const voicechannel = message.member.voice.channel;

    if (!voicechannel) {
      const embed = new Discord.MessageEmbed()
      .setAuthor("Você deve estar conectado a um canal de voz antes de usar este comando!")
      .setColor("#ED4245");
      
      return message.channel.send(embed);
    }

    const fileName = `${client.config.record + message.author.id}.pcm`;
    const fileWav = `${client.config.record + message.author.id}.wav`;


    // Pega a tag do usuário e as menções
    const user = client.users.cache.get(message.author.id);
    const mentions = args.map(mention => getUserFromMention(mention, client)).join();
    const msgWithMentions = `${user} disse para ${mentions}:`
    const msg = `${user} disse:`


    const connection = await message.member.voice.channel.join();
    const receiver = connection.receiver.createStream(message.member, {
      mode: "pcm",
      end: "silence"
    });   

    const writer = receiver.pipe(fs.createWriteStream(fileName));
    writer.on("finish", () => {    
      convertPcmToWav(fileName, fileWav);

      message.channel.send(!!mentions ? msgWithMentions : msg, {
        files: [ fileWav ]
      });
    });

  },

  help: {
    name: "rec",
    description: "grava sua voz para enviar no chat",
    usage: 'rec',
    category: 'gravação'
  }
}