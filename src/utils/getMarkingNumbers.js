import convertCoordinates from "./convertCoordinate";

function getMarkingNumbers(position, answerPositions, size) {
  const markingNumber = [
    ["UP_LAYER", 0],
    ["DOWN_LAYER", 0],
    ["LEFT_LAYER", 0],
    ["RIGHT_LAYER", 0],
    ["FRONT_LAYER", 0],
    ["BACK_LAYER", 0],
  ];

  answerPositions.forEach((answerPosition) => {
    const convertedAnswerPosition = convertCoordinates(answerPosition, size);

    if (
      convertedAnswerPosition[1] === position[1] &&
      convertedAnswerPosition[2] === position[2]
    ) {
      markingNumber[2][1] += 1;
      markingNumber[3][1] += 1;
    }

    if (
      convertedAnswerPosition[0] === position[0] &&
      convertedAnswerPosition[2] === position[2]
    ) {
      markingNumber[0][1] += 1;
      markingNumber[1][1] += 1;
    }

    if (
      convertedAnswerPosition[0] === position[0] &&
      convertedAnswerPosition[1] === position[1]
    ) {
      markingNumber[4][1] += 1;
      markingNumber[5][1] += 1;
    }
  });

  return markingNumber;
}

export default getMarkingNumbers;
