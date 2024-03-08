function checkAnswer(answer, defaultPositions) {
  const positions = Object.entries(defaultPositions);
  let result = true;

  positions.forEach((position) => {
    if (answer[position[0]] && !position[1]) {
      result = false;
    }

    if (!answer[position[0]] && position[1]) {
      result = false;
    }
  });

  return result;
}

export default checkAnswer;
