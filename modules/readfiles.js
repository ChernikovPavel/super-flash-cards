
const fs = require('fs').promises;
const inquirer = require('inquirer');
const { EOL } = require('os');
const stylePrefixBlueScreen = { prefix: ' \x1b[44m\x1b[35m' }; //                                prettier-ignore
const styleSuffixEOL =        { suffix: '\x1b[0m' + EOL }; //                                    prettier-ignore
const rightMsg = "\x1b[42m" + '                                правильно!                                ' + '\x1b[0m' //prettier-ignore
const falseMsg = '\x1b[41m' + '                               неправильно!                               ' + "\x1b[0m" //prettier-ignore

class Grabber {
  constructor() {}

  // Принимает в качестве параметра строку типа "./topics/"
  static async dirGrabber(path) {
    try {
      const dirData = await fs
        .readdir(path)
        .then((el) => el.filter((el) => /(_flashcard_data)(\.txt)/gm.test(el)));
      const themes = dirData.map((str) => str.split('_')[0]);
      const resultArray = [];

      for (let i = 0; i < dirData.length; i += 1) {
        resultArray.push({ name: themes[i], value: dirData[i] });
      }

      return resultArray;
    } catch (error) {
      console.error('Error in reading dir');
    }
  }

  // Принимает в качестве параметра строку типа "raccoon_flashcard_data.txt"
  static async fileGrabber(fileName, path = './topics/') {
    try {
      const fileData = await fs.readFile(path + fileName, 'utf-8');
      const dirtyArray = fileData.split(EOL);
      const answerObjectsArray = [];
      for (let i = 0; i < dirtyArray.length - dirtyArray.length % 2; i += 3) {
        let message = dirtyArray[i];
        while(message.length < 73) { message += ' '}

        const rightAnswers = dirtyArray[i + 1].split('; ');
        answerObjectsArray.push({
          type: 'input',
          name: `q${i + 1}`,
          message,
          ...stylePrefixBlueScreen,
          ...styleSuffixEOL,
          filter: (userAnswer = null) => {
            return  `${rightAnswers}`.includes(userAnswer.toLowerCase()) && userAnswer !== '' ? rightMsg : falseMsg;
          },
        });
      }

      return answerObjectsArray;
    } catch (error) {
      console.error(error);
    }
  }
}


async function runner() {
inquirer.prompt({
  type: 'list',
  name: 'q1',
  message: 'choose',
  choices: (async () => await Grabber.dirGrabber(path))
})
}

async function runner2() {
  const someq = await Grabber.fileGrabber('nighthawk_flashcard_data.txt');
  
// console.dir(someq);
  inquirer.prompt(someq);
}

module.exports = Grabber;
