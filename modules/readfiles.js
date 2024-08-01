const fs = require("fs").promises;

const path = "./topics/";

// dirGrabber() //возвразает объект:

//   [
//     { name: 'nighthawk', value: 'nighthawk_flashcard_data.txt' },
//     { name: 'otter', value: 'otter_flashcard_data.txt' },
//     { name: 'raccoon', value: 'raccoon_flashcard_data.txt' },
//   ]

async function dirGrabber(path) {
  try {
    const dirData = await fs.readdir(path);
    // console.log(dirData);
    const themes = dirData.map((str) => str.split("_")[0]);
    // console.log(themes);
    const resultArray = [];
    for (let i = 0; i < dirData.length; i += 1) {
      resultArray.push({ name: themes[i], value: dirData[i] });
    }
    // console.log(resultArray);
    return resultArray;
  } catch (error) {
    console.error("Error in reading dir");
  }
}

module.exports = { dirGrabber };
