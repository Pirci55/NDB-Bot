const config = require('./config.json'); // Подключаем файл с параметрами и информацией
const Discord = require('discord.js'); // Подключаем библиотеку discord.js
const fs = require('fs'); // Подключаем родной модуль файловой системы node.js 
const rimraf = require('rimraf');
const prefix = config.prefix; // «Вытаскиваем» префикс
let standartmoneyfactor = 1;
let standartdmgfactor = 1;
let standartdefensefactor = 1;

// Стандартные предметы

var itemslist = [
    {
        number: 1,
        name: `Стальной шлем`,
        type: `helmet`,
        price: 80,
        defense: 2,
        dmg: 0.5,
        moneyfactor: 0.5,
    },
    {
        number: 2,
        name: `Стальной нагрудник`,
        type: `chestplate`,
        price: 150,
        defense: 2,
        dmg: 0.5,
        moneyfactor: 0.5,
    },
    {
        number: 3,
        name: `Стальные поножи`,
        type: `leggings`,
        price: 120,
        defense: 2,
        dmg: 0.5,
        moneyfactor: 0.5,
    },
    {
        number: 4,
        name: `Стальные ботинки`,
        type: `boots`,
        price: 60,
        defense: 2,
        dmg: 0.5,
        moneyfactor: 0.5,
    },
    {
        number: 5,
        name: `Стальной меч`,
        type: `weapon`,
        price: 70,
        defense: 0.5,
        dmg: 4,
        moneyfactor: 2,
    },
    {
        number: 6,
        name: `Лук`,
        type: `weapon`,
        price: 50,
        defense: 0.5,
        dmg: 3,
        moneyfactor: 1,
    },
    {
        number: 7,
        name: `Копьё`,
        type: `weapon`,
        price: 60,
        defense: 0.5,
        dmg: 3,
        moneyfactor: 1.5,
    },
    {
        number: 8,
        name: `Нож`,
        type: `weapon`,
        price: 40,
        defense: 0.5,
        dmg: 2,
        moneyfactor: 2,
    },
    {
        number: 9,
        name: `Лопата`,
        type: `weapon`,
        price: 50,
        defense: 0.5,
        dmg: 3,
        moneyfactor: 1,
    },
    {
        number: 10,
        name: `Платье`,
        type: `chestplate`,
        price: 130,
        defense: 0.1,
        dmg: 0.1,
        moneyfactor: 2.5,
    },
    {
        number: 11,
        name: `Рубашка`,
        type: `chestplate`,
        price: 100,
        defense: 0.2,
        dmg: 0.2,
        moneyfactor: 2,
    },
    {
        number: 12,
        name: `Галстук`,
        type: `chestplate`,
        price: 110,
        defense: 0.1,
        dmg: 0.1,
        moneyfactor: 2.3,
    },
    {
        number: 13,
        name: `Солнечные очки`,
        type: `helmet`,
        price: 80,
        defense: 0.1,
        dmg: 0.1,
        moneyfactor: 1.8,
    },
    {
        number: 14,
        name: `Корона`,
        type: `helmet`,
        price: 100,
        defense: 0.1,
        dmg: 0.1,
        moneyfactor: 2,
    },
    {
        number: 15,
        name: `Футболка`,
        type: `chestplate`,
        price: 70,
        defense: 0.2,
        dmg: 0.2,
        moneyfactor: 1,
    },
    {
        number: 16,
        name: `Золотой шлем`,
        type: `helmet`,
        price: 70,
        defense: 1,
        dmg: 1.2,
        moneyfactor: 1.5,
    },
    {
        number: 17,
        name: `Золотой нагрудник`,
        type: `chestplate`,
        price: 110,
        defense: 1.5,
        dmg: 1.5,
        moneyfactor: 2,
    },
    {
        number: 18,
        name: `Золотые поножи`,
        type: `leggings`,
        price: 90,
        defense: 1.2,
        dmg: 1.3,
        moneyfactor: 1.7,
    },
    {
        number: 19,
        name: `Золотые ботинки`,
        type: `boots`,
        price: 60,
        defense: 1,
        dmg: 1.1,
        moneyfactor: 1.1,
    },
    {
        number: 20,
        name: `Золотой меч`,
        type: `weapon`,
        price: 70,
        defense: 0.2,
        dmg: 2,
        moneyfactor: 0.4,
    },
]

var worked = [
    10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30
];
var var_eee_gif = [
    `https://cdn.discordapp.com/attachments/870779509782237194/870785156833755147/eee2.gif`,
    `https://cdn.discordapp.com/attachments/870779509782237194/870780975603400714/eee1.gif`,
    `https://cdn.discordapp.com/attachments/870779509782237194/876846233489113118/eee3.gif`
];
var var_lick_gif = [
    `https://cdn.discordapp.com/attachments/870779414785429524/870780897216069642/lick3.gif`,
    `https://cdn.discordapp.com/attachments/870779414785429524/870780897161523200/lick2.gif`,
    `https://cdn.discordapp.com/attachments/870779414785429524/870780901829775461/lick1.gif`,
    `https://cdn.discordapp.com/attachments/870779414785429524/870780912445583420/lick4.gif`
];
var var_boop_gif = [
    `https://cdn.discordapp.com/attachments/870779326633758770/870779780285497364/ZomboMeme_30072021185835.png`,
    `https://cdn.discordapp.com/attachments/870779326633758770/870780819818549348/boop4.gif`,
    `https://cdn.discordapp.com/attachments/870779326633758770/870780824356810782/boop3.gif`,
    `https://cdn.discordapp.com/attachments/870779326633758770/870780824453275668/boop2.gif`,
    'https://cdn.discordapp.com/attachments/870779326633758770/870781769404805250/boop6.gif',
    `https://cdn.discordapp.com/attachments/870779326633758770/870781776950337546/boop5.gif`,
    `https://cdn.discordapp.com/attachments/870779326633758770/870782810829508668/boop7.gif`
];
var var_hug_gif = [
    `https://cdn.discordapp.com/attachments/871281736254881833/871281789048586300/hug1.gif`,
    `https://cdn.discordapp.com/attachments/871281736254881833/871287217174249483/hug2.gif`
];
var var_bite_gif = [
    `https://cdn.discordapp.com/attachments/876845411036430366/876846185925730334/bite3.gif`,
    `https://cdn.discordapp.com/attachments/876845411036430366/876846186731012156/bite1.gif`,
    `https://cdn.discordapp.com/attachments/876845411036430366/876846192133308486/bite2.gif`
];

// Команды //

//embed.addField();
//embed.setImage();
//embed.setURL();
//embed.setThumbnail();
//embed.setAuthor();
//embed.setColor();
//embed.setThumbnail();
//embed.setTitle();
//embed.setDescription();
//embed.setTimestamp();
//embed.setFooter();

