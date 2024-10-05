const config = require('./config.json'); // Подключаем файл с параметрами и информацией
const Discord = require('discord.js'); // Подключаем библиотеку discord.js
const fs = require('fs'); // Подключаем родной модуль файловой системы node.js 
const rimraf = require('rimraf');
const prefix = config.prefix; // «Вытаскиваем» префикс

var var_random_info = [
    `**Булочка**`, `**Милаха**`, `**Съел все печеньки**`, `**Любит чай с молоком**`, `**Прячется на шкафу**`,
    `**Скромняга**`
]
var var_boop_gif = [
];
var var_lick_gif = [
];
var var_eee_gif = [
]
var var_hug_gif = [
]
var error_gif_bot = []

var alph = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`, `V`, `W`, `X`, `Y`, `Z`]

var numb = [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`]

var worked = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30]

// Команды //

function test(robot, msg, args, userID) {
    date = Date.now();
    Date.parse(date);
    console.log(date);
}

function work(robot, msg, args, userID) {
    if (!msg.guild) return;
    args = msg.content.split(' ');
    args.shift();
    args = args.join(' ');
    const server = msg.guild.id;
    fs.access(`./serversdata/${server}`, function (err, stats) {
        if (err) {
            fs.mkdirSync(`./serversdata/${server}`)
        }
        else {
            fs.access(`./serversdata/${server}/usersjob`, function (err, stats) {
                if (err) {
                    fs.mkdirSync(`./serversdata/${server}/usersjob`)
                }
                else {
                    fs.stat(`./serversdata/${server}/usersjob/${userID}.json`, function (err, stats) {
                        if (err) {
                            const data = {
                                job: `Безработный`,
                                jobjoincd: 0,
                                workcd: 0,
                                resuser: 0,
                            };
                            fs.writeFileSync(`./serversdata/${server}/usersjob/${userID}.json`, JSON.stringify(data));
                            msg.delete().catch();
                            if (args === ``) {
                                msg.channel.send('**Вы не имеете работы!**', {
                                    embed: {
                                        color: `FAA81A`,
                                        title: "Доступные работы:",
                                        description: '**Лесоруб**\n**Шахтёр**\n**Землекоп**\n\n**Что бы выбрать работу напишите:** !jobjoin название работы\n**(Если вы уже имеете работу то она будет заменена новой)**',
                                    }
                                });
                            }
                        }
                        else {
                            msg.delete().catch();
                            if (args === ``) {
                                const userjob = require(`./serversdata/${server}/usersjob/${userID}.json`);
                                let userjob2 = userjob.job; // «Вытаскиваем» из него префикс
                                const userjoincd = require(`./serversdata/${server}/usersjob/${userID}.json`);
                                let userjoincd2 = userjoincd.jobjoincd; // «Вытаскиваем» из него префикс
                                const userworkcd = require(`./serversdata/${server}/usersjob/${userID}.json`);
                                let userworkcd2 = userworkcd.workcd; // «Вытаскиваем» из него префикс
                                const res = require(`./serversdata/${server}/usersjob/${userID}.json`);
                                let resuser2 = res.resuser; // «Вытаскиваем» из него префикс
                                newdate = Date.now();
                                Date.parse(newdate);
                                date = newdate - userworkcd2;
                                if (date > 120000) {
                                    var RandElement = worked[Math.floor(Math.random() * (worked.length))];
                                    resuser2 = resuser2 + RandElement;
                                    const data = {
                                        job: `${userjob2}`,
                                        jobjoincd: `${userjoincd2}`,
                                        workcd: `${newdate}`,
                                        resuser: `${resuser2}`,
                                    }
                                    fs.writeFileSync(`./serversdata/${server}/usersjob/${userID}.json`, JSON.stringify(data));
                                    msg.channel.send(`**<@${userID}> Получил**(**а**) **${RandElement} предмет**(**а,ов**) **своей профессии** (**Всего: ${resuser2}**)`);
                                }
                                else {
                                    msg.channel.send(`**<@${userID}> Нельзя работать так часто!**`);
                                }
                            }
                        }
                    });
                }
            });
        }
    });
}

