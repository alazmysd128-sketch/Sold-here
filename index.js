const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes, PermissionFlagsBits } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const TOKEN = 'MTU2NDc1NDY1MTYxMjU4NjAyNQ.GA3bMY.jUAlZaT4HFR2u0OJN0gpykFMk5L3V5icOlL0TM';

client.once('ready', async () => {
    console.log(`🔥 Bot is online: ${client.user.tag}`);
});

client.login(TOKEN);
