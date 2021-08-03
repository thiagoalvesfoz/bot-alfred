const fs = require('fs')

module.exports = {

  run: async (client, message, args) => {

    const fileWav = `${client.config.record + message.author.id}.wav`;

    if (!fs.existsSync(fileWav)) {
      const embed = new Discord.MessageEmbed()
        .setAuthor("Calma la, você precisa gravar um áudio primeiro.")
        .setColor("#ED4245");

      return message.channel.send(embed);
    }
    
    const user = client.users.cache.get(message.author.id);
    
    return message.channel.send(`${user} disse:`, {
      files: [fileWav]
    });

  },

  help: {
    name: "play",
    description: "Envia sua voz no chat",
    usage: 'play',
    category: 'gravação'
  }
}

/**
 *  Em análise
 */

// function converter(source) {
//     try {
//       var process = new ffmpeg(source)
//       process.then(function (audio) {
//       audio.fnExtractSoundToMP3('./audio.mp3', function (error, file) {
//         if (!error) console.log('Audio File: ' + file);
//         else console.error(error)
//         });
//       }, function (err) {
//         console.log('Error: ' + err);      
//       });
//     } catch (e) {
//       console.log(e);
//     }
    
//     // valid converts
//     // ffmpeg -f s16le -ar 48k -ac 2 -i ./recorded-425893864461565953.pcm converted.mp3 
//     // ffmpeg -i ./recorded-425893864461565953.pcm -vn -ar 44100 -ac 2 -ab 192 -f s16le mp3 audio.mp3
// }