function jobjoin(robot, msg, args, userID) {
    if (!msg.guild) return;
    args = msg.content.toLowerCase().split(' ');
    args.shift();
    args = args.join(' ');
    const server = msg.guild.id;
    fs.access(`./serversdata/${server}`, function (err, stats) {
        if (err) {
            fs.mkdirSync(`./serversdata/${server}`)
        }
        else {
            fs.access(`./serversdata/${server}/usersjob`, function (err, stats) {
                if (err) {
                    fs.mkdirSync(`./serversdata/${server}/usersjob`)
                }
                else {
                    fs.stat(`./serversdata/${server}/usersjob/${userID}.json`, function (err, stats) {
                        if (err) {
                            const data = {
                                job: `Безработный`,
                                jobjoincd: 0,
                                workcd: 0,
                                resuser: 0,
                            };
                            fs.writeFileSync(`./serversdata/${server}/usersjob/${userID}.json`, JSON.stringify(data));
                            const userjob = require(`./serversdata/${server}/usersjob/${userID}.json`);
                            let userjob2 = userjob.job; // «Вытаскиваем» из него префикс
                            msg.delete().catch();
                            if (args === ``) {
                                msg.channel.send({
                                    embed: {
                                        color: `FAA81A`,
                                        title: "Доступные работы:",
                                        description: '**Лесоруб**\n**Шахтёр**\n**Землекоп**\n\n**Что бы выбрать работу напишите:** !jobjoin название работы\n**(Если вы уже имеете работу то она будет заменена новой)**',
                                    }
                                });
                            }
                            if (args === `лесоруб`) {
                                newdate = Date.now();
                                Date.parse(newdate);
                                const data = {
                                    job: `Лесоруб`,
                                    jobjoincd: `${newdate}`,
                                    workcd: 0,
                                };
                                fs.writeFileSync(`./serversdata/${server}/usersjob/${userID}.json`, JSON.stringify(data));
                                msg.channel.send(`**<@${userID}> Теперь лесоруб**`);
                            }
                            if (args === `шахтёр`) {
                                newdate = Date.now();
                                Date.parse(newdate);
                                const data = {
                                    job: `Шахтёр`,
                                    jobjoincd: `${newdate}`,
                                    workcd: 0,
                                };
                                fs.writeFileSync(`./serversdata/${server}/usersjob/${userID}.json`, JSON.stringify(data));
                                msg.channel.send(`**<@${userID}> Теперь шахтёр**`);
                            }
                            if (args === `землекоп`) {
                                newdate = Date.now();
                                Date.parse(newdate);
                                const data = {
                                    job: `Землекоп`,
                                    jobjoincd: `${newdate}`,
                                    workcd: 0,
                                };
                                fs.writeFileSync(`./serversdata/${server}/usersjob/${userID}.json`, JSON.stringify(data));
                                msg.channel.send(`**<@${userID}> Теперь землекоп**`);
                            }
                        }
                        else {
                            msg.delete().catch();
                            const userjob = require(`./serversdata/${server}/usersjob/${userID}.json`);
                            let userjob2 = userjob.job; // «Вытаскиваем» из него префикс
                            const userjoincd = require(`./serversdata/${server}/usersjob/${userID}.json`);
                            let userjoincd2 = userjoincd.jobjoincd; // «Вытаскиваем» из него префикс
                            const userworkcd = require(`./serversdata/${server}/usersjob/${userID}.json`);
                            let userworkcd2 = userworkcd.workcd; // «Вытаскиваем» из него префикс
                            newdate = Date.now();
                            Date.parse(newdate);
                            date = newdate - userjoincd2;
                            if (date > 120000) {
                                if (args === ``) {
                                    msg.channel.send({
                                        embed: {
                                            color: `FAA81A`,
                                            title: "Доступные работы:",
                                            description: '**Лесоруб**\n**Шахтёр**\n**Землекоп**\n\n**Что бы выбрать работу напишите:** !jobjoin название работы\n**(Если вы уже имеете работу то она будет заменена новой)**',
                                        }
                                    });
                                }
                                if (args === `лесоруб`) {
                                    const data = {
                                        job: `Лесоруб`,
                                        jobjoincd: `${newdate}`,
                                        workcd: `${userworkcd2}`,
                                    };
                                    fs.writeFileSync(`./serversdata/${server}/usersjob/${userID}.json`, JSON.stringify(data));
                                    msg.channel.send(`**<@${userID}> Теперь лесоруб**`);
                                }
                                if (args === `шахтёр`) {
                                    const data = {
                                        job: `Шахтёр`,
                                        jobjoincd: `${newdate}`,
                                        workcd: `${userworkcd2}`,
                                    };
                                    fs.writeFileSync(`./serversdata/${server}/usersjob/${userID}.json`, JSON.stringify(data));
                                    msg.channel.send(`**<@${userID}> Теперь шахтёр**`);
                                }
                                if (args === `землекоп`) {
                                    const data = {
                                        job: `Землекоп`,
                                        jobjoincd: `${newdate}`,
                                        workcd: `${userworkcd2}`,
                                    };
                                    fs.writeFileSync(`./serversdata/${server}/usersjob/${userID}.json`, JSON.stringify(data));
                                    msg.channel.send(`**<@${userID}> Теперь землекоп**`);
                                }
                            }
                            else {
                                msg.channel.send(`**<@${userID}> Нельзя менять работу так часто!**`);
                            }
                        }
                    });
                }
            });
        }
    });
}