function test(robot, msg, args, userID, serverID, msgdate, rolecolor) {
    fs.readdir(`./serversdata/${serverID}/serveritems`, (err, files) => {
        if (err) {
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`Ошибка`)
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
            return
        }
        if (files.length === '1') {
            const serveritem1 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/1.json`));
            const serveritems = [].concat(serveritem1)
        }
        else if (files.length === '2') {
            const serveritem1 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/1.json`));
            const serveritem2 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/2.json`));
            const serveritems = [].concat(serveritem1, serveritem2)
        }
        else if (files.length === '3') {
            const serveritem1 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/1.json`));
            const serveritem2 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/2.json`));
            const serveritem3 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/3.json`));
            const serveritems = [].concat(serveritem1, serveritem2, serveritem3)
        }
        else if (files.length === '4') {
            const serveritem1 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/1.json`));
            const serveritem2 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/2.json`));
            const serveritem3 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/3.json`));
            const serveritem4 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/4.json`));
            const serveritems = [].concat(serveritem1, serveritem2, serveritem3, serveritem4)
        }
        else if (files.length === '5') {
            const serveritem1 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/1.json`));
            const serveritem2 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/2.json`));
            const serveritem3 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/3.json`));
            const serveritem4 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/4.json`));
            const serveritem5 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/5.json`));
            const serveritems = [].concat(serveritem1, serveritem2, serveritem3, serveritem4, serveritem5)
        }
        else if (files.length === '6') {
            const serveritem1 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/1.json`));
            const serveritem2 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/2.json`));
            const serveritem3 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/3.json`));
            const serveritem4 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/4.json`));
            const serveritem5 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/5.json`));
            const serveritem6 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/6.json`));
            const serveritems = [].concat(serveritem1, serveritem2, serveritem3, serveritem4, serveritem5, serveritem6)
        }
        else if (files.length === '7') {
            const serveritem1 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/1.json`));
            const serveritem2 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/2.json`));
            const serveritem3 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/3.json`));
            const serveritem4 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/4.json`));
            const serveritem5 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/5.json`));
            const serveritem6 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/6.json`));
            const serveritem7 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/7.json`));
            const serveritems = [].concat(serveritem1, serveritem2, serveritem3, serveritem4, serveritem5, serveritem6, serveritem7)
        }
        else if (files.length === '8') {
            const serveritem1 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/1.json`));
            const serveritem2 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/2.json`));
            const serveritem3 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/3.json`));
            const serveritem4 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/4.json`));
            const serveritem5 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/5.json`));
            const serveritem6 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/6.json`));
            const serveritem7 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/7.json`));
            const serveritem8 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/8.json`));
            const serveritems = [].concat(serveritem1, serveritem2, serveritem3, serveritem4, serveritem5, serveritem6, serveritem7, serveritem8)
        }
        else if (files.length === '9') {
            const serveritem1 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/1.json`));
            const serveritem2 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/2.json`));
            const serveritem3 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/3.json`));
            const serveritem4 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/4.json`));
            const serveritem5 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/5.json`));
            const serveritem6 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/6.json`));
            const serveritem7 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/7.json`));
            const serveritem8 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/8.json`));
            const serveritem9 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/9.json`));
            const serveritems = [].concat(serveritem1, serveritem2, serveritem3, serveritem4, serveritem5, serveritem6, serveritem7, serveritem8, serveritem9);
        }
        else if (files.length === '10') {
            const serveritem1 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/1.json`));
            const serveritem2 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/2.json`));
            const serveritem3 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/3.json`));
            const serveritem4 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/4.json`));
            const serveritem5 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/5.json`));
            const serveritem6 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/6.json`));
            const serveritem7 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/7.json`));
            const serveritem8 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/8.json`));
            const serveritem9 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/9.json`));
            const serveritem10 = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/serveritems/10.json`));
            const serveritems = [].concat(serveritem1, serveritem2, serveritem3, serveritem4, serveritem5, serveritem6, serveritem7, serveritem8, serveritem9, serveritem10);
        }
        console.log(serveritems);
    });
}

function shop(robot, msg, args, userID, serverID, msgdate, rolecolor) {
    if (!msg.guild) return;
    let i = 1;
    args = msg.content.split(' ');
    args.shift();
    args = args.join(' ');
    setTimeout(() => msg.delete(), 1000);
    if (args === ``) {
        embed = new Discord.MessageEmbed()
            .setColor(`${rolecolor}`)
            .setTitle("Что бы посмотреть список товаров напишите:")
            .addField(">>> `!shop номер страницы` **Всего страниц: 5**")
            .setTimestamp(Date.now())
            .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
        msg.channel.send(embed);
        return
    }
    if (args <= '0') {
        embed = new Discord.MessageEmbed()
            .setColor(`${rolecolor}`)
            .setTitle(`Страницы ${args} не существует`)
            .addField(`>>> **Всего страниц: 4**`)
            .setTimestamp(Date.now())
            .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
        msg.channel.send(embed);
        return
    }
    if (args >= '5') {
        embed = new Discord.MessageEmbed()
            .setColor(`${rolecolor}`)
            .setTitle(`Страницы ${args} не существует`)
            .addField(`>>> **Всего страниц: 4**`)
            .setTimestamp(Date.now())
            .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
        msg.channel.send(embed);
        return
    }
    if (args === '1') {
        tempvar = 1;
        tempvar2 = 2;
        tempvar3 = 3;
        tempvar4 = 4;
        tempvar5 = 5;
        while (i <= 5) {
            if (i === 1) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].number;
                    if (item == tempvar) {
                        itemprice = itemslist[item_count].price;
                        itemtype = itemslist[item_count].type;
                        itemname = itemslist[item_count].name;
                        itemdefense = itemslist[item_count].defense;
                        itemdmg = itemslist[item_count].dmg;
                        itemfactor = itemslist[item_count].moneyfactor;
                    }
                }
            }
            if (i === 2) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].number;
                    if (item == tempvar2) {
                        itemprice2 = itemslist[item_count].price;
                        itemtype2 = itemslist[item_count].type;
                        itemname2 = itemslist[item_count].name;
                        itemdefence2 = itemslist[item_count].defense;
                        itemdmg2 = itemslist[item_count].dmg;
                        itemfactor2 = itemslist[item_count].moneyfactor;
                    }
                }
            }
            if (i === 3) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].number;
                    if (item == tempvar3) {
                        itemprice3 = itemslist[item_count].price;
                        itemtype3 = itemslist[item_count].type;
                        itemname3 = itemslist[item_count].name;
                        itemdefence3 = itemslist[item_count].defense;
                        itemdmg3 = itemslist[item_count].dmg;
                        itemfactor3 = itemslist[item_count].moneyfactor;
                    }
                }
            }
            if (i === 4) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].number;
                    if (item == tempvar4) {
                        itemprice4 = itemslist[item_count].price;
                        itemtype4 = itemslist[item_count].type;
                        itemname4 = itemslist[item_count].name;
                        itemdefence4 = itemslist[item_count].defense;
                        itemdmg4 = itemslist[item_count].dmg;
                        itemfactor4 = itemslist[item_count].moneyfactor;
                    }
                }
            }
            if (i === 5) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].number;
                    if (item == tempvar5) {
                        itemprice5 = itemslist[item_count].price;
                        itemtype5 = itemslist[item_count].type;
                        itemname5 = itemslist[item_count].name;
                        itemdefence5 = itemslist[item_count].defense;
                        itemdmg5 = itemslist[item_count].dmg;
                        itemfactor5 = itemslist[item_count].moneyfactor;
                    }
                }
            }
            i++
        }
    }
    if (args === '2') {
        tempvar = 6;
        tempvar2 = 7;
        tempvar3 = 8;
        tempvar4 = 9;
        tempvar5 = 10;
        while (i <= 5) {
            if (i === 1) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].number;
                    if (item == tempvar) {
                        itemprice = itemslist[item_count].price;
                        itemtype = itemslist[item_count].type;
                        itemname = itemslist[item_count].name;
                        itemdefense = itemslist[item_count].defense;
                        itemdmg = itemslist[item_count].dmg;
                        itemfactor = itemslist[item_count].moneyfactor;
                    }
                }
            }
            if (i === 2) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].number;
                    if (item == tempvar2) {
                        itemprice2 = itemslist[item_count].price;
                        itemtype2 = itemslist[item_count].type;
                        itemname2 = itemslist[item_count].name;
                        itemdefence2 = itemslist[item_count].defense;
                        itemdmg2 = itemslist[item_count].dmg;
                        itemfactor2 = itemslist[item_count].moneyfactor;
                    }
                }
            }
            if (i === 3) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].number;
                    if (item == tempvar3) {
                        itemprice3 = itemslist[item_count].price;
                        itemtype3 = itemslist[item_count].type;
                        itemname3 = itemslist[item_count].name;
                        itemdefence3 = itemslist[item_count].defense;
                        itemdmg3 = itemslist[item_count].dmg;
                        itemfactor3 = itemslist[item_count].moneyfactor;
                    }
                }
            }
            if (i === 4) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].number;
                    if (item == tempvar4) {
                        itemprice4 = itemslist[item_count].price;
                        itemtype4 = itemslist[item_count].type;
                        itemname4 = itemslist[item_count].name;
                        itemdefence4 = itemslist[item_count].defense;
                        itemdmg4 = itemslist[item_count].dmg;
                        itemfactor4 = itemslist[item_count].moneyfactor;
                    }
                }
            }
            if (i === 5) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].number;
                    if (item == tempvar5) {
                        itemprice5 = itemslist[item_count].price;
                        itemtype5 = itemslist[item_count].type;
                        itemname5 = itemslist[item_count].name;
                        itemdefence5 = itemslist[item_count].defense;
                        itemdmg5 = itemslist[item_count].dmg;
                        itemfactor5 = itemslist[item_count].moneyfactor;
                    }
                }
            }
            i++
        }
    }
    if (args === '3') {
        tempvar = 11;
        tempvar2 = 12;
        tempvar3 = 13;
        tempvar4 = 14;
        tempvar5 = 15;
        while (i <= 5) {
            if (i === 1) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].number;
                    if (item == tempvar) {
                        itemprice = itemslist[item_count].price;
                        itemtype = itemslist[item_count].type;
                        itemname = itemslist[item_count].name;
                        itemdefense = itemslist[item_count].defense;
                        itemdmg = itemslist[item_count].dmg;
                        itemfactor = itemslist[item_count].moneyfactor;
                    }
                }
            }
            if (i === 2) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].number;
                    if (item == tempvar2) {
                        itemprice2 = itemslist[item_count].price;
                        itemtype2 = itemslist[item_count].type;
                        itemname2 = itemslist[item_count].name;
                        itemdefence2 = itemslist[item_count].defense;
                        itemdmg2 = itemslist[item_count].dmg;
                        itemfactor2 = itemslist[item_count].moneyfactor;
                    }
                }
            }
            if (i === 3) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].number;
                    if (item == tempvar3) {
                        itemprice3 = itemslist[item_count].price;
                        itemtype3 = itemslist[item_count].type;
                        itemname3 = itemslist[item_count].name;
                        itemdefence3 = itemslist[item_count].defense;
                        itemdmg3 = itemslist[item_count].dmg;
                        itemfactor3 = itemslist[item_count].moneyfactor;
                    }
                }
            }
            if (i === 4) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].number;
                    if (item == tempvar4) {
                        itemprice4 = itemslist[item_count].price;
                        itemtype4 = itemslist[item_count].type;
                        itemname4 = itemslist[item_count].name;
                        itemdefence4 = itemslist[item_count].defense;
                        itemdmg4 = itemslist[item_count].dmg;
                        itemfactor4 = itemslist[item_count].moneyfactor;
                    }
                }
            }
            if (i === 5) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].number;
                    if (item == tempvar5) {
                        itemprice5 = itemslist[item_count].price;
                        itemtype5 = itemslist[item_count].type;
                        itemname5 = itemslist[item_count].name;
                        itemdefence5 = itemslist[item_count].defense;
                        itemdmg5 = itemslist[item_count].dmg;
                        itemfactor5 = itemslist[item_count].moneyfactor;
                    }
                }
            }
            i++
        }
    }
    if (args === '4') {
        tempvar = 16;
        tempvar2 = 17;
        tempvar3 = 18;
        tempvar4 = 19;
        tempvar5 = 20;
        while (i <= 5) {
            if (i === 1) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].number;
                    if (item == tempvar) {
                        itemprice = itemslist[item_count].price;
                        itemtype = itemslist[item_count].type;
                        itemname = itemslist[item_count].name;
                        itemdefense = itemslist[item_count].defense;
                        itemdmg = itemslist[item_count].dmg;
                        itemfactor = itemslist[item_count].moneyfactor;
                    }
                }
            }
            if (i === 2) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].number;
                    if (item == tempvar2) {
                        itemprice2 = itemslist[item_count].price;
                        itemtype2 = itemslist[item_count].type;
                        itemname2 = itemslist[item_count].name;
                        itemdefence2 = itemslist[item_count].defense;
                        itemdmg2 = itemslist[item_count].dmg;
                        itemfactor2 = itemslist[item_count].moneyfactor;
                    }
                }
            }
            if (i === 3) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].number;
                    if (item == tempvar3) {
                        itemprice3 = itemslist[item_count].price;
                        itemtype3 = itemslist[item_count].type;
                        itemname3 = itemslist[item_count].name;
                        itemdefence3 = itemslist[item_count].defense;
                        itemdmg3 = itemslist[item_count].dmg;
                        itemfactor3 = itemslist[item_count].moneyfactor;
                    }
                }
            }
            if (i === 4) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].number;
                    if (item == tempvar4) {
                        itemprice4 = itemslist[item_count].price;
                        itemtype4 = itemslist[item_count].type;
                        itemname4 = itemslist[item_count].name;
                        itemdefence4 = itemslist[item_count].defense;
                        itemdmg4 = itemslist[item_count].dmg;
                        itemfactor4 = itemslist[item_count].moneyfactor;
                    }
                }
            }
            if (i === 5) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].number;
                    if (item == tempvar5) {
                        itemprice5 = itemslist[item_count].price;
                        itemtype5 = itemslist[item_count].type;
                        itemname5 = itemslist[item_count].name;
                        itemdefence5 = itemslist[item_count].defense;
                        itemdmg5 = itemslist[item_count].dmg;
                        itemfactor5 = itemslist[item_count].moneyfactor;
                    }
                }
            }
            i++
        }
    }
    embed = new Discord.MessageEmbed()
        .setColor(`${rolecolor}`)
        .setTitle(`${args}  Cтраница`)
        .setDescription(">>> **Что бы купить предмет напишите:** `!buyitem название предмета с УчЁтОм РеГиСтРа`")
        .addFields(
            { name: `${itemname}`, value: `**Цена: ${itemprice}\nЗащита: ${itemdefense}\nУрон: ${itemdmg}\nМн. денег: ${itemfactor}**`, inline: true },
            { name: `${itemname2}`, value: `**Цена: ${itemprice2}\nЗащита: ${itemdefence2}\nУрон: ${itemdmg2}\nМн. денег: ${itemfactor2}**`, inline: true },
        )
        .addFields(
            { name: `${itemname3}`, value: `**Цена: ${itemprice3}\nЗащита: ${itemdefence3}\nУрон: ${itemdmg3}\nМн. денег: ${itemfactor3}**`, inline: true },
            { name: `${itemname4}`, value: `**Цена: ${itemprice4}\nЗащита: ${itemdefence4}\nУрон: ${itemdmg4}\nМн. денег: ${itemfactor4}**`, inline: true },
        )
        .addFields(
            { name: `${itemname5}`, value: `**Цена: ${itemprice5}\nЗащита: ${itemdefence5}\nУрон: ${itemdmg5}\nМн. денег: ${itemfactor5}**`, inline: true }
        )
        .setTimestamp(Date.now())
        .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
    msg.channel.send(embed);
}

function additem(robot, msg, args, userID, serverID, msgdate, rolecolor) {
    if (!msg.guild) return;
    if (msg.member.hasPermission('ADMINISTRATOR')) {
        args = msg.content.split(" ")
        args.shift()
        is_mark = false
        text = []
        for (let part of args) {
            if (is_mark) {
                last_id = text.length - 1
                text[last_id] += " "
                text[last_id] += part
                if (part[part.length - 1] == '"') {
                    is_mark = false
                    text[last_id] = text[last_id].slice(1, text[last_id].length - 1)
                }
            } else {
                if (part[0] == '"') {
                    is_mark = true
                    text.push(part)
                    if (part.length > 1 && part[part.length - 1] == '"') {
                        is_mark = false
                        last_id = text.length - 1
                        text[last_id] = text[last_id].slice(1, text[last_id].length - 1)
                    }
                } else {
                    text.push(part)
                }
            }
        }
        itemnumber = args[0]
        itemname = args[1]
        itemtype = args[2]
        itemprice = args[3]
        itemdefense = args[4]
        itemdmg = args[5]
        itemmoneyfactor = args[6]
        args = args.join(' ');
        if (args === ``) {
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle("Что бы добавить предмет нужно отправить сообщение в такой форме:")
                .addField(">>> `!additem номер имя тип(helmet, chestplate, leggings, boots, weapon) цена защита урон множитель_денег` предмета")
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
            return
        }
        if (itemnumber === 'undefined') {
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`Вы не указали номер предмета`)
                .addField(">>> `!additem номер имя тип(helmet, chestplate, leggings, boots, weapon) цена защита урон множитель_денег` предмета")
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
            return
        }
        if (itemname === 'undefined') {
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`Вы не указали имя предмета`)
                .addField(">>> `!additem номер имя тип(helmet, chestplate, leggings, boots, weapon) цена защита урон множитель_денег` предмета")
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
            return
        }
        if (itemtype === 'undefined') {
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`Вы не указали тип предмета`)
                .addField(">>> `!additem номер имя тип(helmet, chestplate, leggings, boots, weapon) цена защита урон множитель_денег` предмета")
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
            return
        }
        if (itemprice === 'undefined') {
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`Вы не указали цену предмета`)
                .addField(">>> `!additem номер имя тип(helmet, chestplate, leggings, boots, weapon) цена защита урон множитель_денег` предмета")
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
            return
        }
        if (itemdefense === 'undefined') {
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`Вы не указали защиту предмета`)
                .addField(">>> `!additem номер имя тип(helmet, chestplate, leggings, boots, weapon) цена защита урон множитель_денег` предмета")
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
            return
        }
        if (itemdmg === 'undefined') {
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`Вы не указали урон предмета`)
                .addField(">>> `!additem номер имя тип(helmet, chestplate, leggings, boots, weapon) цена защита урон множитель_денег` предмета")
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
            return
        }
        if (itemmoneyfactor === 'undefined') {
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`Вы не указали множитель предмета`)
                .addField(">>> `!additem номер имя тип(helmet, chestplate, leggings, boots, weapon) цена защита урон множитель_денег` предмета")
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
            return
        }
        if (!isNaN(itemnumber) === false) {
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`${itemnumber} не является номером предмета`)
                .addField(">>> `!additem номер имя тип(helmet, chestplate, leggings, boots, weapon) цена защита урон множитель_денег` предмета")
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
            return
        }
        if (!isNaN(itemname) === true) {
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`${itemname} не является именем предмета`)
                .addField(">>> `!additem номер имя тип(helmet, chestplate, leggings, boots, weapon) цена защита урон множитель_денег` предмета")
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
            return
        }
        if (!isNaN(itemtype) === true) {
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`${itemtype} не является типом предмета`)
                .addField(">>> `!additem номер имя тип(helmet, chestplate, leggings, boots, weapon) цена защита урон множитель_денег` предмета")
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
            return
        }
        if (!isNaN(itemprice) === false) {
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`${itemprice} не является ценой предмета`)
                .addField(">>> `!additem номер имя тип(helmet, chestplate, leggings, boots, weapon) цена защита урон множитель_денег` предмета")
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
            return
        }
        if (!isNaN(itemdefense) === false) {
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`${itemdefense} не является защитой предмета`)
                .addField(">>> `!additem номер имя тип(helmet, chestplate, leggings, boots, weapon) цена защита урон множитель_денег` предмета")
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
            return
        }
        if (!isNaN(itemdmg) === false) {
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`${itemdmg} не является уроном предмета`)
                .addField(">>> `!additem номер имя тип(helmet, chestplate, leggings, boots, weapon) цена защита урон множитель_денег` предмета")
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
            return
        }
        if (!isNaN(itemmoneyfactor) === false) {
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`${itemmoneyfactor} не является множителем предмета`)
                .addField(">>> `!additem номер имя тип(helmet, chestplate, leggings, boots, weapon) цена защита урон множитель_денег` предмета")
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
            return
        }
        try {
            fs.accessSync(`./serversdata/${serverID}`, fs.constants.F_OK)
        } catch (err) {
            fs.mkdirSync(`./serversdata/${serverID}`)
        }
        try {
            fs.accessSync(`./serversdata/${serverID}/serveritems`, fs.constants.F_OK)
        } catch (err) {
            fs.mkdirSync(`./serversdata/${serverID}/serveritems`)
        }
        if (itemnumber <= 0) {
            fs.readdir(`./serversdata/${serverID}/serveritems`, (err, files) => {
                embed = new Discord.MessageEmbed()
                    .setColor(`${rolecolor}`)
                    .setTitle(`Невезможно добавить такой предмет`)
                    .addField(`>>> Максимум предметов: 10. У вас ${files.length}/10`)
                    .setTimestamp(Date.now())
                    .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
                msg.channel.send(embed);
                return
            });
        }
        if (itemnumber > 10) {
            fs.readdir(`./serversdata/${serverID}/serveritems`, (err, files) => {
                embed = new Discord.MessageEmbed()
                    .setColor(`${rolecolor}`)
                    .setTitle(`Невезможно добавить такой предмет`)
                    .addField(`>>> Максимум предметов: 10. У вас ${files.length}/10`)
                    .setTimestamp(Date.now())
                    .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
                msg.channel.send(embed);
                return
            });
        }
        try {
            fs.statSync(`./serversdata/${serverID}/serveritems/${itemnumber}.json`)
            const item = {
                number: itemnumber,
                name: `${itemname}`,
                type: `${itemtype}`,
                price: itemprice,
                defense: itemdefense,
                dmg: itemdmg,
                moneyfactor: itemmoneyfactor,
            }
            fs.writeFileSync(`./serversdata/${serverID}/serveritems/${itemnumber}.json`, JSON.stringify(item));
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`Предмет ${itemname} перезаписан`)
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
        } catch (err) {
            const item = {
                number: itemnumber,
                name: `${itemname}`,
                type: `${itemtype}`,
                price: itemprice,
                defense: itemdefense,
                dmg: itemdmg,
                moneyfactor: itemmoneyfactor,
            }
            fs.writeFileSync(`./serversdata/${serverID}/serveritems/${itemnumber}.json`, JSON.stringify(item));
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`Предмет ${itemname} добавлен`)
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
        }
    }
    else {
        embed = new Discord.MessageEmbed()
            .setColor(`${rolecolor}`)
            .setTitle("У вас нет прав администратора что бы использовать эту команду")
            .setTimestamp(Date.now())
            .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
        msg.channel.send(embed);
    }
}

function equipitem(robot, msg, args, userID, serverID, msgdate, rolecolor) {
    if (!msg.guild) return;
    args = msg.content.split(' ');
    args.shift();
    args = args.join(' ');
    try {
        fs.accessSync(`./serversdata/${serverID}`, fs.constants.F_OK)
    } catch (err) {
        fs.mkdirSync(`./serversdata/${serverID}`)
        fs.mkdirSync(`./serversdata/${serverID}/usersdata`)
        fs.mkdirSync(`./serversdata/${serverID}/usersdata/${userID}`)
    }
    try {
        fs.accessSync(`./serversdata/${serverID}/usersdata`, fs.constants.F_OK)
    } catch (err) {
        fs.mkdirSync(`./serversdata/${serverID}/usersdata`)
    }
    try {
        fs.accessSync(`./serversdata/${serverID}/usersdata/${userID}`, fs.constants.F_OK)
    } catch (err) {
        fs.mkdirSync(`./serversdata/${serverID}/usersdata/${userID}`)
    }
    try {
        fs.statSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`)
    } catch (err) {
        const inventory = {
            slot1: `Пусто`,
            slot2: `Пусто`,
            slot3: `Пусто`,
            slot4: `Пусто`,
            slot5: `Пусто`,
            slot6: `Пусто`,
            slot7: `Пусто`,
            slot8: `Пусто`,
            slot9: `Пусто`,
        }
        fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
    }
    try {
        fs.statSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`)
    } catch (err) {
        const equip = {
            slot1: `Пусто`,
            slot2: `Пусто`,
            slot3: `Пусто`,
            slot4: `Пусто`,
            slot5: `Пусто`,
        }
        fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`, JSON.stringify(equip));
    }
    try {
        fs.statSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`)
    } catch (err) {
        const data = {
            money: 300,
            job: `Безработный`,
            jobjoincd: 0,
            workcd: 0,
            resuser: 0,
        };
        fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`, JSON.stringify(data));
    }
    if (args === '') {
        embed = new Discord.MessageEmbed()
            .setColor(`${rolecolor}`)
            .setTitle(`Вы не выбрали предмет который хотите надеть`)
            .setDescription(">>> **Напишите номер слота и попробуйте ещё раз**")
            .setTimestamp(Date.now())
            .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
        msg.channel.send(embed);
        return
    }
    else if (args <= 0) {
        embed = new Discord.MessageEmbed()
            .setColor(`${rolecolor}`)
            .setTitle(`Такого слота не существет`)
            .setDescription(">>> **Напишите номер слота и попробуйте ещё раз**")
            .setTimestamp(Date.now())
            .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
        msg.channel.send(embed);
        return
    }
    else if (args > 9) {
        embed = new Discord.MessageEmbed()
            .setColor(`${rolecolor}`)
            .setTitle(`Такого слота не существет`)
            .setDescription(">>> **Напишите номер слота и попробуйте ещё раз**")
            .setTimestamp(Date.now())
            .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
        msg.channel.send(embed);
        return
    }
    const userinventory = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`));
    let inventoryslot1 = userinventory.slot1;
    let inventoryslot2 = userinventory.slot2;
    let inventoryslot3 = userinventory.slot3;
    let inventoryslot4 = userinventory.slot4;
    let inventoryslot5 = userinventory.slot5;
    let inventoryslot6 = userinventory.slot6;
    let inventoryslot7 = userinventory.slot7;
    let inventoryslot8 = userinventory.slot8;
    let inventoryslot9 = userinventory.slot9;
    if (args === '1') {
        busyslot = inventoryslot1;
    }
    else if (args === '2') {
        busyslot = inventoryslot2;
    }
    else if (args === '3') {
        busyslot = inventoryslot3;
    }
    else if (args === '4') {
        busyslot = inventoryslot4;
    }
    else if (args === '5') {
        busyslot = inventoryslot5;
    }
    else if (args === '6') {
        busyslot = inventoryslot6;
    }
    else if (args === '7') {
        busyslot = inventoryslot7;
    }
    else if (args === '8') {
        busyslot = inventoryslot8;
    }
    else if (args === '9') {
        busyslot = inventoryslot9;
    }
    else {
        embed = new Discord.MessageEmbed()
            .setColor(`${rolecolor}`)
            .setTitle(`Не удалось найти слот ${args} `)
            .setDescription(">>> **Напишите номер слота и попробуйте ещё раз**")
            .setTimestamp(Date.now())
            .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
        msg.channel.send(embed);
        return
    }
    if (busyslot === 'Пусто') {
        embed = new Discord.MessageEmbed()
            .setColor(`${rolecolor}`)
            .setTitle(`В слоте ${args} отсутствует предмет`)
            .setDescription(">>> **Напишите номер слота и попробуйте ещё раз**")
            .setTimestamp(Date.now())
            .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
        msg.channel.send(embed);
        return
    }
    else {
        for (item_count in itemslist) {
            var item = itemslist[item_count].name;
            if (item == busyslot) {
                setTimeout(() => msg.delete(), 1000);
                found();
            }
        }
    }
    function found() {
        const userequip = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`));
        let equipslot1 = userequip.slot1;
        let equipslot2 = userequip.slot2;
        let equipslot3 = userequip.slot3;
        let equipslot4 = userequip.slot4;
        let equipslot5 = userequip.slot5;
        let itemprice = itemslist[item_count].price;
        let itemtype = itemslist[item_count].type;
        let itemname = itemslist[item_count].name;
        let itemdefense = itemslist[item_count].defense;
        let itemdmg = itemslist[item_count].dmg;
        let itemfactor = itemslist[item_count].moneyfactor;
        if (itemtype === 'helmet') {
            if (equipslot1 === 'Пусто') {
                const equip = {
                    slot1: busyslot,
                    slot2: equipslot2,
                    slot3: equipslot3,
                    slot4: equipslot4,
                    slot5: equipslot5,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`, JSON.stringify(equip));
                tempvar = false;
            }
            else {
                voidslot = equipslot1;
                const equip = {
                    slot1: busyslot,
                    slot2: equipslot2,
                    slot3: equipslot3,
                    slot4: equipslot4,
                    slot5: equipslot5,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`, JSON.stringify(equip));
                tempvar = true;
            }
        }
        else if (itemtype === 'chestplate') {
            if (equipslot2 === 'Пусто') {
                const equip = {
                    slot1: equipslot1,
                    slot2: busyslot,
                    slot3: equipslot3,
                    slot4: equipslot4,
                    slot5: equipslot5,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`, JSON.stringify(equip));
                tempvar = false;
            }
            else {
                voidslot = equipslot2;
                const equip = {
                    slot1: equipslot1,
                    slot2: busyslot,
                    slot3: equipslot3,
                    slot4: equipslot4,
                    slot5: equipslot5,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`, JSON.stringify(equip));
                tempvar = true;
            }
        }
        else if (itemtype === 'leggings') {
            if (equipslot3 === 'Пусто') {
                const equip = {
                    slot1: equipslot1,
                    slot2: equipslot2,
                    slot3: busyslot,
                    slot4: equipslot4,
                    slot5: equipslot5,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`, JSON.stringify(equip));
                tempvar = false;
            }
            else {
                voidslot = equipslot3;
                const equip = {
                    slot1: equipslot1,
                    slot2: equipslot2,
                    slot3: busyslot,
                    slot4: equipslot4,
                    slot5: equipslot5,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`, JSON.stringify(equip));
                tempvar = true;
            }
        }
        else if (itemtype === 'boots') {
            if (equipslot4 === 'Пусто') {
                const equip = {
                    slot1: equipslot1,
                    slot2: equipslot2,
                    slot3: equipslot3,
                    slot4: busyslot,
                    slot5: equipslot5,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`, JSON.stringify(equip));
                tempvar = false;
            }
            else {
                voidslot = equipslot4;
                const equip = {
                    slot1: equipslot1,
                    slot2: equipslot2,
                    slot3: equipslot3,
                    slot4: busyslot,
                    slot5: equipslot5,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`, JSON.stringify(equip));
                tempvar = true;
            }
        }
        else if (itemtype === 'weapon') {
            if (equipslot5 === 'Пусто') {
                const equip = {
                    slot1: equipslot1,
                    slot2: equipslot2,
                    slot3: equipslot3,
                    slot4: equipslot4,
                    slot5: busyslot,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`, JSON.stringify(equip));
                tempvar = false;
            }
            else {
                voidslot = equipslot5;
                const equip = {
                    slot1: equipslot1,
                    slot2: equipslot2,
                    slot3: equipslot3,
                    slot4: equipslot4,
                    slot5: busyslot,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`, JSON.stringify(equip));
                tempvar = true;
            }
        }
        else {
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`${busyslot} невозможно надеть`)
                .setDescription(">>> **Попробуйте ещё раз**")
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
            return
        }
        if (tempvar === false) {
            if (args === '1') {
                const inventory = {
                    slot1: 'Пусто',
                    slot2: inventoryslot2,
                    slot3: inventoryslot3,
                    slot4: inventoryslot4,
                    slot5: inventoryslot5,
                    slot6: inventoryslot6,
                    slot7: inventoryslot7,
                    slot8: inventoryslot8,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (args === '2') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: 'Пусто',
                    slot3: inventoryslot3,
                    slot4: inventoryslot4,
                    slot5: inventoryslot5,
                    slot6: inventoryslot6,
                    slot7: inventoryslot7,
                    slot8: inventoryslot8,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (args === '3') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: inventoryslot2,
                    slot3: 'Пусто',
                    slot4: inventoryslot4,
                    slot5: inventoryslot5,
                    slot6: inventoryslot6,
                    slot7: inventoryslot7,
                    slot8: inventoryslot8,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (args === '4') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: inventoryslot2,
                    slot3: inventoryslot3,
                    slot4: 'Пусто',
                    slot5: inventoryslot5,
                    slot6: inventoryslot6,
                    slot7: inventoryslot7,
                    slot8: inventoryslot8,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (args === '5') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: inventoryslot2,
                    slot3: inventoryslot3,
                    slot4: inventoryslot4,
                    slot5: 'Пусто',
                    slot6: inventoryslot6,
                    slot7: inventoryslot7,
                    slot8: inventoryslot8,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (args === '6') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: inventoryslot2,
                    slot3: inventoryslot3,
                    slot4: inventoryslot4,
                    slot5: inventoryslot5,
                    slot6: 'Пусто',
                    slot7: inventoryslot7,
                    slot8: inventoryslot8,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (args === '7') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: inventoryslot2,
                    slot3: inventoryslot3,
                    slot4: inventoryslot4,
                    slot5: inventoryslot5,
                    slot6: inventoryslot6,
                    slot7: 'Пусто',
                    slot8: inventoryslot8,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (args === '8') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: inventoryslot2,
                    slot3: inventoryslot3,
                    slot4: inventoryslot4,
                    slot5: inventoryslot5,
                    slot6: inventoryslot6,
                    slot7: inventoryslot7,
                    slot8: 'Пусто',
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (args === '9') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: inventoryslot2,
                    slot3: inventoryslot3,
                    slot4: inventoryslot4,
                    slot5: inventoryslot5,
                    slot6: inventoryslot6,
                    slot7: inventoryslot7,
                    slot8: inventoryslot8,
                    slot9: 'Пусто',
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`${busyslot} одето`)
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
        }
        if (tempvar === true) {
            if (args === '1') {
                const inventory = {
                    slot1: voidslot,
                    slot2: inventoryslot2,
                    slot3: inventoryslot3,
                    slot4: inventoryslot4,
                    slot5: inventoryslot5,
                    slot6: inventoryslot6,
                    slot7: inventoryslot7,
                    slot8: inventoryslot8,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (args === '2') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: voidslot,
                    slot3: inventoryslot3,
                    slot4: inventoryslot4,
                    slot5: inventoryslot5,
                    slot6: inventoryslot6,
                    slot7: inventoryslot7,
                    slot8: inventoryslot8,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (args === '3') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: inventoryslot2,
                    slot3: voidslot,
                    slot4: inventoryslot4,
                    slot5: inventoryslot5,
                    slot6: inventoryslot6,
                    slot7: inventoryslot7,
                    slot8: inventoryslot8,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (args === '4') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: inventoryslot2,
                    slot3: inventoryslot3,
                    slot4: voidslot,
                    slot5: inventoryslot5,
                    slot6: inventoryslot6,
                    slot7: inventoryslot7,
                    slot8: inventoryslot8,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (args === '5') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: inventoryslot2,
                    slot3: inventoryslot3,
                    slot4: inventoryslot4,
                    slot5: voidslot,
                    slot6: inventoryslot6,
                    slot7: inventoryslot7,
                    slot8: inventoryslot8,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (args === '6') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: inventoryslot2,
                    slot3: inventoryslot3,
                    slot4: inventoryslot4,
                    slot5: inventoryslot5,
                    slot6: voidslot,
                    slot7: inventoryslot7,
                    slot8: inventoryslot8,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (args === '7') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: inventoryslot2,
                    slot3: inventoryslot3,
                    slot4: inventoryslot4,
                    slot5: inventoryslot5,
                    slot6: inventoryslot6,
                    slot7: voidslot,
                    slot8: inventoryslot8,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (args === '8') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: inventoryslot2,
                    slot3: inventoryslot3,
                    slot4: inventoryslot4,
                    slot5: inventoryslot5,
                    slot6: inventoryslot6,
                    slot7: inventoryslot7,
                    slot8: voidslot,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (args === '9') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: inventoryslot2,
                    slot3: inventoryslot3,
                    slot4: inventoryslot4,
                    slot5: inventoryslot5,
                    slot6: inventoryslot6,
                    slot7: inventoryslot7,
                    slot8: inventoryslot8,
                    slot9: voidslot,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`${busyslot} одето вместо ${voidslot}`)
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
        }
    }
}

