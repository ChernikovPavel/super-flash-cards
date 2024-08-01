const inquirer = require('inquirer');
const { EOL } = require('os');
const { dirGrabber, calcAnswers } = require('./readfiles')
const stylePrefixBlue =       { prefix: '\x1b[34m' }; //                                         prettier-ignore
const stylePrefixGray =       { prefix: '\x1b[90m' }; //                                         prettier-ignore
const stylePrefixMagenta =    { prefix: '\x1b[35m' }; //                                         prettier-ignore
const stylePrefixBlueScreen = { prefix: ' \x1b[44m\x1b[35m' }; //                                prettier-ignore

const styleSuffix =           { suffix: '\x1b[0m' }; //                                          prettier-ignore
const styleSuffixEOL =        { suffix: '\x1b[0m' + EOL }; //                                    prettier-ignore

const stylePrefixTest =       { prefix: ' \x1b[44m\x1b[35m' }; //                                prettier-ignore

const rightMsg = "\x1b[42m" + '                                правильно!                                ' + '\x1b[0m' //prettier-ignore
const falseMsg = '\x1b[41m' + '                                неправильно                               ' + "\x1b[0m" //prettier-ignore

rightAnswer = 'a';

const metaTable = {}


const RigthOrNot = (userAnswer) => {
  return userAnswer === rightAnswer ? rightMsg : falseMsg;
};

async function tester() {
  await inquirer.prompt([
    {
      type: 'input',
      name: 'q1',
      message:
        'Верно или нет?  Бульбат - другое название обыкновенного ночного ястреба. ',
      ...stylePrefixBlueScreen,
      ...styleSuffixEOL,
      filter: RigthOrNot,
    },
    {
      type: 'input',
      name: 'q2',
      message: 'вопрос 2',
      ...stylePrefixBlueScreen,
      ...styleSuffixEOL,
      filter: RigthOrNot,
    },
  ]);
}


(async () => {
  await inquirer.prompt(

    {
      type: 'list',
      name: 'regOrLog',
      message: 'Добро пожаловать в игру',
      choices: await dirGrabber("./topics/"),
      ...stylePrefixBlue,
      ...styleSuffix,
    },
    
  );
})


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
        await logFunc();
        break;

      case true: // регистрация
        await regFunc();
        break;
    }
    await newScore();
  } catch (error) {
    console.log(error);
  }
}


