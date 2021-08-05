// O Evento message é emitido toda vez que o bot recebe uma mensagem.

 module.exports = async (client, message) => {
  // ignore todos os bots
  if (message.author.bot) return;

  const bah = message.content.toLowerCase() === 'bah';

  //  ignora qualquer mensagem que não começe com o prefixo escolhido do bot ou não seja bah
  if (message.content.indexOf(client.config.prefix) !== 0 && !bah) return;

  let args = null

  // separa o nome do comando de seus argumentos que são passados ao comando em si.
  if (!bah) {
    args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  } else {
    args = Array.of(message.content.toLowerCase())
  }

  const command = args.shift().toLowerCase();

  // se o comando existir ele irá ser executado.
  const cmd = client.commands.get(command);

  // Se esse comando não existir, não faz nada
  if (!cmd) return;

  console.log('INFO', `${message.author.username} (${message.author.id}) executou o comando: ${cmd.help.name}`)
  cmd.run(client, message, args);
}