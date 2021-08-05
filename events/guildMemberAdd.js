const fns = require('date-fns')
const Discord = require('discord.js')

/**
 * O evento guildMemberAdd é emitido após um membro entrar (ser adicionado em uma guild).
 */

module.exports = async (client, message) => {
  const { general, register, colors } = client.config.channels;

  if (message.user.bot) return;

  const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`👋 Bem-vindo(a)`)
    .setDescription(`Olá ${message}, fique a vontade para se registrar em <#${register}> e aproveite para mudar a cor do seu nick por aqui <#${colors}>.`)
    .setFooter('2021 - Ousadia e Alegria')
    .setTimestamp()

  message.guild.channels.cache.get(general).send(embed).catch()
}