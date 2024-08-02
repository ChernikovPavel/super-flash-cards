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
      return -2;
    } finally {
      console.clear();
      console.log("\x1b[0m"); // демаскирует остальное
    }
  }

  static async logFunc(login, password) {
    try {
      console.log("\x1b[8m");
      const user = await User.findOne({ where: { login, password } });
      console.clear();
      if (user) {
        return user.id;
      } else {
        return -1;
      }
    } catch (error) {
      return -2;
    } finally {
      console.clear();
      console.log("\x1b[0m"); // демаскирует остальное
    }
  } //4 (id пользователя)

  static async newScore(userID, currentScore) {
    try {
      console.log("\x1b[8m");
      const scoreCreate = await Score.create({ userID, score: currentScore });
      return scoreCreate;
    } catch (error) {
      return -2;
    } finally {
      console.clear();
      console.log("\x1b[0m"); // демаскирует остальное
    }
  } //100  (очки пользователя)

  static async hiScore(ID, currentScore) {
    try {
      const scoreHigh = await Score.findAll();
      let result = 0;
      for (let i = 0; i < scoreHigh.length; i++) {
        const numN = scoreHigh[i].dataValues.score;
        if (numN > result) {
          result = numN;
        }
      }
      return result;
    } catch (error) {
      return -2;
    } finally {
      console.clear();
      console.log("\x1b[0m"); // демаскирует остальное
    }
  } //500 (самый высокий счет)
}
// DataBase.regFunc('1','1').then(console.log)
// DataBase.logFunc('2','2').then(console.log)
// DataBase.newScore('1', '100')
// DataBase.hiScore("2").then(console.log);

module.exports = DataBase;
