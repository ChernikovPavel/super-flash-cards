const { User, Score } = require("../db/models");

class DataBase {
  constructor() {}

  static async regFunc(login, password) {
    try {
      console.log("\x1b[8m"); // маскирует лишние логи
      // есть ли такой пользователь
      const recievedUsers = await User.findAll({ where: { login } });
      if (!recievedUsers.length) {
        const createdUSer = await User.create({ login, password });
        console.clear();
        console.log("\x1b[0m"); // демаскирует остальное
        return createdUSer.id; //ретурн завершает работу и возвращает ID пользователя
      }
      return -1; //этот ретурн отработает только тогда, когда первый ретурн не сработал(после ретурнов жизни нет)
    } catch (error) {
      console.log("    Ошибка!    \r\n\r\n", error);
    } finally {
      console.log("\x1b[0m"); // демаскирует остальное
    }
  }

  static async logFunc(login, password) {
    try {
      console.log("\x1b[8m");
      const user = await User.findOne({ where: { login, password } });
      if (user) {
        return user.id;
      } else {
        return -1;
      }
    } catch (error) {
      console.log("    Ошибка!    \r\n\r\n", error);
    } finally {
      console.log("\x1b[0m");
    }
  } //4 (id пользователя)

  static async newScore(ID, currentScore) {
    try {
      const scoreCreate = await Core.Create.findByPk({
        attributes: ["ID", "currentScore"],
      });
    } catch (error) {
      console.log("    Ошибка!    \r\n\r\n", error);
    } 
  } //100  (очки пользователя)

  static async hiScore(ID, currentScore) {
    
  } //500 (самый высокий счет)
}
// DataBase.regFunc('1','1').then(console.log)
DataBase.logFunc('2','2').then(console.log)

module.exports = DataBase;
