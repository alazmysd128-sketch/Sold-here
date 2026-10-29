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
    console.log(`🔥 Bot is online: ${client.user.tag}`);
    
    // ضبط حالة البوت (Activity)
    client.user.setPresence({
        activities: [{ name: 'خدمة سولد الفاخرة 🚀', type: 3 }], // 3 تعني Watching
        status: 'online',
    });
});

// 1. نظام الترحيب بالاعضاء الجدد وعمل روم خاص
client.on('guildMemberAdd', async member => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome' || channel.name === 'الترحيب');
    if (!welcomeChannel) return;

    const embed = new EmbedBuilder()
        .setColor('#00FFCC')
        .setTitle('🎉 حياك الله يا بطل في السيرفر!')
        .setDescription(`نورتنا يا ${member}، نتمنى لك أوقات ممتعة معنا في السيرفر!`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp();

    welcomeChannel.send({ embeds: [embed] });
});

// 2. أوامر تفاعلية (Commands)
client.on('messageCreate', async message => {
    if (message.author.bot) return;

    // أمر إنشاء روم رسمي (مثال: !makerom اسم-الروم)
    if (message.content.startsWith('!makerom')) {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
            return message.reply('❌ ما عندك صلاحية لإدارة الرومات يا بطل!');
        }

        const args = message.content.split(' ');
        const roomName = args.slice(1).join('-');

        if (!roomName) {
            return message.reply('⚠️ اكتب اسم الروم بعد الأمر، مثلاً: `!makerom لوجي`');
        }

        try {
            const guild = message.guild;
            const newChannel = await guild.channels.create({
                name: roomName,
                type: ChannelType.GuildText,
            });

            message.channel.endswith?.() || message.reply(`✅ تم إنشاء الروم بنجاح: ${newChannel}`);
        } catch (error) {
            console.error(error);
            message.reply('❌ صار خطأ أثناء إنشاء الروم.');
        }
    }

    // أمر لوحة التذاكر (Ticket System) الفاخرة بالأزرار
    if (message.content === '!ticket') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.reply('❌ هذا الأمر خاص بالمسؤولين فقط!');
        }

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('create_ticket')
                    .setLabel('🎫 فتح تذاكر جديدة')
                    .setStyle(ButtonStyle.Success),
            );

        const embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('🎫 نظام الدعم الفني والتذاكر')
            .setDescription('اضغط على الزر بالأسفل لفتح تكرة خاصة ودعمك فوراً!');

        await message.channel.send({ embeds: [embed], components: [row] });
    }
});

// التفاعل مع زر التذاكر
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'create_ticket') {
        const guild = interaction.guild;
        const userName = interaction.user.username;

        try {
            // إنشاء روم خاص للتذكرة
            const ticketChannel = await guild.channels.create({
                name: `ticket-${userName}`,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: guild.id,
                        deny: [PermissionFlagsBits.ViewChannel],
                    },
                    {
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                    },
                ],
            });

            await interaction.reply({ content: `✅ تم فتح تذكرتك بنجاح: ${ticketChannel}`, ephemeral: true });
            
            const closeRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('close_ticket')
                        .setLabel('🔒 إغلاق التذكرة')
                        .setStyle(ButtonStyle.Danger),
                );

            ticketChannel.send({ content: `أهلاً بك ${interaction.user}، الإدارة راح ترد عليك قريب.`, components: [closeRow] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ حدث خطأ أثناء إنشاء التذكرة.', ephemeral: true });
        }
    }

    if (interaction.customId === 'close_ticket') {
        const channel = interaction.channel;
        await interaction.reply('🔒 جاري إغلاق التذكرة وحذف الروم...');
        setTimeout(() => {
            channel.delete().catch(() => {});
        }, 3000);
    }
});

client.login(TOKEN);const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes, PermissionFlagsBits } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const TOKEN = process.env.TOKEN;

client.once('ready', async () => {
    console.log(`🔥 Bot is online: ${client.user.tag}`);
});

client.login(TOKEN);
