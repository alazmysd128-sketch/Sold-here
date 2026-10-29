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

client.once('ready', () => {
    console.log(`🔥 Sold Platform Full Bot is online: ${client.user.tag}`);
    client.user.setPresence({
        activities: [{ name: 'Sold Platform - Full Auto Setup 🚀', type: 3 }],
        status: 'online',
    });
});

// دالة مساعدة لإنشاء القنوات والأقسام
async function buildStructure(guild, structure) {
    for (const catData of structure) {
        const category = await guild.channels.create({
            name: catData.category,
            type: ChannelType.GuildCategory
        }).catch(err => console.error(`Error creating category ${catData.category}:`, err));

        if (category && catData.channels) {
            for (const ch of catData.channels) {
                await guild.channels.create({
                    name: ch.name,
                    type: ch.type === 'voice' ? ChannelType.GuildVoice : ChannelType.GuildText,
                    parent: category.id
                }).catch(err => console.error(`Error creating channel ${ch.name}:`, err));
            }
        }
    }
}

// دالة مساعدة لإنشاء الرتب
async function buildRoles(guild, rolesList) {
    for (const roleName of rolesList) {
        await guild.roles.create({
            name: roleName,
            reason: 'Sold Platform Auto Setup'
        }).catch(err => console.error(`Error creating role ${roleName}:`, err));
    }
}

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    // ==========================================
    // 1. سيرفر فايف أم الشامل (Dolphin City)
    // ==========================================
    if (message.content === '!setup-fivem') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.reply('❌ للادارة فقط!');
        message.reply('⏳ جاري إنشاء جميع رومات ورتب سيرفر فايف أم (Dolphin City) بالكامل بدون نقص...');

        const fivemRoles = [
            "𝐃𝐂 | 𝗔𝗱𝗺𝗶𝗻", "𝐃𝐂 | 𝗠𝗮𝗻𝗮𝗴𝗲𝗿", "𝐃𝐂 | 𝗔𝘀𝘀𝗶𝘀𝘁𝗮𝗻𝘁 𝗠𝗮𝗻𝗮𝗴𝗲𝗿", "𝐃𝐂 | 𝗦𝘂𝗽𝗲𝗿𝘃𝗶𝘀𝗼𝗿", "𝐃𝐂 | 𝗔𝘀𝘀𝗶𝘀𝘁𝗮𝗻𝘁 𝗦𝘂𝗽𝗲𝗿𝘃𝗶𝘀𝗼𝗿",
            "𝐃𝐂 | 𝗠𝗼𝗱𝗲𝗿𝗮𝘁𝗼𝗿", "𝐃𝐂 | 𝗔𝘀𝘀𝗶𝘀𝘁𝗮𝗻𝘁 𝗠𝗼𝗱𝗲𝗿𝗮𝘁𝗼𝗿", "𝐃𝐂 | 𝗦𝘂𝗽𝗽𝗼𝗿𝘁", "𝐃𝐂 | 𝗔𝘀𝘀𝗶𝘀𝘁𝗮𝗻𝘁 𝗦𝘂𝗽𝗽𝗼𝗿𝘁", "𝐃𝐂 | 𝗛𝗲𝗹𝗽𝗲𝗿",
            "|| 𝗦𝘁𝗮𝗳𝗳 𝗧𝗲𝗮𝗺 ||", "𝐃𝐂 | مسؤول الادارة", "𝐃𝐂 | مساعد مسؤول الادارة", "𝐃𝐂 | فريق البرمجة", "𝐃𝐂 | مسؤول الدسكورد",
            "𝐃𝐂 | مسؤول العصابات", "𝐃𝐂 | مسؤول المتجر", "𝗕𝗲𝘁𝗮 𝗧𝗲𝘀𝘁𝗲𝗿", "𝐃𝐂 | 𝗦𝘁𝗮𝗳𝗳 𝗙𝗿𝗶𝗲𝗻𝗱", "𝐃𝐂 | 𝗙𝗿𝗶𝗲𝗻𝗱",
            "𝐃𝐂 | 𝗥𝗲𝘀𝗽𝗲𝗰𝘁", "𝐃𝐂 | 𝗦𝘁𝗿𝗲𝗮𝗺𝗲𝗿", "𝐃𝐂 | 𝗗𝗼𝗻𝗮𝘁𝗲𝗿🧡", "Police Chief", "Deputy Police Chief", "Marines Chief",
            "Deputy Marines Chief", "Police Academy Commander", "𝐃𝐂 | LSPD", "𝐃𝐂 | Marines", "𝗚𝗦𝗚 𝗢𝗚", "𝗕𝗹𝗼𝗼𝗱𝘇 𝗢𝗚",
            "𝗖rip𝘀 𝗢𝗚", "𝗧𝗵𝗲 𝗟𝗼𝘀𝘁 𝗢𝗚", "𝐃𝐂 | 𝗚𝗮𝗻𝗴𝘀𝘁𝗲𝗿", "𝐃𝐂 | Citizen", "⁂", "☆", "|ـــــــــــــــــ{ 𝗛𝗶𝗴𝗵𝗲𝗿 𝗠𝗮𝗻𝗮𝗴𝗲𝗺𝗲𝗻𝘁 }ـــــــــــــــــ|",
            "|| 𝗠𝗮𝗻𝗮𝗴𝗲𝗺𝗲𝗻𝘁 𝗧𝗲𝗮𝗺 ||", "|ـــــــــــــــــ{ 𝗦𝘁𝗮𝗳𝗳 }ـــــــــــــــــ|", "|ـــــــــــــــــ{ 𝗠𝗮𝗻𝗮𝗴𝗲𝗿 }ـــــــــــــــــ|",
            "𝐃𝐂 | مسؤول السبناريوهات", "|ـــــــــــــــــ{ 𝗦𝘁𝗮𝗳𝗳 𝗗𝗲𝗽𝗮𝗿𝘁𝗺𝗲𝗻𝘁𝘀 }ـــــــــــــــــ|", "𝐃𝐂 | مسؤول الدعم الفني",
            "𝐃𝐂 | مسؤول الباند", "𝐃𝐂 | مسؤول المقابلات الادارية", "𝐃𝐂 | مسؤول الرقابة والتفتيش", "𝐃𝐂 | فريق الدعم الفني",
            "𝐃𝐂 | فريق الباند", "𝐃𝐂 | عضو مقابلات ادارية", "𝐃𝐂 | الرقابة والتفتيش", "|ـــــــــــــــــ{ 𝗢𝘁𝗵𝗲𝗿}ـــــــــــــــــ|",
            "EMS Chief", "Deputy EMS Chief", "Head of DOJ", "Deputy Head of DOJ", "S.W.A.T. Commander", "S.W.A.T. Deputy",
            "Head of Internal Affairs", "Deputy Head of I.A", "EMS Academy Commander", "Field Sergeant", "𝐃𝐂 | EMS", "Lawyer", "𝐃𝐂 | LSIC",
            "𝗚𝗦𝗚", "𝗕𝗹𝗼𝗼𝗱𝘇", "𝗖𝗿𝗶𝗽𝘀", "𝗧𝗵𝗲 𝗟𝗼𝘀𝘁", "𝐃𝐂 | 𝐁𝐨𝐭𝐬", "تحذير 1", "تحذير 2", "تحذير 3", "محظور من السيرفر", "عزيز وغالي"
        ];

        const fivemStructure = [
            {
                category: "💬〢الشات_العام",
                channels: [{ name: "عام 1", type: "text" }, { name: "💻〢البرمجة", type: "text" }, { name: "private", type: "text" }, { name: "💻〢الدسكورد", type: "text" }, { name: "💻〢الترجمة", type: "text" }, { name: "💻〢المسؤوليات", type: "text" }, { name: "⛔〢مشاكل_السيرفر", type: "text" }, { name: "🌐〢السيناريوهات﹒المشتركة", type: "text" }]
            },
            {
                category: "〢𝐃𝐨𝐥𝐩𝐡𝐢𝐧 𝐂𝐢𝐭𝐲",
                channels: [{ name: "🛬〢الـمـطـار", type: "text" }, { name: "📝〢الـقوانـيـن", type: "text" }]
            },
            {
                category: "〢𝐃𝐨𝐥𝐩𝐡𝐢𝐧𝐂𝐢𝐭𝐲 𝐒𝐭𝐨𝐫𝐞",
                channels: [{ name: "⛔〢هــام", type: "text" }, { name: "📢〢تـعـمـيـمـات", type: "text" }, { name: "🛠〢الـتـحـديـثـات", type: "text" }, { name: "📺〢شــرح", type: "text" }, { name: "🏘〢الـعـقــار", type: "text" }]
            },
            {
                category: "〢𝐃𝐨𝐥𝐩𝐡𝐢𝐧𝐂𝐢𝐭𝐲 𝐇𝐮𝐛",
                channels: [{ name: "🕐〢حـالـة﹒الـسـيـرفـر", type: "text" }, { name: "💬〢الـشـات﹒الـعـام", type: "text" }, { name: "❓〢الـتـلـمـيـحـات", type: "text" }, { name: "🎉〢الـفـعـالـيـات", type: "text" }, { name: "📷〢الـصـور", type: "text" }, { name: "🎬〢الـلـقـطـات", type: "text" }, { name: "💡〢اقـتـراحـات", type: "text" }, { name: "🤖〢الأوامـر", type: "text" }, { name: "🔮〢𝐁𝐨𝐨𝐬𝐭𝐬", type: "text" }]
            },
            {
                category: "〢الـنـقـل",
                channels: [{ name: "📌〢شروط﹒النقل", type: "text" }, { name: "📌〢نقل﹒القروبات", type: "text" }, { name: "📌〢نقل﹒الادارة", type: "text" }, { name: "📌〢تم﹒النقل", type: "text" }, { name: "📌〢بلاك﹒لست", type: "text" }]
            },
            {
                category: "〢𝐇𝐢𝐠𝐡𝐞𝐫 𝐌𝐚𝐧𝐚𝐠𝐞𝐦𝐞𝐧𝐭",
                channels: [{ name: "🔊〢اجتماع الادارة العليا", type: "voice" }, { name: "🔊〢استراحة الادارة العليا", type: "voice" }, { name: "📃〢شرح﹒الادارة﹒العليا", type: "text" }, { name: "📢〢تعميمات﹒الادارة﹒العليا", type: "text" }, { name: "🔝〢ترقيات﹒الادارة﹒العليا", type: "text" }, { name: "❗〢محاسبات﹒الادارة﹒العليا", type: "text" }, { name: "💬〢شات﹒الادارة﹒العليا", type: "text" }, { name: "📌〢الاجازات﹒الاستقالات", type: "text" }]
            },
            {
                category: "〢𝗦𝘁𝗮𝗳𝗳",
                channels: [{ name: "🔊〢اجتماع الادارة", type: "voice" }, { name: "📃〢شرح﹒الادارة", type: "text" }, { name: "📗〢قوانين﹒الادارة", type: "text" }, { name: "📢〢تعميمات﹒الادارة", type: "text" }, { name: "🔝〢ترقيات﹒الادارة", type: "text" }, { name: "❗〢محاسبات﹒الادارة", type: "text" }, { name: "🌐〢الاقتراحات", type: "text" }, { name: "💬〢شات﹒الادارة", type: "text" }, { name: "💢〢شكاوي﹒الادارة", type: "text" }, { name: "📌〢الاجازات﹒الاستقالات", type: "text" }, { name: "❓〢الاستفسارات", type: "text" }]
            },
            {
                category: "📝〢𝗦𝘁𝗮𝗳𝗳 𝗜𝗻𝘁𝗲𝗿𝘃𝗶𝗲𝘄𝘀",
                channels: [{ name: "🔊〢مقابلة ادارية 1", type: "voice" }, { name: "🔊〢مقابلة ادارية 2", type: "voice" }, { name: "🔊〢مقابلة ادارية 3", type: "voice" }, { name: "🔊〢الانتظار", type: "voice" }, { name: "📝〢التقديم", type: "text" }, { name: "📝〢تعميمات﹒مسؤولين﹒المقابلات", type: "text" }, { name: "📝〢شات﹒مسؤولين﹒المقابلات", type: "text" }, { name: "📝〢سجل﹒المقدمين", type: "text" }]
            },
            {
                category: "〢𝐁𝐚𝐧𝐧𝐞𝐝",
                channels: [{ name: "⛔〢مسؤول الباند", type: "text" }, { name: "⛔〢مسؤول الفحص", type: "text" }, { name: "⛔〢الانتظار", type: "voice" }, { name: "⛔〢هام﹒الباند", type: "text" }, { name: "⛔〢فك﹒باند", type: "text" }, { name: "⛔〢باند﹒نهائي", type: "text" }]
            },
            {
                category: "📛〢𝗦𝘂𝗿𝘃𝗲𝗶𝗹𝗹𝗮𝗻𝗰𝗲 𝗧𝗲𝗮𝗺",
                channels: [{ name: "💎〢مراقبة عامة", type: "text" }, { name: "👮🏻〢مراقبة الشرطة", type: "text" }, { name: "💀〢مراقبة العصابات", type: "text" }, { name: "🔊〢شكاوي﹒استفسارات", type: "voice" }, { name: "🔊〢الانتظار", type: "voice" }, { name: "📛〢تعميمات﹒الرقابة", type: "text" }, { name: "📛〢شات﹒الرقابة", type: "text" }, { name: "📛〢سجل﹒الرقابة", type: "text" }, { name: "📛〢استفسارات﹒الرقابة", type: "text" }, { name: "📛〢شكاوي﹒الرقابة", type: "text" }]
            },
            {
                category: "🎫〢𝗧𝗶𝗰𝗸𝗲𝘁𝘀 𝗧𝗲𝗮𝗺",
                channels: [{ name: "🎫〢تعميمات﹒التكتات", type: "text" }, { name: "🎫〢شات﹒التكتات", type: "text" }, { name: "🎫〢استفسارات﹒التكتات", type: "text" }, { name: "🎫〢سجل﹒التكتات", type: "text" }]
            },
            {
                category: "〢𝗦𝘂𝗽𝗽𝗼𝗿𝘁",
                channels: [{ name: "☕〢استراحة الادارة 1", type: "voice" }, { name: "☕〢استراحة الادارة 2", type: "voice" }, { name: "﹣♢﹣Assist | 1", type: "voice" }, { name: "﹣♢﹣Assist | 2", type: "voice" }, { name: "﹣♢﹣Assist | 3", type: "voice" }, { name: "﹣♢﹣Assist | 4", type: "voice" }, { name: "﹣♢﹣Assist | 5", type: "voice" }, { name: "﹣🕐﹣𝖶𝖺𝗂𝗍𝗂𝗇𝗀", type: "voice" }, { name: "📝〢فـتـح﹒تـذـكرة", type: "text" }, { name: "📝〢دخول﹒خروج", type: "text" }, { name: "📝〢سجل﹒المساعدة", type: "text" }]
            },
            {
                category: "〢𝐏𝐨𝐥𝐢𝐜𝐞 𝐀𝐜𝐚𝐝𝐞𝐦𝐲",
                channels: [{ name: "❓〢الاستفسارات", type: "text" }, { name: "👮〢الاعلانات", type: "text" }, { name: "⭐〢القوانين", type: "text" }, { name: "⭐〢الروابط", type: "text" }]
            },
            {
                category: "〢𝐏𝐨𝐥𝐢𝐜𝐞",
                channels: [{ name: "⭐👮〢مكتب رئيس الشرطة", type: "text" }, { name: "⭐〢مسؤولين الشرطة", type: "text" }, { name: "👮〢اجتماع الشرطة", type: "voice" }, { name: "⌛👮〢انتظار الشرطة", type: "voice" }, { name: "👮〢التعميمات", type: "text" }, { name: "📝〢الشروحات", type: "text" }, { name: "📝〢طلب﹒اجازة", type: "text" }, { name: "🎖〢الترقيات", type: "text" }, { name: "⛔〢التحذيرات", type: "text" }, { name: "📡〢مركز﹒العمليات", type: "text" }, { name: "🧾〢ادلة﹒الشرطة", type: "text" }, { name: "✉〢طلب﹒استقالة", type: "text" }, { name: "👮〢شات﹒المسؤولين", type: "text" }, { name: "👮〢شات﹒الضباط", type: "text" }, { name: "👮〢شات﹒الشرطة", type: "text" }, { name: "❗〢مشاكل﹒الشرطة", type: "text" }, { name: "💡〢الاقتراحات", type: "text" }]
            },
            {
                category: "〢𝐏𝐨𝐥𝐢𝐜𝐞 𝐈𝐧𝐭𝐞𝐫𝐧𝐚𝐥 𝐀𝐟𝐟𝐚𝐢𝐫𝐬",
                channels: [{ name: "👮〢غرفة الشؤون", type: "text" }, { name: "⌛〢انتظار الشؤون", type: "voice" }, { name: "👮〢تعميمات﹒الشؤون", type: "text" }, { name: "⬆〢ترقيات﹒الشؤون", type: "text" }, { name: "💬〢شات﹒المسؤولين", type: "text" }, { name: "🖋〢مخالفات﹒الشؤون", type: "text" }, { name: "⛔〢تحذيرات﹒الشؤون", type: "text" }, { name: "📢〢نداء﹒الشؤون", type: "text" }, { name: "💬〢شات﹒الشؤون", type: "text" }, { name: "📊〢سجلات﹒العساكر", type: "text" }, { name: "📈〢نقاط﹒الشرطة", type: "text" }, { name: "🔒〢سجن", type: "text" }, { name: "🔓〢فك﹒السجن", type: "text" }]
            },
            {
                category: "〢𝐌𝐢𝐧𝐢𝐬𝐭𝐫𝐲 𝐨𝐟 𝐃𝐞𝐟𝐞𝐧𝐬𝐞",
                channels: [{ name: "⭐💂〢مكتب وزير الدفاع", type: "text" }, { name: "⭐〢مسؤولين الدفاع", type: "text" }, { name: "💂〢اجتماع الدفاع", type: "voice" }, { name: "⌛💂〢انتظار الدفاع", type: "voice" }, { name: "💂〢التعميمات", type: "text" }, { name: "📝〢الشروحات", type: "text" }, { name: "📝〢طلب﹒اجازة", type: "text" }, { name: "🎖〢الترقيات", type: "text" }, { name: "⛔〢التحذيرات", type: "text" }, { name: "📡〢مركز﹒العمليات", type: "text" }, { name: "🧾〢ادلة﹒الدفاع", type: "text" }, { name: "✉〢طلب﹒استقالة", type: "text" }, { name: "💂〢شات﹒الدفاع", type: "text" }, { name: "❗〢مشاكل﹒الدفاع", type: "text" }, { name: "💡〢الاقتراحات", type: "text" }]
            },
            {
                category: "💀〢𝗚𝗮𝗻𝗴𝘀",
                channels: [{ name: "💀〡أعـلانـات﹒الـعصـابـات", type: "text" }, { name: "💀〡قـوانـين﹒الـعصـابـات", type: "text" }, { name: "⛔〡تـحـذيـرات﹒الـعصـابـات", type: "text" }, { name: "💬〡شـات﹒الـعصـابـات", type: "text" }, { name: "🟣〡𝗚𝗦𝗚", type: "text" }, { name: "🔴〡𝗕𝗹𝗼𝗼𝗱𝘇", type: "text" }, { name: "🔵〡𝗖𝗿𝗶𝗽𝘀", type: "text" }, { name: "⚫〡𝗧𝗵𝗲﹒𝗟𝗼𝘀𝘁", type: "text" }]
            },
            {
                category: "〢Logs",
                channels: [{ name: "📑﹣𝗥𝗼𝗹𝗲𝘀", type: "text" }, { name: "📑﹣𝗞𝗶𝗰𝗸-𝗯𝗮𝗻", type: "text" }, { name: "📑﹣𝗡𝗶𝗰𝗸𝗻𝗮𝗺𝗲", type: "text" }, { name: "📑﹣𝗠𝗲𝘀𝘀𝗮𝗴𝗲-𝗘-𝗗", type: "text" }, { name: "📑﹣𝗝𝗼𝗶𝗻-𝗟𝗲𝗮𝘃𝗲-server", type: "text" }, { name: "📑﹣𝗥𝗼𝗼𝗺𝘀", type: "text" }, { name: "📑﹣time-out", type: "text" }, { name: "📑﹣change-server-settings", type: "text" }, { name: "لوق-التكتات", type: "text" }, { name: "📑﹣𝗝𝗼𝗶𝗻-𝗟𝗲𝗮𝘃𝗲-room", type: "text" }]
            }
        ];

        await buildRoles(message.guild, fivemRoles);
        await buildStructure(message.guild, fivemStructure);
        message.channel.send('✅ **تم إنشاء قالب سيرفر فايف أم (Dolphin City) الشامل بنجاح 100%!**');
    }

    // ==========================================
    // 2. سيرفر الربع (Brothers 4Ever)
    // ==========================================
    if (message.content === '!setup-brothers') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.reply('❌ للادارة فقط!');
        message.reply('⏳ جاري إنشاء جميع رومات ورتب سيرفر (Brothers 4Ever) بالكامل...');

        const brothersRoles = ["𝗕𝗿𝗼𝘁𝗵𝗲𝗿𝘀 𝟰𝗘𝘃𝗲𝗿.", "𝐅𝐫𝐢𝐞𝐧𝐝", "𝐌𝐞𝐦𝐛𝐞𝐫", "♕", "Bot", "نفر مخضرم", "pr", "BAN"];

        const brothersStructure = [
            {
                category: "〢𝗕𝗿𝗼𝘁𝗵𝗲𝗿𝘀・𝟰𝗘𝘃𝗲𝗿",
                channels: [{ name: "streaming🎥", type: "text" }, { name: "〢كوماندات・البوتات", type: "text" }, { name: "Private 🔒", type: "text" }, { name: "Private-2 🔒", type: "text" }, { name: "🌜🫗فوازير رمضان 🌊🌛", type: "text" }]
            },
            {
                category: "〢𝐌𝐨𝐯𝐢𝐞 📺",
                channels: [{ name: "❗〢القوانين", type: "text" }, { name: "〢𝐑𝐮𝐥𝐞𝐬📝", type: "text" }, { name: "〢𝐀𝐧𝐧𝐨𝐮𝐧𝐜𝐞𝐦𝐞𝐧𝐭𝐬-⚖", type: "text" }, { name: "〢𝐖𝐞𝐥𝐜𝐨𝐦𝐞-✈", type: "text" }]
            },
            {
                category: "⚠ اغراض مهمة و خاصة ⚠",
                channels: [{ name: "اشياء・مهمة🛑", type: "text" }, { name: "صور-📸", type: "text" }, { name: "قوانين-الاداره-📙", type: "text" }, { name: "بوت・🤖", type: "text" }, { name: "المبتغ-الدبي🦍", type: "text" }, { name: "محاكي الحوادث", type: "text" }, { name: "فحص-الملفات", type: "text" }, { name: "🛻سيارات🚘", type: "text" }, { name: "مودات", type: "text" }, { name: "🤓اختصارات🤓", type: "text" }, { name: "🌍مابات🌉", type: "text" }]
            },
            {
                category: "𝗙𝗿𝗶𝗲𝗻𝗱𝘀",
                channels: [{ name: "〢𝗙𝗿𝗶𝗲𝗻𝗱𝘀", type: "text" }, { name: "〢𝗙𝗿𝗶𝗲𝗻𝗱𝘀・𝗖𝗵𝗮𝘁", type: "text" }, { name: "عام", type: "text" }, { name: "〢𝐁𝐨𝐨𝐬𝐭𝐬❤", type: "text" }, { name: "〢𝐂𝐡𝐚𝐭📃", type: "text" }, { name: "〢قصايد-🧾", type: "text" }, { name: "〢𝐂𝐥𝐢𝐩𝐬-🎞", type: "text" }, { name: "〢وَاذْكُرْ﹒رَبَّكَ﹒إِذَا﹒نَسِيتَ", type: "text" }, { name: "〢𝐌𝐞𝐦𝐞𝐬-😂", type: "text" }, { name: "〢تكليجات🤓", type: "text" }, { name: "ترا-معايا-داش-كام💅", type: "text" }, { name: "〢𝐂𝐨𝐦𝐦𝐚𝐧𝗱𝐬🤖", type: "text" }, { name: "〢𝐅𝐫𝐞𝐞・𝐆𝐚𝐦𝐞𝐬", type: "text" }]
            },
            {
                category: "رومات",
                channels: [{ name: "〢𝐏𝐮𝐛𝐥𝐢𝐜¹ 🔊", type: "voice" }, { name: "〢𝐏𝐮𝐛𝐥𝐢𝐜² 🔊", type: "voice" }, { name: "〢𝐏𝐮𝐛𝐥𝐢𝐜³ 🔊", type: "voice" }]
            },
            {
                category: "افلام ومسلسلات",
                channels: [{ name: "🔇〢قــاعـة الـمـسـلـســلات", type: "voice" }, { name: "🔇〢قــاعـة الافــــلام", type: "voice" }, { name: "افلام-مسلسلات", type: "text" }]
            },
            {
                category: "⌨ 𝐀𝐰𝐚𝐲 𝐅𝐫𝐨𝐦 𝐊𝐞𝐲𝐛𝐨𝐚𝐫𝐝",
                channels: [{ name: "〢AFK", type: "voice" }]
            },
            {
                category: "Logs",
                channels: [{ name: "member-banned", type: "text" }, { name: "channel-permissions-updated", type: "text" }, { name: "channel-updated", type: "text" }, { name: "member-left", type: "text" }, { name: "channel-created", type: "text" }, { name: "channel-deleted", type: "text" }, { name: "role-created", type: "text" }, { name: "role-deleted", type: "text" }, { name: "role-given", type: "text" }, { name: "role-removed", type: "text" }, { name: "لوق・الميوت・الدفن・التسحيب", type: "text" }, { name: "ticketing-log", type: "text" }, { name: "افتح-تكت", type: "text" }, { name: "zmn-log", type: "text" }]
            }
        ];

        await buildRoles(message.guild, brothersRoles);
        await buildStructure(message.guild, brothersStructure);
        message.channel.send('✅ **تم إنشاء قالب سيرفر Brothers 4Ever بالكامل بنجاح 100%!**');
    }

    // ==========================================
    // 3. سيرفر الألعاب الشامل (RLF Gaming)
    // ==========================================
    if (message.content === '!setup-rlf') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.reply('❌ للادارة فقط!');
        message.reply('⏳ جاري إنشاء جميع رومات ورتب سيرفر الألعاب (RLF Gaming) بالكامل...');

        const rlfRoles = [
            "RLF", "Moderator", "Senpai", "Kohai", "Supporter", "Advanced Member", "Member", "Streamer", "Friends", "New members",
            "☆ | Bot", "⁂", "Muted", "Ban Manager", " Naraka: Bladepoint", "Osu!", "Palworld", "Streamer's Supporter", "Overwatch",
            "League of Legends", "CSGO", "FiveM", "Genshin Impact", "Tower of Fantasy", "Valorant", "Team Fortress 2", "Left 4 Dead 2",
            "Call of Duty: MW", "Fortnite", "Paladins", "Among Us", "Minecraft", "Quiet"
        ];

        const rlfStructure = [
            {
                category: "✅ | FAQ",
                channels: [{ name: "rules📋", type: "text" }, { name: "welcome✨", type: "text" }, { name: "game-roles🎮", type: "text" }, { name: "contact-us📢", type: "text" }, { name: "👑server-team👑", type: "text" }]
            },
            {
                category: "💡 | information",
                channels: [{ name: "welcoming🛬", type: "text" }, { name: "annoucements", type: "text" }, { name: "server-updates📰", type: "text" }, { name: "giveaways🎉", type: "text" }, { name: "partners💎", type: "text" }, { name: "boosting✨", type: "text" }]
            },
            {
                category: "🌍 | general",
                channels: [{ name: "chat💬", type: "text" }, { name: "videos-pictures📷", type: "text" }, { name: "social🎥", type: "text" }, { name: "memes📷", type: "text" }, { name: "anime📺", type: "text" }, { name: "real-life-events🌍", type: "text" }, { name: "bot-commands🤖", type: "text" }, { name: "games-suggestion🎮", type: "text" }]
            },
            {
                category: "🎧 | Voice",
                channels: [{ name: "👑 | RLF", type: "voice" }, { name: "🔒| خاص", type: "voice" }, { name: "🔒| المكتب", type: "voice" }, { name: "✨| Friends", type: "voice" }, { name: "🌍| العام", type: "voice" }, { name: "🎮| ألعاب", type: "voice" }]
            },
            {
                category: "🎮 | Genshin Impact",
                channels: [{ name: "Party | 1", type: "voice" }, { name: "Party | 2", type: "voice" }, { name: "Open", type: "voice" }, { name: "chat-genshin", type: "text" }, { name: "genshin-impact-events", type: "text" }]
            },
            {
                category: "🎮 | Valorant",
                channels: [{ name: "Party | 1", type: "voice" }, { name: "Party | 2", type: "voice" }, { name: "Open", type: "voice" }, { name: "chat-valorant", type: "text" }]
            },
            {
                category: "🎮 | FiveM Community",
                channels: [{ name: "Server | 1", type: "voice" }, { name: "Server | 2", type: "voice" }, { name: "Open", type: "voice" }, { name: "chat💬", type: "text" }, { name: "videos-pictures📷", type: "text" }]
            },
            {
                category: "🎮 | League of Legends",
                channels: [{ name: "Private | 1", type: "voice" }, { name: "Private | 2", type: "voice" }, { name: "chat💬", type: "text" }, { name: "custom-queue🎮", type: "text" }, { name: "match-history", type: "text" }, { name: "top-10", type: "text" }]
            },
            {
                category: "🎮 | Call of Duty",
                channels: [{ name: "Private | 1", type: "voice" }, { name: "Private | 2", type: "voice" }, { name: "chat💬", type: "text" }, { name: "videos-pictures📷", type: "text" }]
            }
        ];

        await buildRoles(message.guild, rlfRoles);
        await buildStructure(message.guild, rlfStructure);
        message.channel.send('✅ **تم إنشاء قالب سيرفر الألعاب (RLF Gaming) بالكامل بنجاح 100%!**');
    }

    // ==========================================
    // 4. السيرفر الخاص (ZMN / Private)
    // ==========================================
    if (message.content === '!setup-private') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.reply('❌ للادارة فقط!');
        message.reply('⏳ جاري إنشاء جميع رومات ورتب السيرفر الخاص (ZMN) بالكامل...');

        const zmnRoles = ["Admin", "Moderator", "Supporter", "Nitro Booster", "Advanced Member", "Friends", "Member", "ZMN", "⁂"];

        const zmnStructure = [
            {
                category: "💡 | information",
                channels: [{ name: "announcements", type: "text" }, { name: "giveaways🎉", type: "text" }, { name: "server-updates📰", type: "text" }, { name: "boosting✨", type: "text" }, { name: "welcoming🛬", type: "text" }]
            },
            {
                category: "🌍 | general",
                channels: [{ name: "chat💬", type: "text" }, { name: "videos-pictures📷", type: "text" }, { name: "social🎥", type: "text" }, { name: "memes📷", type: "text" }, { name: "anime📺", type: "text" }]
            },
            {
                category: "🎧 | Voice",
                channels: [{ name: "🔒 Private | 1", type: "voice" }, { name: "🔒 Private | 2", type: "voice" }, { name: "🔒 Private | 3", type: "voice" }, { name: "🔒 Private | 4", type: "voice" }, { name: "🔒 Private | 5", type: "voice" }, { name: "🌍 The World 🌍", type: "voice" }, { name: "🤖 ZMN Create voice", type: "voice" }]
            },
            {
                category: "Moderation",
                channels: [{ name: "chat💬", type: "text" }, { name: "moderation-guide", type: "text" }, { name: "discord", type: "text" }]
            },
            {
                category: "ZMN_Logs",
                channels: [{ name: "chat_logs", type: "text" }, { name: "voice_logs", type: "text" }, { name: "server_logs", type: "text" }, { name: "security_logs", type: "text" }]
            }
        ];

        await buildRoles(message.guild, zmnRoles);
        await buildStructure(message.guild, zmnStructure);
        message.channel.send('✅ **تم إنشاء السيرفر الخاص (ZMN) بالكامل بنجاح 100%!**');
    }
});

client.login(TOKEN);
