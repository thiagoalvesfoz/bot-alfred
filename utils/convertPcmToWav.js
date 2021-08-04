const fs = require('fs')
var wav 	= require('wav');

exports.convertPcmToWav = (source, destination) => {
  console.log('LOG: convertendo audio...')
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
