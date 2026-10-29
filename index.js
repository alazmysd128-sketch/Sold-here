const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes, PermissionFlagsBits } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const TOKEN = 'MTU2NDc1NDY1MTYxMjU4NjAyNQ.GVvPCs.nLieH4JyzgPQ1.Er2STx6A4aQ8Gh4P-5Zml7Po';

client.once('ready', async () => {
    console.log(`🔥 Bot is online: ${client.user.tag}`);
});

client.login(TOKEN);