function sellitem(robot, msg, args, userID, serverID, msgdate, rolecolor) {
    if (!msg.guild) return;
    args = msg.content.split(' ');
    args.shift();
    args = args.join(' ');
    try {
        fs.accessSync(`./serversdata/${serverID}`, fs.constants.F_OK)
    } catch (err) {
        fs.mkdirSync(`./serversdata/${serverID}`)
        fs.mkdirSync(`./serversdata/${serverID}/usersdata`)
        fs.mkdirSync(`./serversdata/${serverID}/usersdata/${userID}`)
    }
    try {
        fs.accessSync(`./serversdata/${serverID}/usersdata`, fs.constants.F_OK)
    } catch (err) {
        fs.mkdirSync(`./serversdata/${serverID}/usersdata`)
    }
    try {
        fs.accessSync(`./serversdata/${serverID}/usersdata/${userID}`, fs.constants.F_OK)
    } catch (err) {
        fs.mkdirSync(`./serversdata/${serverID}/usersdata/${userID}`)
    }
    try {
        fs.statSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`)
    } catch (err) {
        const inventory = {
            slot1: `Пусто`,
            slot2: `Пусто`,
            slot3: `Пусто`,
            slot4: `Пусто`,
            slot5: `Пусто`,
            slot6: `Пусто`,
            slot7: `Пусто`,
            slot8: `Пусто`,
            slot9: `Пусто`,
        }
        fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
    }
    try {
        fs.statSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`)
    } catch (err) {
        const equip = {
            slot1: `Пусто`,
            slot2: `Пусто`,
            slot3: `Пусто`,
            slot4: `Пусто`,
            slot5: `Пусто`,
        }
        fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`, JSON.stringify(equip));
    }
    try {
        fs.statSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`)
    } catch (err) {
        const data = {
            money: 300,
            job: `Безработный`,
            jobjoincd: 0,
            workcd: 0,
            resuser: 0,
        };
        fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`, JSON.stringify(data));
    }
    if (args === '') {
        embed = new Discord.MessageEmbed()
            .setColor(`${rolecolor}`)
            .setTitle(`Вы не выбрали предмет для продажи`)
            .setDescription(">>> **Напишите номер слота и попробуйте ещё раз**")
            .setTimestamp(Date.now())
            .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
        msg.channel.send(embed);
        return
    }
    else if (args <= 0) {
        embed = new Discord.MessageEmbed()
            .setColor(`${rolecolor}`)
            .setTitle(`Такого слота не существет`)
            .setDescription(">>> **Напишите номер слота и попробуйте ещё раз**")
            .setTimestamp(Date.now())
            .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
        msg.channel.send(embed);
        return
    }
    else if (args > 9) {
        embed = new Discord.MessageEmbed()
            .setColor(`${rolecolor}`)
            .setTitle(`Такого слота не существет`)
            .setDescription(">>> **Напишите номер слота и попробуйте ещё раз**")
            .setTimestamp(Date.now())
            .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
        msg.channel.send(embed);
        return
    }
    const userinventory = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`));
    let inventoryslot1 = userinventory.slot1;
    let inventoryslot2 = userinventory.slot2;
    let inventoryslot3 = userinventory.slot3;
    let inventoryslot4 = userinventory.slot4;
    let inventoryslot5 = userinventory.slot5;
    let inventoryslot6 = userinventory.slot6;
    let inventoryslot7 = userinventory.slot7;
    let inventoryslot8 = userinventory.slot8;
    let inventoryslot9 = userinventory.slot9;
    if (args === '1') {
        busyslot = inventoryslot1;
    }
    else if (args === '2') {
        busyslot = inventoryslot2;
    }
    else if (args === '3') {
        busyslot = inventoryslot3;
    }
    else if (args === '4') {
        busyslot = inventoryslot4;
    }
    else if (args === '5') {
        busyslot = inventoryslot5;
    }
    else if (args === '6') {
        busyslot = inventoryslot6;
    }
    else if (args === '7') {
        busyslot = inventoryslot7;
    }
    else if (args === '8') {
        busyslot = inventoryslot8;
    }
    else if (args === '9') {
        busyslot = inventoryslot9;
    }
    if (busyslot === 'Пусто') {
        embed = new Discord.MessageEmbed()
            .setColor(`${rolecolor}`)
            .setTitle(`В слоте ${args} отсутствует предмет`)
            .setDescription(">>> **Напишите номер слота и попробуйте ещё раз**")
            .setTimestamp(Date.now())
            .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
        msg.channel.send(embed);
        return
    }
    else {
        for (item_count in itemslist) {
            var item = itemslist[item_count].name;
            if (item == busyslot) {
                setTimeout(() => msg.delete(), 1000);
                found();
            }
        }
    }
    function found() {
        let itemprice = itemslist[item_count].price;
        let itemtype = itemslist[item_count].type;
        let itemname = itemslist[item_count].name;
        let itemdefense = itemslist[item_count].defense;
        let itemdmg = itemslist[item_count].dmg;
        let itemfactor = itemslist[item_count].moneyfactor;
        const userdata = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`));
        let userjob = userdata.job;
        let usermoney = userdata.money;
        let userjoincd = userdata.jobjoincd;
        let userworkcd = userdata.workcd;
        let userres = userdata.resuser;
        if (args === '1') {
            const inventory = {
                slot1: 'Пусто',
                slot2: inventoryslot2,
                slot3: inventoryslot3,
                slot4: inventoryslot4,
                slot5: inventoryslot5,
                slot6: inventoryslot6,
                slot7: inventoryslot7,
                slot8: inventoryslot8,
                slot9: inventoryslot9,
            }
            fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
        }
        else if (args === '2') {
            const inventory = {
                slot1: inventoryslot1,
                slot2: 'Пусто',
                slot3: inventoryslot3,
                slot4: inventoryslot4,
                slot5: inventoryslot5,
                slot6: inventoryslot6,
                slot7: inventoryslot7,
                slot8: inventoryslot8,
                slot9: inventoryslot9,
            }
            fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
        }
        else if (args === '3') {
            const inventory = {
                slot1: inventoryslot1,
                slot2: inventoryslot2,
                slot3: 'Пусто',
                slot4: inventoryslot4,
                slot5: inventoryslot5,
                slot6: inventoryslot6,
                slot7: inventoryslot7,
                slot8: inventoryslot8,
                slot9: inventoryslot9,
            }
            fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
        }
        else if (args === '4') {
            const inventory = {
                slot1: inventoryslot1,
                slot2: inventoryslot2,
                slot3: inventoryslot3,
                slot4: 'Пусто',
                slot5: inventoryslot5,
                slot6: inventoryslot6,
                slot7: inventoryslot7,
                slot8: inventoryslot8,
                slot9: inventoryslot9,
            }
            fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
        }
        else if (args === '5') {
            const inventory = {
                slot1: inventoryslot1,
                slot2: inventoryslot2,
                slot3: inventoryslot3,
                slot4: inventoryslot4,
                slot5: 'Пусто',
                slot6: inventoryslot6,
                slot7: inventoryslot7,
                slot8: inventoryslot8,
                slot9: inventoryslot9,
            }
            fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
        }
        else if (args === '6') {
            const inventory = {
                slot1: inventoryslot1,
                slot2: inventoryslot2,
                slot3: inventoryslot3,
                slot4: inventoryslot4,
                slot5: inventoryslot5,
                slot6: 'Пусто',
                slot7: inventoryslot7,
                slot8: inventoryslot8,
                slot9: inventoryslot9,
            }
            fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
        }
        else if (args === '7') {
            const inventory = {
                slot1: inventoryslot1,
                slot2: inventoryslot2,
                slot3: inventoryslot3,
                slot4: inventoryslot4,
                slot5: inventoryslot5,
                slot6: inventoryslot6,
                slot7: 'Пусто',
                slot8: inventoryslot8,
                slot9: inventoryslot9,
            }
            fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
        }
        else if (args === '8') {
            const inventory = {
                slot1: inventoryslot1,
                slot2: inventoryslot2,
                slot3: inventoryslot3,
                slot4: inventoryslot4,
                slot5: inventoryslot5,
                slot6: inventoryslot6,
                slot7: inventoryslot7,
                slot8: 'Пусто',
                slot9: inventoryslot9,
            }
            fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
        }
        else if (args === '9') {
            const inventory = {
                slot1: inventoryslot1,
                slot2: inventoryslot2,
                slot3: inventoryslot3,
                slot4: inventoryslot4,
                slot5: inventoryslot5,
                slot6: inventoryslot6,
                slot7: inventoryslot7,
                slot8: inventoryslot8,
                slot9: 'Пусто',
            }
            fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
        }
        usermoney += itemprice / 100 * 80
        const data = {
            money: usermoney,
            job: userjob,
            jobjoincd: userjoincd,
            workcd: userworkcd,
            resuser: userres,
        };
        fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`, JSON.stringify(data));
        embed = new Discord.MessageEmbed()
            .setColor(`${rolecolor}`)
            .setTitle(`${busyslot} продано`)
            .setDescription(`>>> **Вы получили ${itemprice / 100 * 80}**`)
            .setTimestamp(Date.now())
            .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
        msg.channel.send(embed);
    }
}

