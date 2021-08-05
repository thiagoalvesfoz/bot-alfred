
 module.exports = (client) => {
  console.log(`\nEu estou online agora, meu nome é ${client.user.username}. Há ${client.users.cache.size} usuario(s) em ${client.guilds.cache.size} servidor(es)! \n`)
  
  client.user.setActivity(
    client.config.prefix + 
    client.config.game
  );
}