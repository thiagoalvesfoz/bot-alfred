module.exports = {

  run: async (client, message, args) => {
    
    const embed = {
      color: 0xB1103C,
      title: "Minha lista de comandos",
      description: '[Clique aqui para ir até o repositório onde eu estou =)](https://github.com/thiagoalvesfoz/bot-alfred)',
      timestamp: new Date(),
      footer: {
        text: '2021 ® Alfred - Só Ousadia e Alegria'
      },
      fields: []
    }

    let commands = client.commands

    commands.forEach(command => {
      if (command.alias) return
      embed.fields.push({
        name: `**${client.config.prefix}${command.help.name}**`,
        value: `*Descrição*: ${command.help.description}
        *Categoria*: ${command.help.category}\n`
      })
    })

    message.author.send({
      embed: embed
    })
      .then(() => message.react('⚡')) // reagir
      .catch(() => message.reply('eu não tenho permissões para enviar DM para você 😥'))

  },

  help: {
    name: 'help',
    category: 'Ajuda',
    description: 'Mostra todos os comandos disponíveis do bot.',
    usage: 'help'
  }
}