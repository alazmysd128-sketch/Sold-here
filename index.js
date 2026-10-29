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
        activities: [{ name: 'إدارة سيرفرات لولو 🚀', type: 3 }],
        status: 'online',
    });
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    // 1. أمر عرض قائمة كافة السيرفرات التي يملك فيها البوت صلاحية: !servers
    if (message.content === '!servers') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.reply('❌ هذا الأمر خاص بالمسؤولين فقط!');
        }

        const guilds = client.guilds.cache.map(g => `• **${g.name}** (ID: \`${g.id}\`) - الأعضاء: ${g.memberCount}`);
        
        const embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('🌐 قائمة السيرفرات المتصلة بالبوت')
            .setDescription(guilds.join('\n') || 'لا يوجد سيرفرات حالياً.')
            .setFooter({ text: `إجمالي السيرفرات: ${client.guilds.cache.size}` });

        return message.reply({ embeds: [embed] });
    }

    // 2. أمر إنشاء رومات مخصصة لسيرفر فايف ام (FiveM): !setup-fivem
    if (message.content === '!setup-fivem') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.reply('❌ هذا الأمر خاص بالمسؤولين فقط!');
        }

        try {
            const guild = message.guild;
            message.reply('⏳ جاري تجهيز سيرفر FiveM الخرافي...');

            const category = await guild.channels.create({
                name: '🚗 ┫ منطقة FIVEM',
                type: ChannelType.GuildCategory,
            });

            await guild.channels.create({ name: '📜-قوانين-المدينة', type: ChannelType.GuildText, parent: category.id });
            await guild.channels.create({ name: '📢-أخبار-المدينة', type: ChannelType.GuildText, parent: category.id });
            await guild.channels.create({ name: '📝-تقديم-الكلان', type: ChannelType.GuildText, parent: category.id });
            await guild.channels.create({ name: '🔊 ┫ روم الانتظار', type: ChannelType.GuildVoice, parent: category.id });

            message.channel.send('✅ تم إعداد رومات FiveM بنجاح!');
        } catch (error) {
            console.error(error);
            message.reply('❌ حدث خطأ أثناء تجهيز الرومات.');
        }
    }

    // 3. أمر إنشاء رومات مخصصة لسيرفر عام: !setup-general
    if (message.content === '!setup-general') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.reply('❌ هذا الأمر خاص بالمسؤولين فقط!');
        }

        try {
            const guild = message.guild;
            message.reply('⏳ جاري تجهيز السيرفر العام...');

            const category = await guild.channels.create({
                name: '💬 ┫ المجتمع العام',
                type: ChannelType.GuildCategory,
            });

            await guild.channels.create({ name: '🎉-الترحيب', type: ChannelType.GuildText, parent: category.id });
            await guild.channels.create({ name: '💬-سوالف', type: ChannelType.GuildText, parent: category.id });
            await guild.channels.create({ name: '📸-صور-وميمز', type: ChannelType.GuildText, parent: category.id });
            await guild.channels.create({ name: '🎧 ┫ ديوانية', type: ChannelType.GuildVoice, parent: category.id });

            message.channel.send('✅ تم إعداد السيرفر العام بنجاح!');
        } catch (error) {
            console.error(error);
            message.reply('❌ حدث خطأ أثناء تجهيز الرومات.');
        }
    }
});

client.login(TOKEN);
