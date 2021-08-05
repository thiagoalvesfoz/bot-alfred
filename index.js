require('dotenv').config()
const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");

client.config = config;
client.startTime = Date.now();
client.config.timeoutID = undefined;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  console.log('INFO', `Carregando o total de ${files.length} evento(s).`)
  
  files.forEach(file => {
    // se o arquivo não for um arquivo JS, ignore;
    if (!file.endsWith(".js")) return;
    
    // carrega o arquivo de evento
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log('INFO', `Carregando evento: ${eventName}`);

    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.log(err);
  console.log('\nINFO', `Carregando o total de ${files.length} comando(s).`)

  files.forEach(file => {
    if(!file.endsWith("js")) return;

    let props = require(`./commands/${file}`);
    console.log('INFO', `Carregando comando: ${props.help.name}`)

    if (props.init) props.init(client)
    client.commands.set(props.help.name, props);
  })
})

client.on("ERROR", (e) => console.error(e));
client.on("WARNING", (e) => console.warn(e));
client.login(process.env.TOKEN);