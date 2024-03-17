function getMarkingNumbers(answers, showingNumbers, size) {
  const markingNumbers = {
    layerX: {},
    layerY: {},
    layerZ: {},
  };

  showingNumbers.layerX.forEach((showingNumber) => {
    let [total, piece] = [0, -1];
    let isContinuous = false;

    for (let x = 0; x < size[0]; x += 1) {
      const position = `${x}${showingNumber[0]}${showingNumber[1]}`;

      if (answers[position]) {
        total += 1;

        if (!isContinuous) {
          isContinuous = true;
          piece += 1;
        }
      } else if (isContinuous) {
        isContinuous = false;
      }
    }

    markingNumbers.layerX[showingNumber.join("")] = { total, piece };
  });

  showingNumbers.layerY.forEach((showingNumber) => {
    let [total, piece] = [0, -1];
    let isContinuous = false;

    for (let y = 0; y < size[1]; y += 1) {
      const position = `${showingNumber[0]}${y}${showingNumber[1]}`;

      if (answers[position]) {
        total += 1;

        if (!isContinuous) {
          isContinuous = true;
          piece += 1;
        }
      } else if (isContinuous) {
        isContinuous = false;
      }
    }

    markingNumbers.layerY[showingNumber.join("")] = { total, piece };
  });

  showingNumbers.layerZ.forEach((showingNumber) => {
    let [total, piece] = [0, -1];
    let isContinuous = false;

    for (let z = 0; z < size[2]; z += 1) {
      const position = `${showingNumber[0]}${showingNumber[1]}${z}`;

      if (answers[position]) {
        total += 1;

        if (!isContinuous) {
          isContinuous = true;
          piece += 1;
        }
      } else if (isContinuous) {
        isContinuous = false;
      }
    }

    markingNumbers.layerZ[showingNumber.join("")] = { total, piece };
  });

  return markingNumbers;
}

export default getMarkingNumbers;
