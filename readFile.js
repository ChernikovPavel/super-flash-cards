const fs = require("fs").promises;
const { log } = require("console");
const { EOL } = require("os");
const stylePrefixBlue = { prefix: '\x1b[34m' }; //                                         prettier-ignore
const stylePrefixGray = { prefix: '\x1b[90m' }; //                                         prettier-ignore
const styleSuffix =     { suffix: '\x1b[0m' }; //                                          prettier-ignore
const styleSuffixEOL =  { suffix: '\x1b[0m' + EOL }; //                                    prettier-ignore
const rightOrNot = { test: "\x1b[0m" + EOL };

class FlashCards {
    constructor() {
      
    }
    async readFile(readPath) {
      try {
        const fileData = await fs.readFile(readPath, "utf8");
        const newData = fileData
          .trim().split(EOL + EOL).map((el) => el.split(EOL)).map((file) => ({type: "input", name: "username", message: file[0], ...stylePrefixBlue, ...styleSuffix, ...rightOrNot}));
        return newData;
      } catch (error) {
        console.log("Ошибка при чтении файла:", error);
      }
    }
  }
  
  const flashCards = new FlashCards();
  flashCards.readFile("./topics/nighthawk_flashcard_data.txt")
    .then(console.log)
    .catch(error => console.log("Ошибка в promise:", error));

// [
//  { type: 'input', name: 'username', message: 'Введи имя:' },
//  { type: 'input', name: 'username', message: 'Введи имя:' }]
