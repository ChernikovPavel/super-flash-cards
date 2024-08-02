const fs = require("fs").promises;
const path = "./topics/"; // !!!

class Grabber {
  constructor() {}

  // Принимает в качестве параметра строку типа "./topics/"
  static async dirGrabber(path) {
    try {
      const dirData = await fs
        .readdir(path)
        .then((el) => el.filter((el) => /(_flashcard_data)(\.txt)/gm.test(el)));
      const themes = dirData.map((str) => str.split("_")[0]);
      const resultArray = [];

      for (let i = 0; i < dirData.length; i += 1) {
        resultArray.push({ name: themes[i], value: dirData[i] });
      }

      return resultArray;
    } catch (error) {
      console.error("Error in reading dir");
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

  // Принимает в качестве параметра строку типа "./topics/raccoon_flashcard_data.txt"
  static async fileGrabber(fileNameWithDir) {
    try {
      const fileData = await fs.readFile(fileNameWithDir, "utf-8");
      const dirtyArray = fileData.split("\n");
      const answerObjectsArray = [];
      for (let i = 0; i < dirtyArray.length - 1; i += 3) {
        let message = dirtyArray[i];
        let rightAnswers = dirtyArray[i + 1].split("; ");
        answerObjectsArray.push({
          type: "input",
          name: `q${i + 1}`,
          message: message,
          ...stylePrefixBlue,
          ...styleSuffix,
          filter: (userAnswer) => {
            return rightAnswers.includes(userAnswer.toLowerCase())
              ? rightMsg
              : falseMsg;
          },
        });
      }

      return resultObject;
    } catch (error) {
      console.error("Error in reading file");
    }
  }
}

module.exports = Grabber;
