import { useEffect } from "react";
import * as THREE from "three";

import convertCoordinate from "../../utils/convertCoordinate";

import {
  useAnswerStore,
  useCubeStatesStore,
  useCameraPositionStore,
  useLayerStore,
} from "../../store/store";

import Cube from "../Cube/Cube";

import CUBE_CONSTANT from "../../constants/cube";

import Scaffold from "../Edge/Scaffold";
import DefaultScaffold from "../Edge/DefaultScaffold";
import revertCoordinate from "../../utils/revertCoordinate";

const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const cubeLineGeometry = new THREE.CylinderGeometry(0.03, 0.03, 2, 8);

function Puzzle({ puzzle, markingNumbers, defaultPuzzle }) {
  const { size, answers } = puzzle;

  const { answer, setAnswer, setIsComplete } = useAnswerStore();
  const { cubeStates, setCubeStates, setCubeStatesHistory, setHistoryIndex } =
    useCubeStatesStore();
  const { cameraPosition } = useCameraPositionStore();
  const { setCurrentLayer, setLayers } = useLayerStore();

  useEffect(() => {
    Object.entries(answers).forEach((position) => {
      answer[convertCoordinate(position[0], size).join("")] = true;
    });

    defaultPuzzle.forEach((position) => {
      cubeStates[position.join("")] = {
        isClicked: false,
        isRemoved: false,
        isHidden: false,
      };
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
  }, []);

  return (
    <>
      {defaultPuzzle.map((position) => (
        <Cube
          key={position}
          cubeGeometry={cubeGeometry}
          cubeLineGeometry={cubeLineGeometry}
          position={position}
          markingNumbers={markingNumbers}
          positivePosition={revertCoordinate(position, size)}
        ></Cube>
      ))}

      {CUBE_CONSTANT.BACK_SCAFFOLD[cameraPosition.join("")].map((position) => (
        <DefaultScaffold
          key={position}
          layerPosition={position}
          size={puzzle.size}
          color="#ce4817"
          thickness={1}
        />
      ))}

      {CUBE_CONSTANT.BACK_SCAFFOLD[cameraPosition.join("")].map((position) => (
        <Scaffold
          key={position}
          layerPosition={position}
          size={puzzle.size}
          color="#ffffff"
          thickness={3}
        />
      ))}
    </>
  );
}

export default Puzzle;
