function checkAnswer(answer, cubeStates) {
  const positions = Object.entries(cubeStates);

  let result = true;

  positions.forEach((position) => {
    if (answer[position[0]] && position[1].isRemoved) {
      result = false;
    }

    if (!answer[position[0]] && !position[1].isRemoved) {
      result = false;
    }
  });

  return result;
}

export default checkAnswer;
