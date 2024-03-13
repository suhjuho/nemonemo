import convertCoordinate from "./convertCoordinate";
import revertCoordinate from "./revertCoordinate";

function getMarkingNumbers(position, answerPositions, size, showingNumbers) {
  const { layerX, layerY, layerZ } = showingNumbers;
  const revertedCoordinate = revertCoordinate(position, size);

  const markingNumber = [
    ["UP_LAYER", -1, 0],
    ["DOWN_LAYER", -1, 0],
    ["LEFT_LAYER", -1, 0],
    ["RIGHT_LAYER", -1, 0],
    ["FRONT_LAYER", -1, 0],
    ["BACK_LAYER", -1, 0],
  ];
  const [sizeX, sizeY, sizeZ] = size;
  let [countX, countY, countZ] = [0, 0, 0];
  let [pieceX, pieceY, pieceZ] = [0, 0, 0];
  let isContinuous = false;

  const stringAnswerPositions = answerPositions.map((answerPosition) =>
    convertCoordinate(answerPosition, size).join(""),
  );

  for (let x = -1 * sizeX + 1; x <= sizeX - 1; x += 2) {
    const newPosition = position.slice();
    newPosition[0] = x;

    if (stringAnswerPositions.includes(newPosition.join(""))) {
      countX += 1;

      if (!isContinuous) {
        isContinuous = true;
        pieceX += 1;
      }
    } else if (isContinuous) {
      isContinuous = false;
    }
  }

  layerX.forEach((positionYZ) => {
    if (
      revertedCoordinate[1] === positionYZ[0] &&
      revertedCoordinate[2] === positionYZ[1]
    ) {
      markingNumber[2][1] = countX;
      markingNumber[3][1] = countX;
      markingNumber[2][2] = pieceX;
      markingNumber[3][2] = pieceX;
    }
  });

  isContinuous = false;

  for (let y = -1 * sizeY + 1; y <= sizeY - 1; y += 2) {
    const newPosition = position.slice();
    newPosition[1] = y;

    if (stringAnswerPositions.includes(newPosition.join(""))) {
      countY += 1;

      if (!isContinuous) {
        isContinuous = true;
        pieceY += 1;
      }
    } else if (isContinuous) {
      isContinuous = false;
    }
  }

  layerY.forEach((positionXZ) => {
    if (
      revertedCoordinate[0] === positionXZ[0] &&
      revertedCoordinate[2] === positionXZ[1]
    ) {
      markingNumber[0][1] = countY;
      markingNumber[1][1] = countY;
      markingNumber[0][2] = pieceY;
      markingNumber[1][2] = pieceY;
    }
  });

  isContinuous = false;

  for (let z = -1 * sizeZ + 1; z <= sizeZ - 1; z += 2) {
    const newPosition = position.slice();
    newPosition[2] = z;

    if (stringAnswerPositions.includes(newPosition.join(""))) {
      countZ += 1;

      if (!isContinuous) {
        isContinuous = true;
        pieceZ += 1;
      }
    } else if (isContinuous) {
      isContinuous = false;
    }
  }

  layerZ.forEach((positionXY) => {
    if (
      revertedCoordinate[0] === positionXY[0] &&
      revertedCoordinate[1] === positionXY[1]
    ) {
      markingNumber[4][1] = countZ;
      markingNumber[5][1] = countZ;
      markingNumber[4][2] = pieceZ;
      markingNumber[5][2] = pieceZ;
    }
  });

  return markingNumber;
}

export default getMarkingNumbers;
