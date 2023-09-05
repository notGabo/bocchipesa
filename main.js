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
    'League of Legends En cola': 'dejate de jugar lol',
    'VALORANT': 'dejate de jugar valorant',
    'Counter-Strike: Global Offensive': 'dejate de jugar cs',
}

client.on('presenceUpdate', (oldPresence, newPresence) => {
    const user = newPresence.member.user;
    const game = newPresence.activities.find(activity => mensajes[activity.name]);
    const serverId = server_id_env; 
    const channelId = channel_id_env; 
    if (game && newPresence.guild.id === serverId) {
      const channel = client.channels.cache.get(channelId); 
      maxInsultos = insultos.length
      channel.send(`<@${user.id}> ${mensajes[game.name]} ${insultos[ Math.floor(Math.random() * maxInsultos)]}`);
      console.log(`@${user.username} ${mensajes[game.name]} ${insultos[ Math.floor(Math.random() * maxInsultos)]}`)
    }
});

client.login(token);