function jobinfo(robot, msg, args, userID) {
    if (!msg.guild) return;
    const server = msg.guild.id;
    fs.access(`./serversdata/${server}`, function (err, stats) {
        if (err) {
            fs.mkdirSync(`./serversdata/${server}`)
        }
        else {
            fs.access(`./serversdata/${server}/usersjob`, function (err, stats) {
                if (err) {
                    fs.mkdirSync(`./serversdata/${server}/usersjob`)
                }
                else {
                    fs.stat(`./serversdata/${server}/usersjob/${userID}.json`, function (err, stats) {
                        if (err) {
                            const data = {
                                job: `Безработный`,
                                jobjoincd: 0,
                                workcd: 0,
                                resuser: 0,
                            };
                            fs.writeFileSync(`./serversdata/${server}/usersjob/${userID}.json`, JSON.stringify(data));
                            const userjob = require(`./serversdata/${server}/usersjob/${userID}.json`);
                            let userjob2 = userjob.job; // «Вытаскиваем» из него префикс
                            msg.delete().catch();
                            msg.channel.send(`**<@${userID}> Твоя профессия: ${userjob2}**`);
                        }
                        else {
                            const userjob = require(`./serversdata/${server}/usersjob/${userID}.json`);
                            let userjob2 = userjob.job; // «Вытаскиваем» из него префикс
                            msg.delete().catch();
                            msg.channel.send(`**<@${userID}> Твоя профессия: ${userjob2}**`);
                        }
                    });
                }
            });
        }
    });
}

