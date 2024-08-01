const inquirer = require('inquirer');
const { EOL } = require('os');
const stylePrefixBlue =    { prefix: '\x1b[34m' }; //                                         prettier-ignore
const stylePrefixGray =    { prefix: '\x1b[90m' }; //                                         prettier-ignore
const stylePrefixMagenta = { prefix: '\x1b[35m' }; //                                         prettier-ignore

const styleSuffix =        { suffix: '\x1b[0m' }; //                                          prettier-ignore
const styleSuffixEOL =     { suffix: '\x1b[0m' + EOL }; //                                    prettier-ignore

const stylePrefixTest =    { prefix: ' \x1b[44m\x1b[35m' }; //                                 prettier-ignore
const rightMsg = "\x1b[42m" + '                                правильно!                                ' + '\x1b[0m' //prettier-ignore
const falseMsg = '\x1b[41m' + '                                неправильно                               ' + "\x1b[0m" //prettier-ignore

rightAnswer = 'a';

const RigthOrNot = (userAnswer) => {
  return userAnswer === rightAnswer ? rightMsg : falseMsg;
};

(async () => {
  await inquirer.prompt([
    {
      type: 'input',
      name: 'q1',
      message:
        'Верно или нет?  Бульбат - другое название обыкновенного ночного ястреба. ',
      ...stylePrefixTest,
      ...styleSuffixEOL,
      filter: RigthOrNot,
    },
    {
      type: 'input',
      name: 'q2',
      message: 'вопрос 2',
      ...stylePrefixTest,
      ...styleSuffixEOL,
      filter: RigthOrNot,
    },
  ]);
})();
