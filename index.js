const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

const TOKEN = process.env.TOKEN;

client.once('ready', async () => {
    console.log(`🔥 Sold Platform Complete Bot is online: ${client.user.tag}`);
    client.user.setPresence({
        activities: [{ name: 'إدارة منصة Sold الفاخرة 🚀', type: 3 }],
        status: 'online',
    });
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    // 1. سيرفر فايف أم الشامل (Sold Platform / Dolphin City)
    if (message.content === '!setup-fivem') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.reply('❌ هذا الأمر خاص بالمسؤولين فقط!');
        
        try {
            const guild = message.guild;
            message.reply('⏳ جاري إنشاء سيرفر فايف أم الشامل (Dolphin City) بالكامل...');

            // إنشاء الرتب الأساسية والعسكرية والمافيا
            const roles = [
                { name: '𝐃𝐂 | 𝗔𝗱𝗺𝗶𝗻', color: '#FF0000' },
                { name: '𝐃𝐂 | 𝗠𝗮𝗻𝗮𝗴𝗲𝗿', color: '#FF4500' },
                { name: '𝐃𝐂 | 𝗦𝘂𝗽𝗲𝗿𝘃𝗶𝘀𝗼𝗿', color: '#1E90FF' },
                { name: '𝐃𝐂 | 𝗠𝗼𝗱𝗲𝗿𝗮𝘁𝗼𝗿', color: '#00F0BB' },
                { name: '|| 𝗦𝘁𝗮𝗳𝗳 𝗧𝗲𝗮𝗺 ||', color: '#808080' },
                { name: 'Police Chief', color: '#0000FF' },
                { name: 'Marines Chief', color: '#2E8B57' },
                { name: '𝗚𝗦𝗚 𝗢𝗚', color: '#8A2BE2' },
                { name: '𝗕𝗹𝗼𝗼𝗱𝘇 𝗢𝗚', color: '#DC143C' },
                { name: '𝗖𝗿𝗶𝗽𝘀 𝗢𝗚', color: '#00BFFF' },
                { name: '𝗧𝗵𝗲 𝗟𝗼𝘀𝘁 𝗢𝗚', color: '#A9A9A9' },
                { name: '𝐃𝐂 | 𝗚𝗮𝗻𝗴𝘀𝘁𝗲𝗿', color: '#4B0082' },
                { name: '𝐃𝐂 | Citizen', color: '#2ECC71' }
            ];

            for (const r of roles) {
                await guild.roles.create({ name: r.name, color: r.color }).catch(() => {});
            }

            // الأقسام والرومات
            const cat1 = await guild.channels.create({ name: '🤍 ｜ Dolphin City Main', type: ChannelType.GuildCategory });
            await guild.channels.create({ name: '🛬-المطار', type: ChannelType.GuildText, parent: cat1.id });
            await guild.channels.create({ name: '📝-القوانين', type: ChannelType.GuildText, parent: cat1.id });
            await guild.channels.create({ name: '💬-الشات-العام', type: ChannelType.GuildText, parent: cat1.id });

            const cat2 = await guild.channels.create({ name: '👮 ｜ Police LSPD', type: ChannelType.GuildCategory });
            await guild.channels.create({ name: '⭐👮-مكتب-رئيس-الشرطة', type: ChannelType.GuildText, parent: cat2.id });
            await guild.channels.create({ name: '👮-اجتماع-الشرطة', type: ChannelType.GuildVoice, parent: cat2.id });
            await guild.channels.create({ name: '👮-شات-الشرطة', type: ChannelType.GuildText, parent: cat2.id });

            const cat3 = await guild.channels.create({ name: '💀 ｜ Gangs', type: ChannelType.GuildCategory });
            await guild.channels.create({ name: '💀-اعلانات-العصابات', type: ChannelType.GuildText, parent: cat3.id });
            await guild.channels.create({ name: '💬-شات-العصابات', type: ChannelType.GuildText, parent: cat3.id });

            message.channel.send('✅ **تم إنشاء سيرفر فايف أم (Dolphin City) بكل تفاصيله بنجاح!**');
        } catch (err) {
            console.error(err);
        }
    }

    // 2. سيرفر الربع (Brothers 4Ever)
    if (message.content === '!setup-brothers') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.reply('❌ هذا الأمر خاص بالمسؤولين فقط!');

        try {
            const guild = message.guild;
            message.reply('⏳ جاري إنشاء سيرفر (Brothers 4Ever)...');

            await guild.roles.create({ name: '𝗕𝗿𝗼𝘁𝗵𝗲𝗿𝘀 𝟰𝗘𝘃𝗲𝗿.', color: '#FFD700' });
            await guild.roles.create({ name: '𝐅𝐫𝐢𝐞𝐧𝐝', color: '#1E90FF' });
            await guild.roles.create({ name: '𝐌𝐞𝐦𝐛𝐞𝐫', color: '#2ECC71' });

            const cat1 = await guild.channels.create({ name: '〢 𝗕𝗿𝗼𝘁𝗵𝗲𝗿𝘀・𝟰𝗘𝘃𝗲𝗿', type: ChannelType.GuildCategory });
            await guild.channels.create({ name: '❗-القوانين', type: ChannelType.GuildText, parent: cat1.id });
            await guild.channels.create({ name: '💬-Chat', type: ChannelType.GuildText, parent: cat1.id });
            await guild.channels.create({ name: '🌜فوازير-رمضان🌛', type: ChannelType.GuildText, parent: cat1.id });

            const cat2 = await guild.channels.create({ name: '📺 ｜ الأفلام والمسلسلات', type: ChannelType.GuildCategory });
            await guild.channels.create({ name: '🔇-قاعة-المسلسلات', type: ChannelType.GuildVoice, parent: cat2.id });
            await guild.channels.create({ name: '🔇-قاعة-الأفلام', type: ChannelType.GuildVoice, parent: cat2.id });

            message.channel.send('✅ **تم إنشاء سيرفر Brothers 4Ever بنجاح!**');
        } catch (err) {
            console.error(err);
        }
    }

    // 3. سيرفر الألعاب (RLF Gaming)
    if (message.content === '!setup-rlf') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.reply('❌ هذا الأمر خاص بالمسؤولين فقط!');

        try {
            const guild = message.guild;
            message.reply('⏳ جاري إنشاء سيرفر الألعاب (RLF Gaming)...');

            const gameRoles = ['Valorant', 'Genshin Impact', 'FiveM', 'League of Legends', 'Call of Duty', 'Palworld', 'Fortnite'];
            for (const g of gameRoles) {
                await guild.roles.create({ name: g, color: '#00F0BB' }).catch(() => {});
            }

            const cat1 = await guild.channels.create({ name: '🌍 ｜ General', type: ChannelType.GuildCategory });
            await guild.channels.create({ name: 'chat💬', type: ChannelType.GuildText, parent: cat1.id });
            await guild.channels.create({ name: 'memes📷', type: ChannelType.GuildText, parent: cat1.id });

            const cat2 = await guild.channels.create({ name: '🎮 ｜ Valorant', type: ChannelType.GuildCategory });
            await guild.channels.create({ name: 'chat-valorant', type: ChannelType.GuildText, parent: cat2.id });
            await guild.channels.create({ name: 'Party | 1', type: ChannelType.GuildVoice, parent: cat2.id });

            message.channel.send('✅ **تم إنشاء سيرفر RLF Gaming بنجاح!**');
        } catch (err) {
            console.error(err);
        }
    }

    // 4. السيرفر الخاص (ZMN / Private)
    if (message.content === '!setup-private') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.reply('❌ هذا الأمر خاص بالمسؤولين فقط!');

        try {
            const guild = message.guild;
            message.reply('⏳ جاري إنشاء السيرفر الخاص (ZMN Private)...');

            await guild.roles.create({ name: 'Admin', color: '#FF0000' });
            await guild.roles.create({ name: 'Moderator', color: '#1E90FF' });
            await guild.roles.create({ name: 'Nitro Booster', color: '#F47FFF' });
            await guild.roles.create({ name: 'ZMN', color: '#00F0BB' });

            const cat1 = await guild.channels.create({ name: '💡 ｜ information', type: ChannelType.GuildCategory });
            await guild.channels.create({ name: 'announcements', type: ChannelType.GuildText, parent: cat1.id });
            await guild.channels.create({ name: 'welcoming🛬', type: ChannelType.GuildText, parent: cat1.id });

            const cat2 = await guild.channels.create({ name: '🎧 ｜ Voice', type: ChannelType.GuildCategory });
            await guild.channels.create({ name: '🔒 Private | 1', type: ChannelType.GuildVoice, parent: cat2.id });
            await guild.channels.create({ name: '🤖 ZMN Create voice', type: ChannelType.GuildVoice, parent: cat2.id });

            message.channel.send('✅ **تم إنشاء السيرفر الخاص ZMN بنجاح!**');
        } catch (err) {
            console.error(err);
        }
    }

    // أمر التذاكر الفاخر
    if (message.content === '!ticket') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.reply('❌ هذا الأمر خاص بالمسؤولين فقط!');

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('create_ticket').setLabel('🎫 فتح تذكرة دعم').setStyle(ButtonStyle.Success)
        );

        const embed = new EmbedBuilder()
            .setColor('#00f0bb')
            .setTitle('🎫 Sold Platform - مركز التذاكر والدعم الفني')
            .setDescription('اضغط على الزر أدناه للتواصل مع الإدارة.');

        await message.channel.send({ embeds: [embed], components: [row] });
    }
});

// التعامل مع أزرار التذاكر
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'create_ticket') {
        const guild = interaction.guild;
        try {
            const ticketChannel = await guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
                    { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] }
                ],
            });

            await interaction.reply({ content: `✅ تم إنشاء تذكرتك: ${ticketChannel}`, ephemeral: true });

            const closeRow = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('close_ticket').setLabel('🔒 إغلاق التذكرة').setStyle(ButtonStyle.Danger)
            );

            ticketChannel.send({ content: `أهلاً بك ${interaction.user}، سيتواصل معك فريق الإدارة قريباً.`, components: [closeRow] });
        } catch (err) {
            console.error(err);
        }
    }

    if (interaction.customId === 'close_ticket') {
        try {
            await interaction.reply({ content: '🔒 جاري حذف التذكرة...', ephemeral: true });
            setTimeout(() => interaction.channel.delete().catch(() => {}), 1000);
        } catch (error) {
            console.error(error);
        }
    }
});

client.login(TOKEN);
