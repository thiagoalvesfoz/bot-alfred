const fs = require('fs')
var wav = require('wav');

exports.convertPcmToWav = (source, destination) => {
  console.log('INFO', 'Convertendo PCM para WAV');
  const stream = fs.createReadStream(source);

  var file_out = new wav.FileWriter(destination, {
    "channels": 2,
    "sampleRate": 48000,
    "bitDepth": 16
  })
  
  stream.pipe(file_out).on('end', () => {
    file_out.end()
    console.log('INFO', 'Conversão realizada com sucesso!')
  });
}
