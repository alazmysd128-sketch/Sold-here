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
    
    client.user.setPresence({
        activities: [{ name: 'خدمة سولد الفاخرة 🚀', type: 3 }],
        status: 'online',
    });
});

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

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    if (message.content.startsWith('!makerom')) {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
            return message.reply('❌ ما عندك صلاحية لإدارة الرومات يا بطل!');
        }

        const args = message.content.split(' ');
        const roomName = args.slice(1).join('-');

        if (!roomName) {
            return message.reply('⚠️ اكتب اسم الروم بعد الأمر، مثلاً: `!makerom سوالف`');
        }

        try {
            const guild = message.guild;
            const newChannel = await guild.channels.create({
                name: roomName,
                type: ChannelType.GuildText,
            });

            message.reply(`✅ تم إنشاء الروم بنجاح: ${newChannel}`);
        } catch (error) {
            console.error(error);
            message.reply('❌ صار خطأ أثناء إنشاء الروم.');
        }
    }

    if (message.content === '!setup') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.reply('❌ هذا الأمر خاص بالمسؤولين (أدمن) فقط!');
        }

        try {
            const guild = message.guild;
            message.reply('⏳ جاري إنشاء رومات وأقسام السيرفر الفاخرة...');

            const category = await guild.channels.create({
                name: '🌟 ┫ منطقة سولد الخاصة',
                type: ChannelType.GuildCategory,
            });

            await guild.channels.create({
                name: '📢-الأنظباط-والقوانين',
                type: ChannelType.GuildText,
                parent: category.id,
            });

            await guild.channels.create({
                name: '🎉-الترحيب',
                type: ChannelType.GuildText,
                parent: category.id,
            });

            await guild.channels.create({
                name: '💬-سوالف-الشباب',
                type: ChannelType.GuildText,
                parent: category.id,
            });

            await guild.channels.create({
                name: '🎧 ┫ سولف صوتي',
                type: ChannelType.GuildVoice,
                parent: category.id,
            });

            message.channel.send('✅ تم تعديل وترتيب السيرفر وإنشاء الرومات بنجاح يا فخم!');
        } catch (error) {
            console.error(error);
            message.reply('❌ حدث خطأ أثناء محاولة تعديل الرومات.');
        }
    }

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
            .setDescription('اضغط على الزر بالأسفل لفتح تذكرة خاصة ودعمك فوراً!');

        await message.channel.send({ embeds: [embed], components: [row] });
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'create_ticket') {
        const guild = interaction.guild;
        const userName = interaction.user.username;

        try {
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
            await interaction.reply({ content: `❌ حدث خطأ أثناء إنشاء التذكرة.`, ephemeral: true });
        }
    }

    if (interaction.customId === 'close_ticket') {
        try {
            // الرد الفوري لمنع خطأ التفاعل المجهول
            await interaction.reply({ content: '🔒 جاري إغلاق التذكرة وحذف الروم...', ephemeral: true });
            
            // حذف الروم مباشرة بعد الرد
            setTimeout(() => {
                interaction.channel.delete().catch(() => {});
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    }
});

client.login(TOKEN);
