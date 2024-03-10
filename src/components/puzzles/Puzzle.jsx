import { useEffect } from "react";
import { useAnswerStore, useDefaultPositionsStore } from "../../store/store";

import Cube from "../Cube/Cube";

function Puzzle({ puzzle }) {
  const { size, positions, numbersList } = puzzle;
  const { answer, setAnswer } = useAnswerStore();
  const { defaultPositions, setDefaultPositions } = useDefaultPositionsStore();
  const defaultCubes = [];
  const [sizeX, sizeY, sizeZ] = size;

  for (let x = -1 * sizeX + 1; x <= sizeX - 1; x += 2) {
    for (let y = -1 * sizeY + 1; y <= sizeY - 1; y += 2) {
      for (let z = -1 * sizeZ + 1; z <= sizeZ - 1; z += 2) {
        defaultCubes.push([x, y, z]);
      }
    }
  }

  useEffect(() => {
    positions.forEach((position) => {
      answer[position.join("")] = true;
    });

    defaultCubes.forEach((position) => {
      defaultPositions[position.join("")] = false;
    });

    setAnswer(answer);
    setDefaultPositions(defaultPositions);
  }, []);

  return (
    <>
      {defaultCubes.map((position, index) => (
        <Cube key={position} position={position} numbers={numbersList[index]} />
      ))}
    </>
  );
}

export default Puzzle;
