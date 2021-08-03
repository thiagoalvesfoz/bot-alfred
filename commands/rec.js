const fs = require('fs')
var wav 	= require('wav');

module.exports = {

  run: async (client, message, args) => {

    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("ô caraio, entra num canal de voz primeiro antes de pedir alguma coisa!")
    
    // Pega a tag do usuário
    const user = client.users.cache.get(message.author.id);
    const fileName = `${client.config.record + message.author.id}.pcm`;
    const fileWav = `${client.config.record + message.author.id}.wav`;

    const connection = await message.member.voice.channel.join();
    const receiver = connection.receiver.createStream(message.member, {
      mode: "pcm",
      end: "silence"
    });   

    const writer = receiver.pipe(fs.createWriteStream(fileName));
    writer.on("finish", () => {    
      convertToWav(fileName, fileWav);

      message.channel.send(`${user} disse:`, {
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

const convertToWav = async (source, destination) => {

    const stream = fs.createReadStream(source);

    var file_out = new wav.FileWriter(destination, {
      "channels": 1,
      "sampleRate": 48000,
      "bitDepth": 32
    })
      .on('error', function(err){
        console.error(err);
      })
      .on('finish', function(){
        console.log('LOG: arquivo gravado com sucesso!')
      });	
    
    stream.pipe(file_out);  
}