function money(robot, msg, args, userID) {
    if (!msg.guild) return;
    const server = msg.guild.id;
    fs.access(`./serversdata/${server}`, function (err, stats) {
        if (err) {
            fs.mkdirSync(`./serversdata/${server}`)
        }
        else {
            fs.access(`./serversdata/${server}/usersmoney`, function (err, stats) {
                if (err) {
                    fs.mkdirSync(`./serversdata/${server}/usersmoney`)
                }
                else {
                    fs.stat(`./serversdata/${server}/usersmoney/${userID}.json`, function (err, stats) {
                        if (err) {
                            const data = {
                                money: 300,
                            };
                            fs.writeFileSync(`./serversdata/${server}/usersmoney/${userID}.json`, JSON.stringify(data));
                            const usermoney = require(`./serversdata/${server}/usersmoney/${userID}.json`);
                            let usermoney2 = usermoney.money; // «Вытаскиваем» из него префикс
                            msg.delete().catch();
                            msg.channel.send(`**<@${userID}> На твоём балансе: ${usermoney2} битс**(**ов**)`);
                        }
                        else {
                            const usermoney = require(`./serversdata/${server}/usersmoney/${userID}.json`);
                            let usermoney2 = usermoney.money; // «Вытаскиваем» из него префикс
                            msg.delete().catch();
                            msg.channel.send(`**<@${userID}> На твоём балансе: ${usermoney2} битс**(**ов**)`);
                        }
                    });
                }
            });
        }
    });
}

function reganonchat(robot, msg, args, userID) { // функция регистрация анон чата
    if (!msg.guild) return;
    if (msg.member.hasPermission('ADMINISTRATOR')) {
        const server = msg.guild.id;
        const channel = msg.channel.id
        fs.access(`./serversdata/${server}`, function (err, stats) {
            if (err) {
                fs.mkdirSync(`./serversdata/${server}`)
                fs.mkdirSync(`./serversdata/${server}/${channel}`)
                msg.channel.send(`**<@${userID}> Сервер зарегистрирован. Что бы отправить анонимное сообщение на этот сервер напишите боту в лс:** !anon ${server} ваше сообщение.`);
            }
            else {
                rimraf.sync(`./serversdata/${server}`)
                fs.mkdirSync(`./serversdata/${server}`)
                fs.mkdirSync(`./serversdata/${server}/${channel}`)
                msg.channel.send(`**<@${userID}> Канал перезаписан. Что бы отправить анонимное сообщение на этот сервер напишите боту в лс:** !anon ${server} ваше сообщение.`);
            }
        });
    }
    else {
        msg.channel.send(`**<@${userID}> Для этой команды нужны права администратора.**`);
    }
}

