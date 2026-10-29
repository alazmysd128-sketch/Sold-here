const { Client, GatewayIntentBits, ActionRowBuilder, StringSelectMenuBuilder, SlashCommandBuilder, REST, Routes, PermissionFlagsBits, ChannelType } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const TOKEN = 'MTU2NDc1NDY1MTYxMjU4NjAyNQ.GA3bMY.jUAlZaT4HFR2u0OJN0gpykFMk5L3V5icOlL0TM';
const CLIENT_ID = '1564754651612586025';

const commands = [
    new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Rebuild and clean the server')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.once('ready', async () => {
    console.log(`🔥 Bot is online: ${client.user.tag}`);
});

client.login(TOKEN);
