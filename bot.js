const Discord = require('discord.js'); // Подключаем библиотеку discord.js
const robot = new Discord.Client(); // Объявляем, что robot - бот
const comms = require("./comms.js"); // Подключаем файл с командами для бота
const fs = require('fs'); // Подключаем родной модуль файловой системы node.js
let config = require('./config.json'); // Подключаем файл с параметрами и информацией
let token = config.token; // «Вытаскиваем» из него токен
let prefix = config.prefix; // «Вытаскиваем» из него префикс

robot.on("ready", function () {
  /* При успешном запуске, в консоли появится сообщение «[Имя бота] К полёту готов!» */
  console.log(robot.user.username + ": К полёту готов!");
  robot.user.setPresence({
    status: 'online',
    activity: {
      name: `${robot.guilds.cache.size} Сервер.`,
      type: 'WATCHING',
    },
  });
});

//robot.on('debug', console.log);

robot.on('message', (msg) => { // Реагирование на сообщения
  if (!msg.author.bot) {
    const userID = msg.author.id;
    const serverID = msg.guild.id;
    const msgdate = new Date();
    let rolecolor = msg.member.roles.color;
    if (!rolecolor) {
      rolecolor = "#E9455A";
    }
    else {
      rolecolor = rolecolor.hexColor;
    }
    var comm = msg.content.trim().toLowerCase() + " ";
    var comm_name = comm.slice(0, comm.indexOf(" "));
    var args = comm.split(" ");
    for (comm_count in comms.comms) {
      var comm2 = prefix + comms.comms[comm_count].name;
      if (comm2 == comm_name) {
        comms.comms[comm_count].out(robot, msg, args, userID, serverID, msgdate, rolecolor);
      }
    }
  }
});

robot.login(token); // Авторизация бота