function buyitem(robot, msg, args, userID, serverID, msgdate, rolecolor) {
    if (!msg.guild) return;
    args = msg.content.split(' ');
    args.shift();
    args = args.join(' ');
    try {
        fs.accessSync(`./serversdata/${serverID}`, fs.constants.F_OK)
    } catch (err) {
        fs.mkdirSync(`./serversdata/${serverID}`)
        fs.mkdirSync(`./serversdata/${serverID}/usersdata`)
        fs.mkdirSync(`./serversdata/${serverID}/usersdata/${userID}`)
    }
    try {
        fs.accessSync(`./serversdata/${serverID}/usersdata`, fs.constants.F_OK)
    } catch (err) {
        fs.mkdirSync(`./serversdata/${serverID}/usersdata`)
    }
    try {
        fs.accessSync(`./serversdata/${serverID}/usersdata/${userID}`, fs.constants.F_OK)
    } catch (err) {
        fs.mkdirSync(`./serversdata/${serverID}/usersdata/${userID}`)
    }
    try {
        fs.statSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`)
    } catch (err) {
        const inventory = {
            slot1: `Пусто`,
            slot2: `Пусто`,
            slot3: `Пусто`,
            slot4: `Пусто`,
            slot5: `Пусто`,
            slot6: `Пусто`,
            slot7: `Пусто`,
            slot8: `Пусто`,
            slot9: `Пусто`,
        }
        fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
    }
    try {
        fs.statSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`)
    } catch (err) {
        const equip = {
            slot1: `Пусто`,
            slot2: `Пусто`,
            slot3: `Пусто`,
            slot4: `Пусто`,
            slot5: `Пусто`,
        }
        fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`, JSON.stringify(equip));
    }
    try {
        fs.statSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`)
    } catch (err) {
        const data = {
            money: 300,
            job: `Безработный`,
            jobjoincd: 0,
            workcd: 0,
            resuser: 0,
        };
        fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`, JSON.stringify(data));
    }
    if (args === '') {
        embed = new Discord.MessageEmbed()
            .setColor(`${rolecolor}`)
            .setTitle(`Вы не выбрали предмет для покупки`)
            .setDescription(">>> **Напишите название предмета и попробуйте ещё раз**")
            .setTimestamp(Date.now())
            .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
        msg.channel.send(embed);
        return
    }
    else {
        for (item_count in itemslist) {
            var item = itemslist[item_count].name;
            if (item == args) {
                setTimeout(() => msg.delete(), 1000);
                found();
            }
        }
    }
    function found() {
        let itemprice = itemslist[item_count].price;
        let itemtype = itemslist[item_count].type;
        let itemname = itemslist[item_count].name;
        let itemdefense = itemslist[item_count].defense;
        let itemdmg = itemslist[item_count].dmg;
        let itemfactor = itemslist[item_count].moneyfactor;
        const userdata = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`));
        let userjob = userdata.job;
        let usermoney = userdata.money;
        let userjoincd = userdata.jobjoincd;
        let userworkcd = userdata.workcd;
        let userres = userdata.resuser;
        if (usermoney >= itemprice) {
            const userinventory = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`));
            let inventoryslot1 = userinventory.slot1;
            let inventoryslot2 = userinventory.slot2;
            let inventoryslot3 = userinventory.slot3;
            let inventoryslot4 = userinventory.slot4;
            let inventoryslot5 = userinventory.slot5;
            let inventoryslot6 = userinventory.slot6;
            let inventoryslot7 = userinventory.slot7;
            let inventoryslot8 = userinventory.slot8;
            let inventoryslot9 = userinventory.slot9;
            if (inventoryslot1 === 'Пусто') {
                voidslot = '1';
            }
            else if (inventoryslot2 === 'Пусто') {
                voidslot = '2';
            }
            else if (inventoryslot3 === 'Пусто') {
                voidslot = '3';
            }
            else if (inventoryslot4 === 'Пусто') {
                voidslot = '4';
            }
            else if (inventoryslot5 === 'Пусто') {
                voidslot = '5';
            }
            else if (inventoryslot6 === 'Пусто') {
                voidslot = '6';
            }
            else if (inventoryslot7 === 'Пусто') {
                voidslot = '7';
            }
            else if (inventoryslot8 === 'Пусто') {
                voidslot = '8';
            }
            else if (inventoryslot9 === 'Пусто') {
                voidslot = '9';
            }
            else {
                embed = new Discord.MessageEmbed()
                    .setColor(`${rolecolor}`)
                    .setTitle(`У вас нет места в инвентаре`)
                    .setDescription(">>> **Освободите слот и попробуйте ещё раз**")
                    .setTimestamp(Date.now())
                    .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
                msg.channel.send(embed);
                return
            }
            if (voidslot === '1') {
                const inventory = {
                    slot1: itemname,
                    slot2: inventoryslot2,
                    slot3: inventoryslot3,
                    slot4: inventoryslot4,
                    slot5: inventoryslot5,
                    slot6: inventoryslot6,
                    slot7: inventoryslot7,
                    slot8: inventoryslot8,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (voidslot === '2') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: itemname,
                    slot3: inventoryslot3,
                    slot4: inventoryslot4,
                    slot5: inventoryslot5,
                    slot6: inventoryslot6,
                    slot7: inventoryslot7,
                    slot8: inventoryslot8,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (voidslot === '3') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: inventoryslot2,
                    slot3: itemname,
                    slot4: inventoryslot4,
                    slot5: inventoryslot5,
                    slot6: inventoryslot6,
                    slot7: inventoryslot7,
                    slot8: inventoryslot8,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (voidslot === '4') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: inventoryslot2,
                    slot3: inventoryslot3,
                    slot4: itemname,
                    slot5: inventoryslot5,
                    slot6: inventoryslot6,
                    slot7: inventoryslot7,
                    slot8: inventoryslot8,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (voidslot === '5') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: inventoryslot2,
                    slot3: inventoryslot3,
                    slot4: inventoryslot4,
                    slot5: itemname,
                    slot6: inventoryslot6,
                    slot7: inventoryslot7,
                    slot8: inventoryslot8,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (voidslot === '6') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: inventoryslot2,
                    slot3: inventoryslot3,
                    slot4: inventoryslot4,
                    slot5: inventoryslot5,
                    slot6: itemname,
                    slot7: inventoryslot7,
                    slot8: inventoryslot8,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (voidslot === '7') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: inventoryslot2,
                    slot3: inventoryslot3,
                    slot4: inventoryslot4,
                    slot5: inventoryslot5,
                    slot6: inventoryslot6,
                    slot7: itemname,
                    slot8: inventoryslot8,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (voidslot === '8') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: inventoryslot2,
                    slot3: inventoryslot3,
                    slot4: inventoryslot4,
                    slot5: inventoryslot5,
                    slot6: inventoryslot6,
                    slot7: inventoryslot7,
                    slot8: itemname,
                    slot9: inventoryslot9,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            else if (voidslot === '9') {
                const inventory = {
                    slot1: inventoryslot1,
                    slot2: inventoryslot2,
                    slot3: inventoryslot3,
                    slot4: inventoryslot4,
                    slot5: inventoryslot5,
                    slot6: inventoryslot6,
                    slot7: inventoryslot7,
                    slot8: inventoryslot8,
                    slot9: itemname,
                }
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
            }
            usermoney -= itemprice
            const data = {
                money: usermoney,
                job: userjob,
                jobjoincd: userjoincd,
                workcd: userworkcd,
                resuser: userres,
            };
            fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`, JSON.stringify(data));
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`${args}`)
                .setDescription(`>>> **Добавлено в ${voidslot} слот инвентаря**`)
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
        }
        else {
            itemprice -= usermoney
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`У вас недостаточно денег (${itemprice})`)
                .setDescription(`>>> **Накопите нужную сумму денег и попробуйте ещё раз**`)
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
        }
    }
}

