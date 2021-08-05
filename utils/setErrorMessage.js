const Discord = require('discord.js')

exports.sendErrorMessage = (message, { title, color = '#ED4245'}) => {   
  const embed = new Discord.MessageEmbed()
    .setAuthor(title)
    .setColor(color);

  message.channel.send(embed);
};
