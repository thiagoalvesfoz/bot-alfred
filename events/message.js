// O Evento message é emitido toda vez que o bot recebe uma mensagem.

 module.exports = async (client, message) => {
  // ignore todos os bots
  if (message.author.bot) return;

  //  ignora qualquer mensagem que não começe com o prefixo escolhido do bot.
  if (message.content.indexOf(client.config.prefix) !== 0) return;

  // separa o nome do comando de seus argumentos que são passados ao comando em si.
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // se o comando existir ele irá ser executado.
  const cmd = client.commands.get(command);

  // Se esse comando não existir, não faz nada
  if (!cmd) return;

  console.log('LOG', `${message.author.username} (${message.author.id}) executou o comando: ${cmd.help.name}`)
  cmd.run(client, message, args);
}