type CubeState = {
  isMarked: boolean;
  isRemoved: boolean;
  isHidden: boolean;
};

function checkAnswer(
  answer: Record<string, boolean>,
  cubeStates: Record<string, CubeState>,
) {
  const positions = Object.entries(cubeStates);

  let result = true;

  positions.forEach((position) => {
    const [cubePosition, cubeState] = [position[0], position[1]];

    if (answer[cubePosition] && cubeState.isRemoved) {
      result = false;
    }

    if (!answer[cubePosition] && !cubeState.isRemoved) {
      result = false;
    }
  });

  return result;
}

export default checkAnswer;
