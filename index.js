const { Client, GatewayIntentBits, ActionRowBuilder, StringSelectMenuBuilder, SlashCommandBuilder, REST, Routes, PermissionFlagsBits, ChannelType } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const TOKEN = 'MTU2NDc1NDY1MTYxMjU4NjAyNQ.GA3bMY.jUAlZaT4HFR2u0OJN0gpykFMk5L3V5icOlL0TM';
const CLIENT_ID = '1564754651612586025';
const GUILD_ID = '1344426577366302791'; // أيدي سيرفرك الحالي

const commands = [
    new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Rebuild and clean the server')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.once('clientReady', async () => {
    console.log(`🔥 Bot is online: ${client.user.tag}`);
    try {
        console.log('⏳ Registering slash commands...');
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands },
        );
        console.log('✅ Successfully registered /setup command!');
    } catch (error) {
        console.error(error);
    }
});

client.on('interactionCreate', async interaction => {
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'setup') {
            const row = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('server_switcher')
                    .setPlaceholder('Choose a server template...')
                    .addOptions([
                        { label: 'General Server', description: 'Clean and build general channels', value: 'general' },
                        { label: 'Gaming Server', description: 'Build gaming and Fortnite rooms', value: 'gaming' }
                    ])
            );

            await interaction.reply({ 
                content: '🎯 **Choose your server template:**\n*(Warning: This will delete existing channels and roles)*', 
                components: [row],
                ephemeral: true 
            });
        }
    }

    if (!interaction.isStringSelectMenu() || interaction.customId !== 'server_switcher') return;

    const selectedServer = interaction.values[0];
    const guild = interaction.guild;

    await interaction.update({ content: `⏳ **Setting up ( ${selectedServer} ) server, please wait...**`, components: [] });

    try {
        const channels = guild.channels.cache.values();
        for (const ch of channels) {
            await ch.delete().catch(() => {});
        }

        const roles = guild.roles.cache.filter(r => !r.managed && r.name !== '@everyone' && r.position < guild.members.me.roles.highest.position);
        for (const role of roles.values()) {
            await role.delete().catch(() => {});
        }

        if (selectedServer === 'general') {
            await guild.roles.create({ name: 'Admin', color: '#ED4245', permissions: [PermissionFlagsBits.Administrator] });
            const cat = await guild.channels.create({ name: '🎯 Main', type: ChannelType.GuildCategory });
            await guild.channels.create({ name: '💬・general', type: ChannelType.GuildText, parent: cat.id });
            await guild.channels.create({ name: '🔊・General', type: ChannelType.GuildVoice, parent: cat.id });
        } else if (selectedServer === 'gaming') {
            await guild.roles.create({ name: 'Leader', color: '#FEE75C', permissions: [PermissionFlagsBits.Administrator] });
            const cat = await guild.channels.create({ name: '🎮 Gaming Rooms', type: ChannelType.GuildCategory });
            await guild.channels.create({ name: '💬・chat', type: ChannelType.GuildText, parent: cat.id });
            await guild.channels.create({ name: '🔊・Fortnite', type: ChannelType.GuildVoice, parent: cat.id });
        }

        await interaction.followUp({ content: `✅ **Server successfully rebuilt!**`, ephemeral: true });

    } catch (error) {
        console.error(error);
        await interaction.followUp({ content: '❌ An error occurred. Make sure the bot role is at the top and has Administrator permission.', ephemeral: true });
    }
});

client.login(TOKEN);
