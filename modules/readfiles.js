const fs = require('fs').promises;

const path = './topics/'; // !!!

// dirGrabber() //возвразает объект:

//   [
//     { name: 'nighthawk', value: 'nighthawk_flashcard_data.txt' },
//     { name: 'otter', value: 'otter_flashcard_data.txt' },
//     { name: 'raccoon', value: 'raccoon_flashcard_data.txt' },
//   ]

async function dirGrabber(path) {
  try {
    const dirData = await fs
      .readdir(path)
      .then((el) => el.filter((el) => /(_flashcard_data)(\.txt)/gm.test(el)));
    // console.log(dirData);
    const themes = dirData.map((str) => str.split('_')[0]);
    // console.log(themes);
    const resultArray = [];
    for (let i = 0; i < dirData.length; i += 1) {
      resultArray.push({ name: themes[i], value: dirData[i] });
    }

    return resultArray;
  } catch (error) {
    console.error('Error in reading dir');
  }
}

// const data = { 1: '5', 2: '5', 3: '5', 4: '5', 5: '5' };
// const rightMsg = '5';

function calcAnswers(data) {
  const answersValues = Object.values(data);
  const rightAnswersQuantity = answersValues.reduce(
    (sum, answer) => Number(answer === rightMsg) + sum,
    0
  );

  const middleScore = rightAnswersQuantity / answersValues.length;

  return {
    sumRightAnswers: rightAnswersQuantity,
    allAnswers: answersValues.length,
    percentage: Number.isInteger(middleScore)
      ? middleScore
      : middleScore.toFixed(1),
  };
}

console.log(calcAnswers(data));

module.exports = { dirGrabber, calcAnswers };
