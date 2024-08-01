const fs = require("fs").promises;

const path = "./topics/"; // !!!

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

// const data = { 1: "5", 2: "5", 3: "5", 4: "2", 5: '5' };
// const rightAnswer = "5";

function calcAnswers(data, rightAnswer) {
  const answersValues = Object.values(data);
  const rightAnswersQuantity = answersValues.reduce((sum, answer) => {
    if (answer === rightAnswer) {
      sum += 1;
    }

    return sum;
  }, 0);

  const middleScore = rightAnswersQuantity / answersValues.length;

  return Number.isInteger(middleScore) ? middleScore : middleScore.toFixed(1);
}

// console.log(calcAnswers(data, rightAnswer));

module.exports = { dirGrabber, calcAnswers };
