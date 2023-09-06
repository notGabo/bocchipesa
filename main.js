require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
const server_id_env = process.env.SERVER_ID;
const channel_id_env = process.env.CHANNEL_ID;
const discord = require('discord.js');

const fs = require('fs');

function loadData() {
  try {
    const data = fs.readFileSync('users.json');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return {};
  }
}

function saveData(data) {
    try {
      fs.writeFileSync('data.json', JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
}

const client = new discord.Client({ intents: 769 });
client.on('ready', () => {
    console.log(`Logueado como ${client.user.tag}!`);
});

const insultos = [
    'waton',
    'autista',
    'racista culiao',
    'maricon',
    'puto',
    'cagon',
    'cagao',
    'manco',
    'manco culiao',
    'guaton',
    'guaton culiao',
    'gordo',
    'gordo culiao',
    'gordo ql',
    'gordo qliao',
    'si igual eri malo',
    'si igual eri malo culiao',
    'si igual eri malo wn',
    'si igual eri malo weon',
    'si igual eri malo maricon',
    'si igual eri malo ctm',
    'si igual eri malo waton',
    'si eri malo',
    'si te tengo de hijo',
    'si te tengo de hijo culiao',
    'si te tengo de hijo xd',
    'si te tengo de hijo weon',
    'si te tengo de hijo wn',

]

const juegos = {
    'League of Legends': 'dejate de jugar lol',
    'VALORANT': 'dejate de jugar valorant',
    'Counter-Strike: Global Offensive': 'dejate de jugar cs',
    'osu!': 'dejate de jugar osu',
    'Minecraft': 'dejate de jugar minecraft',
    'Rocket League': 'dejate de jugar rocket league',
    'Rust': 'dejate de jugar rust',
    'Apex Legends': 'dejate de jugar apex',
    'Call of Duty: Warzone': 'dejate de jugar warzone',
    'Dead by Daylight': 'dejate de jugar dead by daylight',
    'Fortnite': 'dejate de jugar fortnite',
    'Phasmophobia': 'dejate de jugar phasmophobia',
    'Teamfight Tactics': 'dejate de jugar tft',

}
const maxInsultos = insultos.length

let cooldowns = {};
const now = Date.now();

client.on('presenceUpdate', (oldPresence, newPresence) => {
    const user = newPresence.member.user;
    const game = newPresence.activities.find(activity => juegos[activity.name]);
    const channel = client.channels.cache.get(channel_id_env);
    if (game && newPresence.guild.id === server_id_env) {
        if (cooldowns[user]){
            const timeElapsed = now - cooldowns[user];
            if (timeElapsed < 10800000) { // dos horas de cooldown para que mande un mensaje a un mismo user
                console.log(`Periodo para enviar el proximo aviso a ${user.username} no ha terminado ( ${(timeElapsed/3600000).toFixed(2)} de 3 horas  )`);
                return;
            }
        }
        cooldowns[user] = now;
        console.log(`@${user.username} ${juegos[game.name]} ${insultos[Math.floor(Math.random() * maxInsultos)]}`);
        channel.send(`<@${user.id}> ${juegos[game.name]} ${insultos[Math.floor(Math.random() * maxInsultos)]}`);

    }
});

client.login(token);