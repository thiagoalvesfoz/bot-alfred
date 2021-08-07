const fns = require('date-fns')
const Discord = require('discord.js')

/**
 * O evento guildMemberAdd é emitido após um membro entrar (ser adicionado em uma guild).
 */

module.exports = async (client, message) => {
  const { general, register, colors } = client.config.channels;

  if (message.user.bot) return;

  const { username, discriminator } = message.user;
  const { name } = message.guild;

  const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')

    .setAuthor(`${username}#${discriminator} | 👋 Bem-vindo(a)`, message.user.avatarURL())
    .setDescription(`Salve ${message}! Você acabou de entrar no servidor ${name}. 
    Aqui você poderá interagir com a comunidade, jogar, conversar e tudo mais. Aproveite!`)
    .addFields(
        { name: 'Primeiros passos', value: `Para receber um cargo siga as instruções em
        <#${register}>`, inline: true },
        { name: 'Nome colorido', value: `Aproveite também para mudar a cor do seu nick
         <#${colors}>.`, inline: true },
        { name: 'Apresente-se', value: "Conte um pouco mais sobre você pra gente 🗣", inline: true }
    )
    .setTimestamp()
    .setFooter(`${new Date().getFullYear()} - ${name}`, message.guild.iconURL())

  message.guild.channels.cache.get(general).send(embed).catch()
}