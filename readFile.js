const fs = require('fs').promises;
const { log } = require('console');
const { EOL } = require('os');


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