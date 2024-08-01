const fs = require('fs').promises;
const path = './topics/'; // !!!

class Grabber {
  constructor() {}

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

  static calcAnswers(data) {
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
}

module.exports = Grabber;
