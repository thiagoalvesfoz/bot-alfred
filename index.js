require('dotenv').config()
const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");

client.config = config;
client.startTime = Date.now();

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  console.log('LOG', `Carregando o total de ${files.length} evento(s).`)
  
  files.forEach(file => {
    // se o arquivo não for um arquivo JS, ignore;
    if (!file.endsWith(".js")) return;
    
    // carrega o arquivo de evento
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log('LOG', `Carregando evento: ${eventName}`);

    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.log(err);
  
  files.forEach(file => {
    if(!file.endsWith("js")) return;

    let props = require(`./commands/${file}`);
    console.log('LOG', `Carregando comando: ${props.help.name}`)

    if (props.init) props.init(client)
    client.commands.set(props.help.name, props);
  })
})


client.login(process.env.TOKEN);