function help(robot, msg, args, userID, serverID, msgdate, rolecolor) {
    if (!msg.guild) return;
    setTimeout(() => msg.delete(), 1000);
    embed = new Discord.MessageEmbed()
        .setColor(`${rolecolor}`)
        .setThumbnail(robot.user.avatarURL())
        .setTitle(`Список команд:`)
        .addField("Сделать буп пользователю: `!boop @user`", "\u200B")
        .addField("Сделать кусь пользователю: `!bite @user`", "\u200B")
        .addField("Сделать лизь пользователю: `!lick @user`", "\u200B")
        .addField("Запищать на пользователя: `!eee @user`", "\u200B")
        .addField("Обнять пользователя: `!hug @user`", "\u200B")
        .addField("Узнать свою статистику: `!statistic`", "\u200B")
        .addField("Получить работу: `!jobjoin`", "\u200B")
        .addField("Начать работать: `!work`", "\u200B")
        .addField("Продать ресурсы: `!sell`", "\u200B")
        .addField("Магазин вещей: `!shop`", "\u200B")
        .addField("Купить предмет: `!buyitem`", "\u200B")
        .addField("Продать предмет: `!sellitem`", "\u200B")
        .addField("Одеть предмет: `!equipitem`", "\u200B")
        .setTimestamp(Date.now())
        .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
    msg.channel.send(embed);
}

