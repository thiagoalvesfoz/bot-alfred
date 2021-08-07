const fns = require('date-fns')
const ll = require('date-fns/locale')

const Discord = require('discord.js')


const format = (date) => fns.formatDistance(date, new Date(), { addSuffix: true, locale: ll.ptBR })

module.exports = {

  run: async (client, message, args) => {
    const inline = true
    const botAvatar = client.user.displayAvatarURL
    const date = client.user.createdAt
    const userName = client.user.username
    const servsize = client.guilds.cache.size
    const usersize = client.users.cache.size
    const status = {
      online: '`🟢` Online',
      offline: '`⚫` Offline'
    }

    const embed = new Discord.MessageEmbed()
      .setColor(client.displayHexColor === '#000000' ? '#ffffff' : client.displayHexColor)
      .setThumbnail(botAvatar)
      .setAuthor('🤖 Minhas informações')
      .setDescription('[Clique aqui para ir até o repositório onde eu estou =)](https://github.com/thiagoalvesfoz/bot-alfred)')
      .addField('**Meu nick**', userName, inline)
      .addField('**Meu ID**', client.user.id, inline)
      .addField('**Usuários**', `${usersize}`, inline)
      .addField('**Servidores**', `🛡 ${servsize}`, inline)
      .addField('**Criado em**', fns.format(date, "dd/MM/yyyy', às 'HH:mm:ss" ), inline)
      .setFooter(`${new Date().getFullYear()} - ${client.user.username}.`)
      .setTimestamp()

    if (client.user.presence.status) {
      embed.addField(
        '**Status**',
        `${status[client.user.presence.status]}`,
        inline,
        true
      )
    }

    message.channel.send(embed)
  },

  help: {
    name: 'botinfo',
    category: 'Info',
    description: 'Mostra informações do bot.',
    usage: 'botinfo'
  }
}
