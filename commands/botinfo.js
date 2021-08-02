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
      .addField('**Meu nick**', userName)
      .addField('**Meu ID**', client.user.id)
      .addField('**Servidores**', `🛡 ${servsize}`, true)
      .addField('**Usuários**', `${usersize}`, inline)
      .addField('**Estou online a**', format(client.startTime))
      .addField('**Criado em**', fns.format(date, "dd/MM/yyyy', às 'HH:mm:ss" ))
      .setFooter(`2021 © ${client.user.username}.`)
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
