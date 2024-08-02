const { regFunc, logFunc, newScore, hiScore } = require('./modules/db');
const { dirGrabber, fileGrabber, calcAnswers} = require('./modules/readfiles');
const inqRunner = require('./modules/inquirer');
const {regFuncInq, logFuncInq} = require('./modules/inquirer')
const inquirer = require('inquirer');
const { EOL } = require('os');
const metaTable = {}
const stylePrefixBlue =       { prefix: '\x1b[34m' }; //                                         prettier-ignore


const styleSuffix =           { suffix: '\x1b[0m' }; //                                          prettier-ignore


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
        metaTable.userID = await logFuncInq();
          break;
  
        case true: // регистрация
        metaTable.userID = await regFuncInq();
          break;
      }

    } catch (error) {
      console.log('greetings error');
    }
  }

  async function ListOfAuotes(){
try {
    await inquirer.prompt({
        type: 'list',
        name: 'topics',
        message: 'choose',
        choices: (async () => await dirGrabber())
      }).then((ans) => metaTable.fileName = ans.topics)
} catch (error) {
    console.log('ListOfAuotes эмм');
}}

async function quotes(){
    console.clear();
try {
    const quoteName = await fileGrabber(metaTable.fileName);
  
    // console.dir(someq);
     await inquirer.prompt(quoteName).then(calcAnswers).then((a) => metaTable.ans = a.sumRightAnswers);

} catch (error) {
    console.log(error);
}
}


async function runner(){
try {
    await greetings()
    await ListOfAuotes()
    await quotes()
    await newScore(metaTable.userID, metaTable.ans)
    await hiScore(metaTable.userID, metaTable.ans)
    .then((hi) => {
        console.clear();
        console.log('\x1b[35m                   ' + `текущий счет: ${metaTable.ans} рекорд: ${hi}` + '\x1b[0m')})

} catch (error) {
    console.log('runner err');
}    
}

runner()