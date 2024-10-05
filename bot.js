const Discord = require('discord.js'); // Подключаем библиотеку discord.js
const robot = new Discord.Client(); // Объявляем, что robot - бот
const comms = require("./comms.js"); // Подключаем файл с командами для бота
const music = require("./music.js"); // Подключаем файл с командами для бота
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
      name: `${robot.guilds.cache.users} Пользователей.`,
      type: 'WATCHING',
    },
  });
});

//robot.on('debug', console.log);

robot.on('message', (msg, userID) => { // Реагирование на сообщения
  var userID = msg.author.id
  if (msg.author.username != robot.user.username && msg.author.discriminator != robot.user.discriminator) {
    var comm = msg.content.trim().toLowerCase() + " ";
    var comm_name = comm.slice(0, comm.indexOf(" "));
    var messArr = comm.split(" ");
    for (comm_count in comms.comms) {
      var comm2 = prefix + comms.comms[comm_count].name;
      if (comm2 == comm_name) {
        comms.comms[comm_count].out(robot, msg, messArr, userID);
      }
    }
    for (comm_count in music.music) {
      var music2 = prefix + music.music[comm_count].name;
      if (music2 == comm_name) {
        music.music[comm_count].out(robot, msg, messArr, userID);
      }
    }
  }
});

robot.login(token); // Авторизация бота