function anon(robot, msg, args, userID) { // функция aнон
    if (!msg.guild) {
        args_text = msg.content.split(" ")
        args_text.shift()
        is_mark = false
        text = []
        for (let part of args_text) {
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
        arg1 = args_text[0]
        args_text.shift();
        args_mes = args_text.join(' ');
        const folderpath = `./serversdata/${arg1}/`
        fs.stat(folderpath, function (err, stats) {
            if (err) {
                msg.channel.send('Анонимный чат не зарегистрирован');
            }
            else {
                fs.readdirSync(folderpath).forEach(channel => {
                    fs.stat(`./serversdata/${arg1}/${channel}/${userID}.json`, function (err, stats) {
                        if (err) {
                            var Randalph1 = alph[Math.floor(Math.random() * (alph.length))];
                            var Randalph2 = alph[Math.floor(Math.random() * (alph.length))];
                            var Randalph3 = alph[Math.floor(Math.random() * (alph.length))];
                            var Randalph4 = alph[Math.floor(Math.random() * (alph.length))];
                            var Randnumb5 = numb[Math.floor(Math.random() * (numb.length))];
                            var Randnumb6 = numb[Math.floor(Math.random() * (numb.length))];
                            var Randnumb7 = numb[Math.floor(Math.random() * (numb.length))];
                            var Randnumb8 = numb[Math.floor(Math.random() * (numb.length))];
                            const randnick = `${Randalph1 + Randalph2 + Randalph3 + Randalph4 + Randnumb5 + Randnumb6 + Randnumb7 + Randnumb8}`;
                            const data = {
                                anonnick: `${randnick}`,
                            };
                            fs.writeFileSync(`./serversdata/${arg1}/${channel}/${userID}.json`, JSON.stringify(data));
                            const nick = require(`./serversdata/${arg1}/${channel}/${userID}.json`);
                            let anonnick = nick.anonnick; // «Вытаскиваем» из него префикс
                            const server = robot.guilds.cache.get(`${arg1}`);
                            const channel2 = server.channels.cache.get(`${channel}`);
                            channel2.send(`**${anonnick}:**  ${args_mes}`);
                            msg.channel.send('Отправлено. Пользователь зарегистрирован.');
                        }
                        else {
                            const nick = require(`./serversdata/${arg1}/${channel}/${userID}.json`);
                            let anonnick = nick.anonnick; // «Вытаскиваем» из него префикс
                            const server = robot.guilds.cache.get(`${arg1}`);
                            const channel2 = server.channels.cache.get(`${channel}`);
                            channel2.send(`**${anonnick}:**  ${args_mes}`);
                            msg.channel.send('Отправлено');
                        }
                    });
                });
            }
        });
    }
}

function help(robot, msg, args, userID) { // функция хелп
    if (!msg.guild) return;
    msg.delete().catch();
    msg.channel.send({
        embed: {
            color: `00FF0A`,
            title: "Команды:",
            description: '**!Help(Хелп)** - **Показывает все команды.**\n**!Boop(Буп)** @user - **Делает буп пользователю.**\n**!Lick(Лизь)** @user - **Делает лизь пользователю.**\n**!Eee(Еее)** @user - **Пищит на пользователя.**\n**!Hug(Обнять)** @user - **Обнять пользователя.**\n**!Randinfo(Рандинфо)** @user - **Рандомная информация о пользователе.**\n**!RegAnonChat** - **Зарегистрирует канал как анонимный чат**\n**!Anon(A, Ф)** ServerID сообщение боту в лс - **Отправит ваше сообщение от имени бота в анонимный чат.**\n\n**!Play(Играть)** ссылка на видео ютуб - **Подключает бота к голосовому каналу и включает музыку**\n**!Pause(Пауза)** - **Останавливает воспроизведение музыки**\n**!Leave(Выйти)** - **Отключает бота от голосового канала и выключает музыку**\n**!Playfile(Игратьфайл)** путь к файлу - **Включает выбранный файл. (Доступно только создателю)**',
        }
    });
}

function randominfo(robot, msg, args, userID) { // функция рандом инфо
    if (!msg.guild) return;
    args = msg.content.split(' ');
    args.shift();
    args = args.join(' ');
    if (args.indexOf('@') > -1) {
        if (args === '@') {
            msg.channel.send({
                embed: {
                    color: `FAA81A`,
                    title: `Error`,
                    image: {
                        url: `${error_gif_bot}`
                    }
                }
            });
        }
        else {
            msg.delete().catch();
            var RandElement = var_random_info[Math.floor(Math.random() * (var_random_info.length))];
            msg.channel.send(`${args} ${RandElement}`)
        }
    }
    else {
        if (args === ``) {
            msg.delete().catch();
            msg.channel.send({
                embed: {
                    color: `FAA81A`,
                    title: `Unknown user`,
                    image: {
                        url: `${error_gif_bot}`
                    }
                }
            });
        }
    }
}

function sex(robot, msg, args, userID) { // функция секс
    if (!msg.guild) return;
    args = msg.content.split(' ');
    args.shift();
    args = args.join(' ');
    if (args.indexOf('@') > -1) {
        if (args === '@') {
            msg.channel.send({
                embed: {
                    color: `FAA81A`,
                    title: `Error`,
                    image: {
                        url: `${error_gif_bot}`
                    }
                }
            });
        }
        else {
            msg.delete().catch();
            var RandElement = var_hug_gif[Math.floor(Math.random() * (var_hug_gif.length))];
            msg.channel.send(`<@${userID}> **ебёт** ${args}`);
        }
    }
    else {
        if (args === ``) {
            msg.delete().catch();
            var RandElement = var_hug_gif[Math.floor(Math.random() * (var_hug_gif.length))];
            msg.channel.send(`<@${userID}> **выебал**(**а**) **меня :3**`);
        }
        else {
            msg.delete().catch();
            msg.channel.send({
                embed: {
                    color: `FAA81A`,
                    title: `Unknown user`,
                    image: {
                        url: `${error_gif_bot}`
                    }
                }
            });
        }
    }
}

function hug(robot, msg, args, userID) { // функция обнять
    if (!msg.guild) return;
    args = msg.content.split(' ');
    args.shift();
    args = args.join(' ');
    if (args.indexOf('@') > -1) {
        if (args === '@') {
            msg.channel.send({
                embed: {
                    color: `FAA81A`,
                    title: `Error`,
                    image: {
                        url: `${error_gif_bot}`
                    }
                }
            });
        }
        else {
            msg.delete().catch();
            var RandElement = var_hug_gif[Math.floor(Math.random() * (var_hug_gif.length))];
            msg.channel.send(`<@${userID}> **обнял**(**а**) ${args}`, {
                embed: {
                    color: `FAA81A`,
                    image: {
                        url: `${RandElement}`
                    }
                }
            });
        }
    }
    else {
        if (args === ``) {
            msg.delete().catch();
            var RandElement = var_hug_gif[Math.floor(Math.random() * (var_hug_gif.length))];
            msg.channel.send(`<@${userID}> **обнял**(**а**) **меня :3**`, {
                embed: {
                    color: `FAA81A`,
                    image: {
                        url: `${RandElement}`
                    }
                }
            });
        }
        else {
            msg.delete().catch();
            msg.channel.send({
                embed: {
                    color: `FAA81A`,
                    title: `Unknown user`,
                    image: {
                        url: `${error_gif_bot}`
                    }
                }
            });
        }
    }
}

function boop(robot, msg, args, userID) { // функция буп
    if (!msg.guild) return;
    args = msg.content.split(' ');
    args.shift();
    args = args.join(' ');
    if (args.indexOf('@') > -1) {
        if (args === '@') {
            msg.channel.send({
                embed: {
                    color: `FAA81A`,
                    title: `Error`,
                    image: {
                        url: `${error_gif_bot}`
                    }
                }
            });
        }
        else {
            msg.delete().catch();
            var RandElement = var_boop_gif[Math.floor(Math.random() * (var_boop_gif.length))];
            msg.channel.send(`<@${userID}> **сделал**(**а**) **буп** ${args}`, {
                embed: {
                    color: `FAA81A`,
                    image: {
                        url: `${RandElement}`
                    }
                }
            });
        }
    }
    else {
        if (args === ``) {
            msg.delete().catch();
            var RandElement = var_boop_gif[Math.floor(Math.random() * (var_boop_gif.length))];
            msg.channel.send(`<@${userID}> **сделал**(**а**) **мне буп :3**`, {
                embed: {
                    color: `FAA81A`,
                    image: {
                        url: `${RandElement}`
                    }
                }
            });
        }
        else {
            msg.delete().catch();
            msg.channel.send({
                embed: {
                    color: `FAA81A`,
                    title: `Unknown user`,
                    image: {
                        url: `${error_gif_bot}`
                    }
                }
            });
        }
    }
}

function lick(robot, msg, args, userID) { // функция лизь
    if (!msg.guild) return;
    args = msg.content.split(' ');
    args.shift();
    args = args.join(' ');
    if (args.indexOf('@') > -1) {
        if (args === '@') {
            msg.channel.send({
                embed: {
                    color: `FAA81A`,
                    title: `Error`,
                    image: {
                        url: `${error_gif_bot}`
                    }
                }
            });
        }
        else {
            msg.delete().catch();
            var RandElement = var_lick_gif[Math.floor(Math.random() * (var_lick_gif.length))];
            msg.channel.send(`<@${userID}> **лизнул**(**а**) ${args}`, {
                embed: {
                    color: `FAA81A`,
                    image: {
                        url: `${RandElement}`
                    }
                }
            });
        }
    }
    else {
        if (args === ``) {
            msg.delete().catch();
            var RandElement = var_lick_gif[Math.floor(Math.random() * (var_lick_gif.length))];
            msg.channel.send(`<@${userID}> **лизнул**(**а**) **меня :3**`, {
                embed: {
                    color: `FAA81A`,
                    image: {
                        url: `${RandElement}`
                    }
                }
            });
        }
        else {
            msg.delete().catch();
            msg.channel.send({
                embed: {
                    color: `FAA81A`,
                    title: `Unknown user`,
                    image: {
                        url: `${error_gif_bot}`
                    }
                }
            });
        }
    }
}

function eee(robot, msg, args, userID) { // функция ЕЕЕ
    if (!msg.guild) return;
    args = msg.content.split(' ');
    args.shift();
    args = args.join(' ');
    if (args.indexOf('@') > -1) {
        if (args === '@') {
            msg.channel.send({
                embed: {
                    color: `FAA81A`,
                    title: `Error`,
                    image: {
                        url: `${error_gif_bot}`
                    }
                }
            });
        }
        else {
            msg.delete().catch();
            var RandElement = var_eee_gif[Math.floor(Math.random() * (var_eee_gif.length))];
            msg.channel.send(`<@${userID}> **запищал**(**а**) **на** ${args}`, {
                embed: {
                    color: `FAA81A`,
                    image: {
                        url: `${RandElement}`
                    }
                }
            });
        }
    }
    else {
        if (args === ``) {
            msg.delete().catch();
            var RandElement = var_eee_gif[Math.floor(Math.random() * (var_eee_gif.length))];
            msg.channel.send(`<@${userID}> **EEEEEEEe~ :3**`, {
                embed: {
                    color: `FAA81A`,
                    image: {
                        url: `${RandElement}`
                    }
                }
            });
        }
        else {
            msg.delete().catch();
            msg.channel.send({
                embed: {
                    color: `FAA81A`,
                    title: `Unknown user`,
                    image: {
                        url: `${error_gif_bot}`
                    }
                }
            });
        }
    }
}

// Список команд //

var comms_list = [
    {
        name: 'test',
        out: test,
        about: "test"
    },
    {
        name: 'work',
        out: work,
        about: "work"
    },
    {
        name: 'jobjoin',
        out: jobjoin,
        about: "jobjoin"
    },
    {
        name: 'jobinfo',
        out: jobinfo,
        about: "jobinfo"
    },
    {
        name: 'money',
        out: money,
        about: "money"
    },
    {
        name: 'sex',
        out: sex,
        about: "sex"
    },
    {
        name: 'reganonchat',
        out: reganonchat,
        about: "reganonchat"
    },
    {
        name: 'ф',
        out: anon,
        about: "anon"
    },
    {
        name: 'a',
        out: anon,
        about: "anon"
    },
    {
        name: 'anon',
        out: anon,
        about: "anon"
    },
    {
        name: 'рандинфо',
        out: randominfo,
        about: "Рандинфо"
    },
    {
        name: 'randinfo',
        out: randominfo,
        about: "randinfo"
    },
    {
        name: 'hug',
        out: hug,
        about: "hug"
    },
    {
        name: 'обнять',
        out: hug,
        about: "обнять"
    },
    {
        name: 'boop',
        out: boop,
        about: "boop"
    },
    {
        name: 'буп',
        out: boop,
        about: "буп"
    },
    {
        name: 'help',
        out: help,
        about: "help"
    },
    {
        name: 'хелп',
        out: help,
        about: "хелп"
    },
    {
        name: 'lick',
        out: lick,
        about: "lick"
    },
    {
        name: 'лизь',
        out: lick,
        about: "лизь"
    },
    {
        name: 'eee',
        out: eee,
        about: "e англ"
    },
    {
        name: 'еее',
        out: eee,
        about: "е рус"
    },
];

// Name - название команды, на которую будет реагировать бот
// Out - название функции с командой
// About - описание команды 

module.exports.comms = comms_list;