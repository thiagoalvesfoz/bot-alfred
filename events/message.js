const { getUserFromMention } = require('../utils/getUserFromMention')

 module.exports = async (client, message) => {
  // ignore todos os bots
  if (message.author.bot) return;

  const mentions = message.content.split(" ").reduce((acc, keyword) => {
    const mention = getUserFromMention(keyword, client);
    if (mention) return [ ...acc, mention];
    else return acc;
  }, []);

  if (mentions.includes(client.user)) {
    switch(message.author.id) {
      
      case client.config.ownerID:
        message.channel.send("Sim Patrão")
        break
      
        case client.config.wife:
        message.channel.send("Sim patroa")
        break
      
        default:
        break
    }
  }

  const msg = message.content.toLowerCase();
  const match = msg.match(/(\bBAH\b)|(\bBÁH\b)|(\bGURIA\b)/ig) || msg.match(/(\bPIA\b)|(\bPIÁ\B)|(\bPIAZADA\b)/ig) || msg.match(/(\bVALHA\b)/ig)

  //  ignora qualquer mensagem que não começe com o prefixo escolhido do bot ou não seja bah
  if (message.content.indexOf(client.config.prefix) !== 0 && !!!match) return;

  let args = null
  // Executa esse comando se o texto contem uma palavra sulista
  if (match) {
    let keyword = null;

    if (match.includes('valha')) {
      args = match;
    } else {
      keyword = match[0].normalize('NFD').replace(/[\u0300-\u036f]/g, "").substring(0, 3);
      
      if (keyword.toLowerCase() === "gur") {
        const runBahCommand = (Math.floor(Math.random() * 2)) === 0;
        args = [ runBahCommand ? 'bah' : 'pia' ];
      }

      else args = [ keyword ]
    }  
  }
  // separa o nome do comando de seus argumentos que são passados ao comando em si.
  else args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);

  const command = args.shift().toLowerCase();

  // se o comando existir ele irá ser executado.
  const cmd = client.commands.get(command);

  // Se esse comando não existir, não faz nada
  if (!cmd) return;

  console.log('INFO', `${message.author.username} (${message.author.id}) executou o comando: ${cmd.help.name}`)
  cmd.run(client, message, args);
}