import { useEffect } from "react";
import convertCoordinates from "../../utils/convertCoordinate";
import getMarkingNumbers from "../../utils/getMarkingNumbers";
import getDefaultPuzzle from "../../utils/getDefaultPuzzle";

import {
  useMarkingNumbersStore,
  useAnswerStore,
  useCubeStatesStore,
  useCameraPositionStore,
  useLayerStore,
} from "../../store/store";

import Cube from "../Cube/Cube";
import LayerEdge from "../Edge/LayerEdge";

import CUBE_CONSTANT from "../../constants/cube";

function Puzzle({ puzzle }) {
  const { size, positions, numbersList } = puzzle;
  const defaultPuzzle = getDefaultPuzzle(size);

  const { markingNumbers, setMarkingNumbers } = useMarkingNumbersStore();
  const { answer, setAnswer } = useAnswerStore();
  const { cubeStates, setCubeStates, setCubeStatesHistory, setHistoryIndex } =
    useCubeStatesStore();
  const { cameraPosition } = useCameraPositionStore();
  const { setCurrentLayer, setLayers } = useLayerStore();

  useEffect(() => {
    positions.forEach((position) => {
      answer[convertCoordinates(position, size).join("")] = true;
    });

    defaultPuzzle.forEach((position) => {
      cubeStates[position.join("")] = {
        isClicked: false,
        isRemoved: false,
        isHidden: false,
      };

      markingNumbers[position.join("")] = getMarkingNumbers(
        position,
        positions,
        size,
      );
    });

    const newLayers = [];

    for (let z = -1 * puzzle.size[2] + 1; z <= puzzle.size[2] - 1; z += 2) {
      newLayers.push(z);
    }

    setCurrentLayer(puzzle.size[2]);
    setLayers(newLayers);

    setAnswer(answer);
    setCubeStates(cubeStates);
    setCubeStatesHistory([JSON.parse(JSON.stringify(cubeStates))]);
    setHistoryIndex(0);
    setMarkingNumbers(markingNumbers);
  }, []);

  return (
    <>
      {defaultPuzzle.map((position) => (
        <Cube
          key={position}
          position={position}
          numbers={numbersList}
          size={size}
        ></Cube>
      ))}
      {CUBE_CONSTANT.BACK_SCAFFOLD[cameraPosition.join("")].map((position) => (
        <LayerEdge key={position} layerPosition={position} puzzle={puzzle} />
      ))}
    </>
  );
}

export default Puzzle;