function sell(robot, msg, args, userID, serverID, msgdate, rolecolor) {
    if (!msg.guild) return;
    args = msg.content.split(' ');
    args.shift();
    args = args.join(' ');
    try {
        fs.accessSync(`./serversdata/${serverID}`, fs.constants.F_OK)
    } catch (err) {
        fs.mkdirSync(`./serversdata/${serverID}`)
        fs.mkdirSync(`./serversdata/${serverID}/usersdata`)
        fs.mkdirSync(`./serversdata/${serverID}/usersdata/${userID}`)
    }
    try {
        fs.accessSync(`./serversdata/${serverID}/usersdata`, fs.constants.F_OK)
    } catch (err) {
        fs.mkdirSync(`./serversdata/${serverID}/usersdata`)
    }
    try {
        fs.accessSync(`./serversdata/${serverID}/usersdata/${userID}`, fs.constants.F_OK)
    } catch (err) {
        fs.mkdirSync(`./serversdata/${serverID}/usersdata/${userID}`)
    }
    try {
        fs.statSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`)
    } catch (err) {
        const inventory = {
            slot1: `Пусто`,
            slot2: `Пусто`,
            slot3: `Пусто`,
            slot4: `Пусто`,
            slot5: `Пусто`,
            slot6: `Пусто`,
            slot7: `Пусто`,
            slot8: `Пусто`,
            slot9: `Пусто`,
        }
        fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
    }
    try {
        fs.statSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`)
    } catch (err) {
        const equip = {
            slot1: `Пусто`,
            slot2: `Пусто`,
            slot3: `Пусто`,
            slot4: `Пусто`,
            slot5: `Пусто`,
        }
        fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`, JSON.stringify(equip));
    }
    try {
        fs.statSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`)
    } catch (err) {
        const data = {
            money: 300,
            job: `Безработный`,
            jobjoincd: 0,
            workcd: 0,
            resuser: 0,
        };
        fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`, JSON.stringify(data));
    }
    setTimeout(() => msg.delete(), 1000);
    const user = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`));
    let userjob = user.job;
    let usermoney = user.money;
    let userjoincd = user.jobjoincd;
    let userworkcd = user.workcd;
    let userres = user.resuser;
    if (args === ``) {
        if (userres === 0) {
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`${msg.author.username} вам нечего продавать`)
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`);
            msg.channel.send(embed);
        }
        else {
            usermoney = usermoney + userres * standartmoneyfactor;
            userres = 0;
            const data = {
                money: usermoney,
                job: `${userjob}`,
                jobjoincd: userjoincd,
                workcd: userworkcd,
                resuser: userres,
            };
            fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`, JSON.stringify(data));
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`${msg.author.username} продал(а) все ресурсы`)
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`);
            msg.channel.send(embed);
        }
    }
    else {
        if (!isNaN(args) === true) {
            if (userres === 0) {
                embed = new Discord.MessageEmbed()
                    .setColor(`${rolecolor}`)
                    .setTitle(`${msg.author.username} вам нечего продавать`)
                    .setTimestamp(Date.now())
                    .setFooter(`${msg.author.tag}`);
                msg.channel.send(embed);
            }
            else {
                if (args > userres) {
                    args = userres;
                    usermoney = usermoney + args * standartmoneyfactor;
                    userres = userres - args;
                    const data = {
                        money: usermoney,
                        job: `${userjob}`,
                        jobjoincd: userjoincd,
                        workcd: userworkcd,
                        resuser: userres,
                    };
                    fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`, JSON.stringify(data));
                    embed = new Discord.MessageEmbed()
                        .setColor(`${rolecolor}`)
                        .setTitle(`${msg.author.username} продал(а) ${args} ресурс(а,ов)`)
                        .setDescription(`>>> **Осталось: ${userres}**`)
                        .setTimestamp(Date.now())
                        .setFooter(`${msg.author.tag}`);
                    msg.channel.send(embed);
                }
                else {
                    usermoney = usermoney + args * standartmoneyfactor;
                    userres = userres - args;
                    const data = {
                        money: usermoney,
                        job: `${userjob}`,
                        jobjoincd: userjoincd,
                        workcd: userworkcd,
                        resuser: userres,
                    };
                    fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`, JSON.stringify(data));
                    embed = new Discord.MessageEmbed()
                        .setColor(`${rolecolor}`)
                        .setTitle(`${msg.author.username} продал(а) ${args} ресурс(а,ов)`)
                        .setDescription(`>>> **Осталось: ${userres}**`)
                        .setTimestamp(Date.now())
                        .setFooter(`${msg.author.tag}`);
                    msg.channel.send(embed);
                }
            }
        }
        else {
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`${msg.author.username} ${args} не является числом`)
                .setDescription(">>> **Что бы продать определённое количество ресурсов напишите `!sell число`**")
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`);
            msg.channel.send(embed);
        }
    }
}

