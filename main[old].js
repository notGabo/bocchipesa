require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
const server_id_env = process.env.SERVER_ID;
const channel_id_env = process.env.CHANNEL_ID;
const discord = require('discord.js');




const client = new discord.Client({ intents: 769 });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


const insultos = [
    'waton',
    'autista',
    'racista culiao',
    'maricon',
    'puto',
    'cagon',
    'cagao',
    'cagón',
]

const mensajes = {
    'League of Legends': 'dejate de jugar lol',
    'VALORANT': 'dejate de jugar valorant',
    'Counter-Strike: Global Offensive': 'dejate de jugar cs',
}

client.on('presenceUpdate', (oldPresence, newPresence) => {

    const randomNum = Math.floor(Math.random() * 100) + 1;
    if (randomNum <= 4) {
      mensajes = {
        'League of Legends': 'Mucha suerte en tu partida de lol ❤',
        'VALORANT': 'Ojala puedas subir de rank en valorant ❤',
        'Counter-Strike: Global Offensive': 'Defusa muchas bombas❤',
      }
    }
    
    maxInsultos = insultos.length
    
    const user = newPresence.member.user;
    const game = newPresence.activities.find(activity => mensajes[activity.name]);
    
    const serverId = server_id_env; 
    const channelId = channel_id_env; 
    const channel = client.channels.cache.get(channelId); 
    
    if (game && newPresence.guild.id === serverId) {                                
      if (game.name === 'League of Legends' && game.state === 'In game' || game.state == "En partida") {               
        channel.send(`<@${user.id}> ${mensajes[game.name]} ${insultos[Math.floor(Math.random() * maxInsultos)]}`);           
        console.log(`@${user.username} ${mensajes[game.name]} ${insultos[Math.floor(Math.random() * maxInsultos)]}`);
      }
      else if (game.name !== 'League of Legends') {   
        channel.send(`<@${user.id}> ${mensajes[game.name]} ${insultos[Math.floor(Math.random() * maxInsultos)]}`);
        console.log(`@${user.username} ${mensajes[game.name]} ${insultos[Math.floor(Math.random() * maxInsultos)]}`);
      }
    } 
    
  });

client.login(token);