const { regFunc, logFunc, newScore, hiScore } = require('./modules/db');
const { dirGrabber, fileGrabber } = require('./modules/readfiles');
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
          await logFuncInq();
          break;
  
        case true: // регистрация
          await regFuncInq();
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
    const someq = await fileGrabber(metaTable.fileName);
  
    // console.dir(someq);
      inquirer.prompt(someq);

} catch (error) {
    console.log(error);
}
}


async function runner(){
try {
    await greetings()
    await ListOfAuotes()
    await quotes()
} catch (error) {
    console.log('runner err');
}    
}

runner()