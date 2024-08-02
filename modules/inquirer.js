const inquirer = require('inquirer');
const { EOL } = require('os');
const { dirGrabber } = require('./readfiles');
const { regFunc, logFunc, newScore, hiScore } = require('./db');
const stylePrefixBlue =       { prefix: '\x1b[34m' }; //                                         prettier-ignore
const stylePrefixGray =       { prefix: '\x1b[90m' }; //                                         prettier-ignore
const stylePrefixMagenta =    { prefix: '\x1b[35m' }; //                                         prettier-ignore
const stylePrefixBlueScreen = { prefix: ' \x1b[44m\x1b[35m' }; //                                prettier-ignore

const styleSuffix =           { suffix: '\x1b[0m' }; //                                          prettier-ignore
const styleSuffixEOL =        { suffix: '\x1b[0m' + EOL }; //                                    prettier-ignore

const stylePrefixTest =       { prefix: ' \x1b[44m\x1b[35m' }; //                                prettier-ignore

const rightMsg = '\x1b[42m' + '                                правильно!                                ' + '\x1b[0m' //prettier-ignore
const falseMsg = '\x1b[41m' + '                                неправильно                               ' + '\x1b[0m' //prettier-ignore

rightAnswer = 'a';

const metaTable = {};

async function logFuncInq() {
  console.log();
  while (!(metaTable.userID > 0)) {
    console.clear();
    switch (metaTable.userID) {
      case -1:
        console.log(' \x1b[31m%s\x1b[0m', 'Неверный логин или пароль!');
        break;
      case -2:
        console.log(' \x1b[41m%s\x1b[0m', ' ОШИБКА ПОДКЛЮЧЕНИЯ! ');
        break;
        case 'default':
        console.log(stylePrefixBlue.prefix, 'форма входа');
    }
    await inquirer
      .prompt([
        {
          type: 'input',
          name: 'login',
          message: 'login:',
          ...styleSuffixEOL,
          ...stylePrefixGray,
        },
        {
          type: 'password',
          name: 'password',
          message: 'password:',
          ...styleSuffixEOL,
          ...stylePrefixGray,
          mask: '*',
        },
      ])
      .then(({ login, password }) => logFunc(login, password))
      .then((answer) => (metaTable.userID = answer));
  }
  return metaTable.userID
}

async function regFuncInq() {
  console.log();
  while (!(metaTable.userID > 0)) {
    console.clear();
    switch (metaTable.userID) {
      case -1:
        console.log(' \x1b[31m%s\x1b[0m', 'Неверный логин или пароль!');
        break;
      case -2:
        console.log(' \x1b[41m%s\x1b[0m', ' ОШИБКА ПОДКЛЮЧЕНИЯ! ');
        break;
        case 'default':
        console.log(stylePrefixBlue.prefix, 'форма входа');
    }
    await inquirer
      .prompt([
        {
          type: 'input',
          name: 'login',
          message: 'login:',
          ...styleSuffixEOL,
          ...stylePrefixGray,
        },
        {
          type: 'password',
          name: 'password',
          message: 'password:',
          ...styleSuffixEOL,
          ...stylePrefixGray,
          mask: '*',
        },
      ])
      .then(({ login, password }) => regFunc(login, password))
      .then((answer) => (metaTable.userID = answer));
  }
  return metaTable.userID
}


async function greetings() {
  console.clear();
  try {
    await inquirer
      .prompt([
        {
          type: 'list',
          name: 'regOrLog',
          message: 'Добро пожаловать в игру',
          choices: [
            { name: 'вход', value: false },
            { name: 'регистрация', value: true },
          ],
          ...stylePrefixBlue,
          ...styleSuffix,
        },
      ])
      .then((answer) => (metaTable.regOrLog = answer.regOrLog));

    switch (metaTable.regOrLog) {
      case false: // вход
        await logFuncInq();
        break;

      case true: // регистрация
        await regFuncInq();
        break;
    }
return metaTable
  } catch (error) {
    console.log(error);
  }
}


async function inqRunner(){
  greetings()
}




module.exports = {regFuncInq, logFuncInq}