// Require Discord.JS
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');   
const { token } = require('./token.json');


// On Ready
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}!`);
})


client.login(token);