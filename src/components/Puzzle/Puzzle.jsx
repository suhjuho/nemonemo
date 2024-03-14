import { useEffect } from "react";
import convertCoordinate from "../../utils/convertCoordinate";
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

import CUBE_CONSTANT from "../../constants/cube";

import Scaffold from "../Edge/Scaffold";
import DefaultScaffold from "../Edge/DefaultScaffold";

function Puzzle({ puzzle }) {
  const { size, positions, showingNumbers } = puzzle;
  const defaultPuzzle = getDefaultPuzzle(size);

  const { markingNumbers, setMarkingNumbers } = useMarkingNumbersStore();
  const { answer, setAnswer, setIsComplete } = useAnswerStore();
  const { cubeStates, setCubeStates, setCubeStatesHistory, setHistoryIndex } =
    useCubeStatesStore();
  const { cameraPosition } = useCameraPositionStore();
  const { setCurrentLayer, setLayers } = useLayerStore();

  useEffect(() => {
    positions.forEach((position) => {
      answer[convertCoordinate(position, size).join("")] = true;
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
        showingNumbers,
      );
    });

    const newLayers = [];

    for (let z = -1 * puzzle.size[2] + 1; z <= puzzle.size[2] - 1; z += 2) {
      newLayers.push(z);
    }

    setLayers(newLayers);
    setCurrentLayer(puzzle.size[2]);

    setAnswer(answer);
    setIsComplete(false);
    setCubeStates(cubeStates);
    setCubeStatesHistory([JSON.parse(JSON.stringify(cubeStates))]);
    setHistoryIndex(0);
    setMarkingNumbers(markingNumbers);
  }, []);

  return (
    <>
      {defaultPuzzle.map((position) => (
        <Cube key={position} position={position}></Cube>
      ))}

      {CUBE_CONSTANT.BACK_SCAFFOLD[cameraPosition.join("")].map((position) => (
        <DefaultScaffold
          key={position}
          layerPosition={position}
          size={puzzle.size}
          color="#ff0000"
          thickness={0.01}
        />
      ))}

      {CUBE_CONSTANT.BACK_SCAFFOLD[cameraPosition.join("")].map((position) => (
        <Scaffold
          key={position}
          layerPosition={position}
          size={puzzle.size}
          color="#ffffff"
          thickness={0.02}
        />
      ))}
    </>
  );
}

export default Puzzle;
