const TelegramApi = require('node-telegram-bot-api')
require("amd-loader")
// const zzz = require('node-fetch')
// const amd = require('./amd')
const axios = require('axios').default

// const cachePath = require.resolve('./amd')
// const cacheLib = require.cache[cachePath]

/*console.log('cachePath =', cachePath)
console.log('cacheLib =', cacheLib)
console.log('amd=', amd)*/

// определяем IIFE модуль

const iifeCounterModule = (() => {
    let count = 0
    return {
        increase: () => ++count,
        reset: () => {
            count = 0
            console.log('Счетчик сброшен.')
        }
    }
})()

// используем IIFE модуль
// iifeCounterModule.increase()
// // iifeCounterModule.reset()

const token = '2012027646:AAGyd5FpCML64w7ySecWEkwr0u9k4lc-NN4'
const hello = `Добро пожаловать в телеграм бот SmartJS!`

const bot = new TelegramApi(token, {polling: true})

axios.get('https://yandex.ru', {
    params: {
        ID: 12345
    }
})
    .then(function (response) {
        console.log(response.status);
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        // always executed
    });


const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Информация о пользователе'},
        {command: '/xaker', description: 'Получение стикера'},
        {command: '/joker', description: 'Блоки кода'},
        {command: '/skype', description: 'Skype'},
    ])

    bot.on('message', async (msg) => {
        try {
            console.log(msg)

            // axios.get('https://yandex.ru', {
            //     params: {
            //         ID: 12345
            //     }
            // })
            //     .then(function (response) {
            //         console.log(response.status);
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     })
            //     .then(function () {
            //         // always executed
            //     });

            const text = msg.text
            const chatId = msg.chat.id;

            // https://api.telegram.org/bot1952049109:AAHmI-kWRnD4Rwjp0HNeM4F_Yvy7JmWUyFU/getFile?file_id=AgACAgIAAxkBAANoYUoELAxFpVIS-AoKP3ErrENy8LAAAua1MRvG8VFKTFhXYKdI-8UBAAMCAANzAAMhBA

                if (msg.photo && msg.photo[0]) {
                    const file_id = msg.photo[0].file_id
                    //const image = await bot.getFile({ file_id: file_id});
                    console.log(file_id);


                    // an api request to get the "file directory" (file path)
                    // const res = await fetch(
                    //     `https://api.telegram.org/bot${token}/getFile?file_id=${file_id}`
                    // );

                    console.log(res);

                    // extract the file path
                    // const res2 = await res.json();
                    // const filePath = res2.result.file_path;

                    // const img = bot.getFileLink(file_id);
                    //
                    // console.log(img);

                    return bot.sendMessage(chatId, `Вы загрузили файл! file_id#${file_id}`);
                }

            if (text === '/xaker') {
                return bot.sendSticker(chatId, `https://cdn.tlgrm.app/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/192/10.jpg`)
                //return bot.sendMessage(chatId, `https://cdn.tlgrm.app/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/192/10.jpg`)
            }

            if (text === '/skype') {
                return bot.sendMessage(chatId, `5XM49980JN`);        
            }

            if (text === '/joker') {

                const out = `
                    Глобальный импорт

Другим популярным подходом, который используют библиотеки такие как jQuery, является глобальный импорт. Он похож на замыкания, которые мы только что видели, только теперь мы передаём глобальные переменные в качестве параметров.

(function (globalVariable) {

  // Keep this variables private inside this closure scope
  var privateFunction = function() {
    console.log('Shhhh, this is private!');
  }

  // Expose the below methods via the globalVariable interface while
  // hiding the implementation of the method within the 
  // function() block

  globalVariable.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  globalVariable.filter = function(collection, test) {
    var filtered = [];
    globalVariable.each(collection, function(item) {
      if (test(item)) {
        filtered.push(item);
      }
    });
    return filtered;
  };

  globalVariable.map = function(collection, iterator) {
    var mapped = [];
    globalUtils.each(collection, function(value, key, collection) {
      mapped.push(iterator(value));
    });
    return mapped;
  };

  globalVariable.reduce = function(collection, iterator, accumulator) {
    var startingValueMissing = accumulator === undefined;

    globalVariable.each(collection, function(item) {
      if(startingValueMissing) {
        accumulator = item;
        startingValueMissing = false;
      } else {
        accumulator = iterator(accumulator, item);
      }
    });

    return accumulator;

  };

 }(globalVariable));
                `

                await bot.sendMessage(chatId, `${out}`)
            }

            if (text === '/start') {
                //await bot.sendMessage(chatId, `https://cdn.tlgrm.app/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/192/10.jpg`)
                await bot.sendMessage(chatId, hello)
            } else if (text === '/info') {
                await bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`)
            } else if (text !== 'undefined') {
                //await bot.sendMessage(chatId, `${text}`);
                //await bot.sendMessage(chatId, `Привет, Друг! Ты написал мне: "${text}".`);
            }
        } catch(e) {
            console.log('ERROR: ', e.message)
        }
    });
}

start()

// https://habr.com/ru/post/501198/