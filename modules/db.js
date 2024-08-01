const {User, Score} = require('../db/models')

async function regFunc(login, password) {
    try {
        console.log('\x1b[8m'); // маскирует лишние логи
        // есть ли такой пользователь
        const recievedUsers = await User.findAll({ where: { login } });
        if (!recievedUsers.length) {
          const createdUSer = await User.create({ login, password });
          console.clear();

          return createdUSer.id;
        }

        return -1;
      } catch (error) {
        console.log('кеек\r\n\r\n', error);
      } finally {
        console.log('\x1b[0m'); // демаскирует остальное
      }
}



regFunc('1','1').then(console.log)