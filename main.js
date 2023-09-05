require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
const server_id_env = process.env.SERVER_ID;
const channel_id_env = process.env.CHANNEL_ID;
const discord = require('discord.js');

//const client = new discord.Client({ intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES] });
const client = new discord.Client({ intents: 769});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
    const user = newPresence.member.user;
    const game = newPresence.activities.find(activity => activity.name === 'League of Legends');
    const serverId = server_id_env; // Replace with the ID of the server you want to target
    const channelId = channel_id_env; // Replace with the ID of the channel you want to send the message to
    // get the id of the user


    if (game && newPresence.guild.id === serverId) {
      const channel = client.channels.cache.get(channelId); 
      channel.send(`<@${user.id}> dejate de jugar lol xd`);
      console.log(`@${user.username} dejate de jugar lol xd`)
    }
});

client.login(token);