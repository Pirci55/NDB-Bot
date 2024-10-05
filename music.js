const Discord = require('discord.js'); // Подключаем библиотеку discord.js
const config = require('./config.json'); // Подключаем файл с параметрами и информацией
const fs = require('fs');
const ytdl = require('ytdl-core');
var glob = require("glob")
let playlist = [];
items = undefined;

async function play(robot, msg, args, userID) {
    if (!msg.guild) return;
    if (!msg.member.voice.channel) return msg.channel.send('**В канал зайди.**');
    msg.delete().catch();
    args = msg.content.split(' ');
    args.shift();
    args = args.join(' ');
    args = msg.content.split('h');
    args.shift();
    args = args.join('h');
    args = `h` + args;
    playlist.unshift(args)
    msg.channel.send(`<@${userID}> **включил**(**а**) ${args}`);
    if (args.indexOf('https://www.youtube.com') > -1) {
        const connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play(ytdl(`${playlist[0]}`), { volume: 0.2, liveBuffer: 60000, dlChunkSize: 0 });
    }
    else if (args.indexOf('https://youtu.be') > -1) {
        const connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play(ytdl(`${playlist[0]}`), { volume: 0.2, liveBuffer: 60000, dlChunkSize: 0 });
    }
    else {
        const connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play(`${playlist[0]}`, { volume: 0.2, liveBuffer: 60000, dlChunkSize: 0 });
    }
    console.log(playlist);
}

async function playfile(robot, msg, args, userID) {
    if (!msg.guild) return;
    if (!msg.member.voice.channel) return msg.channel.send('**В канал зайди.**');
    msg.delete().catch();
    args = msg.content.split(' ');
    args.shift();
    args = args.join(' ');
    if (args == "all") {
        msg.channel.send(`<@${userID}> **включил свою музыку**`);
        au3(robot, msg, args, userID);
    }
    else {
        args = msg.content.split(' ');
        args.shift();
        args = args.join(' ');
        msg.channel.send(`<@${userID}> **включил**(**а**) ${args}`);
        const connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play(`${args}`, { volume: 0.3 });
    };
}

async function au3(robot, msg, args, userID) {
    args = msg.content.split(' ');
    args.shift();
    args = args.join(' ');
    testFolder = "D:/Games/==Музыка==";
    const disconnect = await msg.member.voice.channel.leave();
    const connect = await msg.member.voice.channel.join();
    file = fs.readdirSync(testFolder);
    k = true;
    i = 3;
    const stats = fs.statSync(`${testFolder}/${file[i]}`)
    console.log(stats.duration);
        function au() {
            connect.play(`${testFolder}/${file[i]}`, { volume: 0.3 })
                .on('end', function () {
                    console.log("12");
                    file.shift();
                    i++;
                    setTimeout(au, 500);
                });
        }
        function au2() {
            setTimeout(au, 500);
        }
        au();
}

async function pause(robot, msg, args, userID) {
    if (!msg.guild) return;
    if (!msg.member.voice.channel) return msg.channel.send('**В канал зайди.**');
    const connection = await msg.member.voice.channel.join();
    const dispatcher = connection.play('1', { volume: 0.2 });
    dispatcher.pause();
}

async function resume(robot, msg, args, userID) {
    if (!msg.guild) return;
    if (!msg.member.voice.channel) return msg.channel.send('**В канал зайди.**');
    args = msg.content.split(' ');
    args.shift();
    args = args.join(' ');
    const connection = await msg.member.voice.channel.join();
    const dispatcher = connection.play('1', { volume: 0.2 });
    dispatcher.resume();
}

async function leave(robot, msg, args, userID) {
    if (!msg.guild) return;
    if (!msg.member.voice.channel) return msg.channel.send('**В канал зайди.**');
    msg.delete().catch();
    msg.channel.send(`<@${userID}> **отключил**(**а**) **меня**`);
    const dispatcher = await msg.member.voice.channel.leave();
}

async function reconnect(robot, msg, args, userID) {
    if (!msg.guild) return;
    if (!msg.member.voiceChannel) return msg.channel.send('**В канал зайди.**');
    let song = `abc`;
    var sleep = require('sleep');
    msg.delete().catch();
    msg.channel.send(`<@${userID}> **переподключаюсь**`);
    const dispatcher = await msg.member.voice.channel.leave();
    sleep.sleep(20);
    if (song.indexOf('https://www.youtube.com') > -1) {
        const connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play(ytdl(`${song}`), { volume: 0.2 });
    }
    else if (song.indexOf('https://youtu.be') > -1) {
        const connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play(ytdl(`${song}`), { volume: 0.2 });
    }
    else {
        const connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play(`${song}`, { volume: 0.2 });
    }
    console.log(song)
}

var music_list = [
    {
        name: 'reconnect',
        out: reconnect,
        about: "reconnect"
    },
    {
        name: 'resume',
        out: resume,
        about: "resume"
    },
    {
        name: 'продолжить',
        out: resume,
        about: "продолжить"
    },
    {
        name: 'здфн',
        out: play,
        about: "play"
    },
    {
        name: 'play',
        out: play,
        about: "play"
    },
    {
        name: 'играть',
        out: play,
        about: "играть"
    },
    {
        name: 'playfile',
        out: playfile,
        about: "playfile"
    },
    {
        name: 'игратьфайл',
        out: playfile,
        about: "игратьфайл"
    },
    {
        name: 'pause',
        out: pause,
        about: "pause"
    },
    {
        name: 'пауза',
        out: pause,
        about: "пауза"
    },
    {
        name: 'leave',
        out: leave,
        about: "leave"
    },
    {
        name: 'выйти',
        out: leave,
        about: "выйти"
    },
];

module.exports.music = music_list;