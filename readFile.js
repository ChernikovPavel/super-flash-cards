const fs = require('fs').promises;
const { log } = require('console');
const { EOL } = require('os');
const stylePrefixBlue = { prefix: '\x1b[34m' }; //                                         prettier-ignore
const stylePrefixGray = { prefix: '\x1b[90m' }; //                                         prettier-ignore
const styleSuffix =     { suffix: '\x1b[0m' }; //                                          prettier-ignore
const styleSuffixEOL =  { suffix: '\x1b[0m' + EOL }; //                                    prettier-ignore

async function readFile(readPath) {
  try {
    const fileData = await fs.readFile(readPath, 'utf8');
    const newData = fileData
    .split(EOL).filter(el).map((file) => ({ type: 'input', name: 'username', message: file }));

    
    return newData;
  } catch (error) {
    console.log(error);
  }
}

readFile('./topics/nighthawk_flashcard_data.txt').then(console.log)

// [
//  { type: 'input', name: 'username', message: 'Введи имя:' },
//  { type: 'input', name: 'username', message: 'Введи имя:' }]