function work(robot, msg, args, userID, serverID, msgdate, rolecolor) {
    if (!msg.guild) return;
    args = msg.content.split(' ');
    args.shift();
    args = args.join(' ');
    try {
        fs.accessSync(`./serversdata/${serverID}`, fs.constants.F_OK)
    } catch (err) {
        fs.mkdirSync(`./serversdata/${serverID}`)
        fs.mkdirSync(`./serversdata/${serverID}/usersdata`)
        fs.mkdirSync(`./serversdata/${serverID}/usersdata/${userID}`)
    }
    try {
        fs.accessSync(`./serversdata/${serverID}/usersdata`, fs.constants.F_OK)
    } catch (err) {
        fs.mkdirSync(`./serversdata/${serverID}/usersdata`)
    }
    try {
        fs.accessSync(`./serversdata/${serverID}/usersdata/${userID}`, fs.constants.F_OK)
    } catch (err) {
        fs.mkdirSync(`./serversdata/${serverID}/usersdata/${userID}`)
    }
    try {
        fs.statSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`)
    } catch (err) {
        const inventory = {
            slot1: `Пусто`,
            slot2: `Пусто`,
            slot3: `Пусто`,
            slot4: `Пусто`,
            slot5: `Пусто`,
            slot6: `Пусто`,
            slot7: `Пусто`,
            slot8: `Пусто`,
            slot9: `Пусто`,
        }
        fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
    }
    try {
        fs.statSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`)
    } catch (err) {
        const equip = {
            slot1: `Пусто`,
            slot2: `Пусто`,
            slot3: `Пусто`,
            slot4: `Пусто`,
            slot5: `Пусто`,
        }
        fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`, JSON.stringify(equip));
    }
    try {
        fs.statSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`)
    } catch (err) {
        const data = {
            money: 300,
            job: `Безработный`,
            jobjoincd: 0,
            workcd: 0,
            resuser: 0,
        };
        fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`, JSON.stringify(data));
    }
    setTimeout(() => msg.delete(), 1000);
    const user = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`));
    let userjob = user.job;
    let usermoney = user.money;
    let userjoincd = user.jobjoincd;
    let userworkcd = user.workcd;
    let userres = user.resuser;
    let msgdateparce = msgdate.valueOf();
    let userworkcdparce = Date.parse(userworkcd);
    let time = msgdateparce - userworkcdparce;
    if (userjob === `Безработный`) {
        embed = new Discord.MessageEmbed()
            .setColor(`${rolecolor}`)
            .setTitle(`${msg.author.username} у вас нет работы`)
            .setDescription(">>> **Напишите `!jobjoin` что бы узнать больше**")
            .setTimestamp(Date.now())
            .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
        msg.channel.send(embed);
    }
    else {
        if (time >= 120000) {
            var RandElement = worked[Math.floor(Math.random() * (worked.length))];
            userres += RandElement;
            const data = {
                money: usermoney,
                job: `${userjob}`,
                jobjoincd: userjoincd,
                workcd: msgdate,
                resuser: userres,
            };
            fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`, JSON.stringify(data));
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`${msg.author.username} получил(а) ${RandElement} ресурс(а,ов)`)
                .setDescription(`>>> **Всего: ${userres}**`)
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
        }
        else {
            let tempvar = new Date(time);
            let timeminutes = tempvar.getMinutes();
            let timeseconds = tempvar.getSeconds();
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`${msg.author.username} нельзя работать так часто`)
                .setDescription(`>>> **Прошло ${timeminutes}:${timeseconds} из 2:00 минут**`)
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
        }
    }
}

function jobjoin(robot, msg, args, userID, serverID, msgdate, rolecolor) {
    if (!msg.guild) return;
    args = msg.content.toLowerCase().split(' ');
    args.shift();
    args = args.join(' ');
    try {
        fs.accessSync(`./serversdata/${serverID}`, fs.constants.F_OK)
    } catch (err) {
        fs.mkdirSync(`./serversdata/${serverID}`)
        fs.mkdirSync(`./serversdata/${serverID}/usersdata`)
        fs.mkdirSync(`./serversdata/${serverID}/usersdata/${userID}`)
    }
    try {
        fs.accessSync(`./serversdata/${serverID}/usersdata`, fs.constants.F_OK)
    } catch (err) {
        fs.mkdirSync(`./serversdata/${serverID}/usersdata`)
    }
    try {
        fs.accessSync(`./serversdata/${serverID}/usersdata/${userID}`, fs.constants.F_OK)
    } catch (err) {
        fs.mkdirSync(`./serversdata/${serverID}/usersdata/${userID}`)
    }
    try {
        fs.statSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`)
    } catch (err) {
        const inventory = {
            slot1: `Пусто`,
            slot2: `Пусто`,
            slot3: `Пусто`,
            slot4: `Пусто`,
            slot5: `Пусто`,
            slot6: `Пусто`,
            slot7: `Пусто`,
            slot8: `Пусто`,
            slot9: `Пусто`,
        }
        fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
    }
    try {
        fs.statSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`)
    } catch (err) {
        const equip = {
            slot1: `Пусто`,
            slot2: `Пусто`,
            slot3: `Пусто`,
            slot4: `Пусто`,
            slot5: `Пусто`,
        }
        fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`, JSON.stringify(equip));
    }
    try {
        fs.statSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`)
    } catch (err) {
        const data = {
            money: 300,
            job: `Безработный`,
            jobjoincd: 0,
            workcd: 0,
            resuser: 0,
        };
        fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`, JSON.stringify(data));
    }
    setTimeout(() => msg.delete(), 1000);
    if (args === ``) {
        embed = new Discord.MessageEmbed()
            .setColor(`${rolecolor}`)
            .setTitle(`Доступные работы:`)
            .setDescription(">>> **Лесоруб\nШахтёр\nЗемлекоп\n\nЧто бы выбрать работу напишите:** `!jobjoin название работы`\n**(Если вы уже имеете работу то она будет заменена новой)**")
            .setTimestamp(Date.now())
            .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
        msg.channel.send(embed);
    }
    else {
        const userdata = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`));
        let userjob = userdata.job;
        let usermoney = userdata.money;
        let userjoincd = userdata.jobjoincd;
        let userworkcd = userdata.workcd;
        let userres = userdata.resuser;
        let msgdateparce = msgdate.valueOf();
        let userjoincdparce = Date.parse(userjoincd);
        let time = msgdateparce - userjoincdparce;
        if (time >= 120000) {
            if (args === `каменщик`) {
                const data = {
                    money: usermoney,
                    job: `${args}`,
                    jobjoincd: msgdate,
                    workcd: userworkcd,
                    resuser: userres,
                };
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`, JSON.stringify(data));
                embed = new Discord.MessageEmbed()
                    .setColor(`${rolecolor}`)
                    .setTitle(`${msg.author.username} теперь ${args}`)
                    .setTimestamp(Date.now())
                    .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
                msg.channel.send(embed);
            }
            if (args === `лесоруб`) {
                const data = {
                    money: usermoney,
                    job: `${args}`,
                    jobjoincd: msgdate,
                    workcd: userworkcd,
                    resuser: userres,
                };
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`, JSON.stringify(data));
                embed = new Discord.MessageEmbed()
                    .setColor(`${rolecolor}`)
                    .setTitle(`${msg.author.username} теперь ${args}`)
                    .setTimestamp(Date.now())
                    .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
                msg.channel.send(embed);
            }
            if (args === `шахтёр`) {
                const data = {
                    money: usermoney,
                    job: `${args}`,
                    jobjoincd: msgdate,
                    workcd: userworkcd,
                    resuser: userres,
                };
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`, JSON.stringify(data));
                embed = new Discord.MessageEmbed()
                    .setColor(`${rolecolor}`)
                    .setTitle(`${msg.author.username} теперь ${args}`)
                    .setTimestamp(Date.now())
                    .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
                msg.channel.send(embed);
            }
            if (args === `землекоп`) {
                const data = {
                    money: usermoney,
                    job: `${args}`,
                    jobjoincd: msgdate,
                    workcd: userworkcd,
                    resuser: userres,
                };
                fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`, JSON.stringify(data));
                embed = new Discord.MessageEmbed()
                    .setColor(`${rolecolor}`)
                    .setTitle(`${msg.author.username} теперь ${args}`)
                    .setTimestamp(Date.now())
                    .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
                msg.channel.send(embed);
            }
        }
        else {
            let tempvar = new Date(time);
            let timeminutes = tempvar.getMinutes();
            let timeseconds = tempvar.getSeconds();
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setTitle(`${msg.author.username} нельзя менять работу так часто`)
                .setDescription(`>>> **Прошло ${timeminutes}:${timeseconds} из 2:00 минут**`)
                .setTimestamp(Date.now())
                .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
        }
    }
}

function statistic(robot, msg, args, userID, serverID, msgdate, rolecolor) {
    if (!msg.guild) return;
    let i = 1;
    try {
        fs.accessSync(`./serversdata/${serverID}`, fs.constants.F_OK)
    } catch (err) {
        fs.mkdirSync(`./serversdata/${serverID}`)
        fs.mkdirSync(`./serversdata/${serverID}/usersdata`)
        fs.mkdirSync(`./serversdata/${serverID}/usersdata/${userID}`)
    }
    try {
        fs.accessSync(`./serversdata/${serverID}/usersdata`, fs.constants.F_OK)
    } catch (err) {
        fs.mkdirSync(`./serversdata/${serverID}/usersdata`)
    }
    try {
        fs.accessSync(`./serversdata/${serverID}/usersdata/${userID}`, fs.constants.F_OK)
    } catch (err) {
        fs.mkdirSync(`./serversdata/${serverID}/usersdata/${userID}`)
    }
    try {
        fs.statSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`)
    } catch (err) {
        const inventory = {
            slot1: `Пусто`,
            slot2: `Пусто`,
            slot3: `Пусто`,
            slot4: `Пусто`,
            slot5: `Пусто`,
            slot6: `Пусто`,
            slot7: `Пусто`,
            slot8: `Пусто`,
            slot9: `Пусто`,
        }
        fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`, JSON.stringify(inventory));
    }
    try {
        fs.statSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`)
    } catch (err) {
        const equip = {
            slot1: `Пусто`,
            slot2: `Пусто`,
            slot3: `Пусто`,
            slot4: `Пусто`,
            slot5: `Пусто`,
        }
        fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`, JSON.stringify(equip));
    }
    try {
        fs.statSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`)
    } catch (err) {
        const data = {
            money: 300,
            job: `Безработный`,
            jobjoincd: 0,
            workcd: 0,
            resuser: 0,
        };
        fs.writeFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`, JSON.stringify(data));
    }
    const userdata = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/usersdata/${userID}/data.json`));
    const userinventory = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/usersdata/${userID}/inventory.json`));
    const userequip = JSON.parse(fs.readFileSync(`./serversdata/${serverID}/usersdata/${userID}/equip.json`));
    let userjob = userdata.job;
    let usermoney = userdata.money;
    let userjoincd = userdata.jobjoincd;
    let userworkcd = userdata.workcd;
    let userres = userdata.resuser;
    let inventoryslot1 = userinventory.slot1;
    let inventoryslot2 = userinventory.slot2;
    let inventoryslot3 = userinventory.slot3;
    let inventoryslot4 = userinventory.slot4;
    let inventoryslot5 = userinventory.slot5;
    let inventoryslot6 = userinventory.slot6;
    let inventoryslot7 = userinventory.slot7;
    let inventoryslot8 = userinventory.slot8;
    let inventoryslot9 = userinventory.slot9;
    let equipslot1 = userequip.slot1;
    let equipslot2 = userequip.slot2;
    let equipslot3 = userequip.slot3;
    let equipslot4 = userequip.slot4;
    let equipslot5 = userequip.slot5;
    while (i <= 5) {
        if (equipslot1 !== 'Пусто') {
            if (i === 1) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].name;
                    if (item == equipslot1) {
                        itemprice = itemslist[item_count].price;
                        itemtype = itemslist[item_count].type;
                        itemname = itemslist[item_count].name;
                        itemdefense = itemslist[item_count].defense;
                        itemdmg = itemslist[item_count].dmg;
                        itemfactor = itemslist[item_count].moneyfactor;
                    }
                }
            }
        }
        else {
            itemprice = 0;
            itemdefense = 0;
            itemdmg = 0;
            itemfactor = 0;
        }
        if (equipslot2 !== 'Пусто') {
            if (i === 2) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].name;
                    if (item == equipslot2) {
                        itemprice2 = itemslist[item_count].price;
                        itemtype2 = itemslist[item_count].type;
                        itemname2 = itemslist[item_count].name;
                        itemdefence2 = itemslist[item_count].defense;
                        itemdmg2 = itemslist[item_count].dmg;
                        itemfactor2 = itemslist[item_count].moneyfactor;
                    }
                }
            }
        }
        else {
            itemprice2 = 0;
            itemdefence2 = 0;
            itemdmg2 = 0;
            itemfactor2 = 0;
        }
        if (equipslot3 !== 'Пусто') {
            if (i === 3) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].name;
                    if (item == equipslot3) {
                        itemprice3 = itemslist[item_count].price;
                        itemtype3 = itemslist[item_count].type;
                        itemname3 = itemslist[item_count].name;
                        itemdefence3 = itemslist[item_count].defense;
                        itemdmg3 = itemslist[item_count].dmg;
                        itemfactor3 = itemslist[item_count].moneyfactor;
                    }
                }
            }
        }
        else {
            itemprice3 = 0;
            itemdefence3 = 0;
            itemdmg3 = 0;
            itemfactor3 = 0;
        }
        if (equipslot4 !== 'Пусто') {
            if (i === 4) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].name;
                    if (item == equipslot4) {
                        itemprice4 = itemslist[item_count].price;
                        itemtype4 = itemslist[item_count].type;
                        itemname4 = itemslist[item_count].name;
                        itemdefence4 = itemslist[item_count].defense;
                        itemdmg4 = itemslist[item_count].dmg;
                        itemfactor4 = itemslist[item_count].moneyfactor;
                    }
                }
            }
        }
        else {
            itemprice4 = 0;
            itemdefence4 = 0;
            itemdmg4 = 0;
            itemfactor4 = 0;
        }
        if (equipslot5 !== 'Пусто') {
            if (i === 5) {
                for (item_count in itemslist) {
                    var item = itemslist[item_count].name;
                    if (item == equipslot5) {
                        itemprice5 = itemslist[item_count].price;
                        itemtype5 = itemslist[item_count].type;
                        itemname5 = itemslist[item_count].name;
                        itemdefence5 = itemslist[item_count].defense;
                        itemdmg5 = itemslist[item_count].dmg;
                        itemfactor5 = itemslist[item_count].moneyfactor;
                    }
                }
            }
        }
        else {
            itemprice5 = 0;
            itemdefence5 = 0;
            itemdmg5 = 0;
            itemfactor5 = 0;
        }
        i++
    }
    setTimeout(() => msg.delete(), 1000);
    embed = new Discord.MessageEmbed()
        .setColor(`${rolecolor}`)
        .setThumbnail(msg.author.avatarURL())
        .setTitle(`Статистика пользователя`)
        .setDescription(`>>> **Профессия: ${userjob}\nДеньги: ${usermoney}\nРесурсы: ${userres}**`)
        .addField(`Одежда:`, `>>> **${equipslot1}\n${equipslot2}\n${equipslot3}\n${equipslot4}**`)
        .addField(`Оружие:`, `>>> **${equipslot5}**`)
        .addField(`Инвентарь:`, `>>> **1: ${inventoryslot1}\n2: ${inventoryslot2}\n3: ${inventoryslot3}\n4: ${inventoryslot4}\n5: ${inventoryslot5}\n6: ${inventoryslot6}\n7: ${inventoryslot7}\n8: ${inventoryslot8}\n9: ${inventoryslot9}**`, true)
        .addField(`Множители:`, `>>> **Деньги: ${standartmoneyfactor = itemfactor += itemfactor2 += itemfactor3 += itemfactor4 += itemfactor5}\nЗащита: ${standartdefensefactor = itemdefense += itemdefence2 += itemdefence3 += itemdefence4 += itemdefence5}\nУрон: ${standartdmgfactor = itemdmg += itemdmg2 += itemdmg3 += itemdmg4 += itemdmg5}**`)
        .setTimestamp(Date.now())
        .setFooter(`${msg.author.tag}`, msg.author.avatarURL());
    msg.channel.send(embed);
}

function hug(robot, msg, args, userID, serverID, msgdate, rolecolor) {
    if (!msg.guild) return;
    setTimeout(() => msg.delete(), 1000);
    if (args === ``) {
        var RandElement = var_hug_gif[Math.floor(Math.random() * (var_hug_gif.length))];
        embed = new Discord.MessageEmbed()
            .setColor(`${rolecolor}`)
            .setDescription(`<@${userID}> **обнял(а)**`)
            .setImage(`${RandElement}`)
        msg.channel.send(embed);
    }
    else {
        if (msg.mentions.members.first() === undefined) {
            var RandElement = var_hug_gif[Math.floor(Math.random() * (var_hug_gif.length))];
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setDescription(`<@${userID}> **обнял(а)**`)
                .setImage(`${RandElement}`)
            msg.channel.send(embed);
        }
        else {
            var RandElement = var_hug_gif[Math.floor(Math.random() * (var_hug_gif.length))];
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setDescription(`<@${userID}> **обнял(а)** ${msg.mentions.members.first()}`)
                .setImage(`${RandElement}`)
            msg.channel.send(embed);
        }
    }
}

function boop(robot, msg, args, userID, serverID, msgdate, rolecolor) {
    if (!msg.guild) return;
    setTimeout(() => msg.delete(), 1000);
    if (args === ``) {
        var RandElement = var_boop_gif[Math.floor(Math.random() * (var_boop_gif.length))];
        embed = new Discord.MessageEmbed()
            .setColor(`${rolecolor}`)
            .setDescription(`<@${userID}> **сделал(а) буп**`)
            .setImage(`${RandElement}`)
        msg.channel.send(embed);
    }
    else {
        if (msg.mentions.members.first() === undefined) {
            var RandElement = var_boop_gif[Math.floor(Math.random() * (var_boop_gif.length))];
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setDescription(`<@${userID}> **сделал(а) буп**`)
                .setImage(`${RandElement}`)
            msg.channel.send(embed);
        }
        else {
            var RandElement = var_boop_gif[Math.floor(Math.random() * (var_boop_gif.length))];
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setDescription(`<@${userID}> **бупнул(а) ** ${msg.mentions.members.first()}`)
                .setImage(`${RandElement}`)
            msg.channel.send(embed);
        }
    }
}

function lick(robot, msg, args, userID, serverID, msgdate, rolecolor) {
    if (!msg.guild) return;
    setTimeout(() => msg.delete(), 1000);
    if (args === ``) {
        var RandElement = var_lick_gif[Math.floor(Math.random() * (var_lick_gif.length))];
        embed = new Discord.MessageEmbed()
            .setColor(`${rolecolor}`)
            .setDescription(`<@${userID}> **сделал(а) лизь**`)
            .setImage(`${RandElement}`)
        msg.channel.send(embed);
    }
    else {
        if (msg.mentions.members.first() === undefined) {
            var RandElement = var_lick_gif[Math.floor(Math.random() * (var_lick_gif.length))];
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setDescription(`<@${userID}> **сделал(а) лизь**`)
                .setImage(`${RandElement}`)
            msg.channel.send(embed);
        }
        else {
            var RandElement = var_lick_gif[Math.floor(Math.random() * (var_lick_gif.length))];
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setDescription(`<@${userID}> **лизнул(а)** ${msg.mentions.members.first()}`)
                .setImage(`${RandElement}`)
            msg.channel.send(embed);
        }
    }
}

function eee(robot, msg, args, userID, serverID, msgdate, rolecolor) {
    if (!msg.guild) return;
    setTimeout(() => msg.delete(), 1000);
    if (args === ``) {
        var RandElement = var_eee_gif[Math.floor(Math.random() * (var_eee_gif.length))];
        embed = new Discord.MessageEmbed()
            .setColor(`${rolecolor}`)
            .setDescription(`<@${userID}> **запищал(а)**`)
            .setImage(`${RandElement}`)
        msg.channel.send(embed);
    }
    else {
        if (msg.mentions.members.first() === undefined) {
            var RandElement = var_eee_gif[Math.floor(Math.random() * (var_eee_gif.length))];
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setDescription(`<@${userID}> **запищал(а)**`)
                .setImage(`${RandElement}`)
            msg.channel.send(embed);
        }
        else {
            var RandElement = var_eee_gif[Math.floor(Math.random() * (var_eee_gif.length))];
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setDescription(`<@${userID}> **запищал(а) на** ${msg.mentions.members.first()}`)
                .setImage(`${RandElement}`)
            msg.channel.send(embed);
        }
    }
}

function bite(robot, msg, args, userID, serverID, msgdate, rolecolor) {
    if (!msg.guild) return;
    setTimeout(() => msg.delete(), 1000);
    if (args === ``) {
        var RandElement = var_bite_gif[Math.floor(Math.random() * (var_bite_gif.length))];
        embed = new Discord.MessageEmbed()
            .setColor(`${rolecolor}`)
            .setDescription(`<@${userID}> **сделал(а) кусь**`)
            .setImage(`${RandElement}`)
        msg.channel.send(embed);
    }
    else {
        if (msg.mentions.members.first() === undefined) {
            var RandElement = var_bite_gif[Math.floor(Math.random() * (var_bite_gif.length))];
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setDescription(`<@${userID}> **сделал(а) кусь**`)
                .setImage(`${RandElement}`)
            msg.channel.send(embed);
        }
        else {
            var RandElement = var_bite_gif[Math.floor(Math.random() * (var_bite_gif.length))];
            embed = new Discord.MessageEmbed()
                .setColor(`${rolecolor}`)
                .setDescription(`<@${userID}> **сделал(а) кусь** ${msg.mentions.members.first()}`)
                .setImage(`${RandElement}`)
            msg.channel.send(embed);
        }
    }
}

// Список команд //

var comms_list = [
    {
        name: 'test',
        out: test,
        about: "Тестовая команда"
    },
    {
        name: 'shop',
        out: shop,
        about: "Магазин предметов"
    },
    {
        name: 'additem',
        out: additem,
        about: "Добавить предмет"
    },
    {
        name: 'equipitem',
        out: equipitem,
        about: "Одеть предмет"
    },
    {
        name: 'sellitem',
        out: sellitem,
        about: "Продать предмет"
    },
    {
        name: 'buyitem',
        out: buyitem,
        about: "Купить из магазина"
    },
    {
        name: 'bite',
        out: bite,
        about: "Укусить пользователя"
    },
    {
        name: 'hug',
        out: hug,
        about: "Обнять пользователя"
    },
    {
        name: 'boop',
        out: boop,
        about: "Бупнуть пользователя"
    },
    {
        name: 'lick',
        out: lick,
        about: "Лизнуть пользователя"
    },
    {
        name: 'eee',
        out: eee,
        about: "Пищать на пользователя"
    },
    {
        name: 'sell',
        out: sell,
        about: "Команда для продажи ресурсов"
    },
    {
        name: 'help',
        out: help,
        about: "Список команд"
    },
    {
        name: 'work',
        out: work,
        about: "Работать"
    },
    {
        name: 'jobjoin',
        out: jobjoin,
        about: "Получить работу"
    },
    {
        name: 'statistic',
        out: statistic,
        about: "Узнать свою статистику"
    },
];

// Name - название команды, на которую будет реагировать бот
// Out - название функции с командой
// About - описание команды 

module.exports.comms = comms_list;