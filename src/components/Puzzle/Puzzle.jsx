import { useEffect } from "react";
import * as THREE from "three";

import { useParams } from "react-router-dom";
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
  const { size, answers, colors } = puzzle;
  const { difficulty, stageNumber } = useParams();

  const { answer, setAnswer, isComplete, setIsComplete } = useAnswerStore();
  const { cubeStates, setCubeStates, setCubeStatesHistory, setHistoryIndex } =
    useCubeStatesStore();
  const { cameraPosition } = useCameraPositionStore();
  const { setCurrentLayer, setLayers } = useLayerStore();

  useEffect(() => {
    const newAnswer = {};
    const newCubeStates = {};

    Object.entries(answers).forEach((position) => {
      newAnswer[convertCoordinate(position[0], size).join("")] = true;
    });

    defaultPuzzle.forEach((position) => {
      newCubeStates[position.join("")] = {
        isClicked: false,
        isRemoved: false,
        isHidden: false,
      };
    });

    const layers = { x: [], z: [] };

    for (let z = -1 * puzzle.size[2] + 1; z <= puzzle.size[2] - 1; z += 2) {
      layers.z.push(z);
    }

    for (let x = -1 * puzzle.size[0] + 1; x <= puzzle.size[0] - 1; x += 2) {
      layers.x.push(x);
    }

    setLayers(layers);
    setCurrentLayer(puzzle.size[2]);

    setAnswer(newAnswer);
    setIsComplete(false);
    setCubeStates(newCubeStates);
    setCubeStatesHistory([JSON.parse(JSON.stringify(newCubeStates))]);
    setHistoryIndex(0);
  }, [difficulty, stageNumber, defaultPuzzle]);

  return (
    <>
      <group>
        {defaultPuzzle.map((position) => (
          <Cube
            key={position}
            cubeGeometry={cubeGeometry}
            cubeLineGeometry={cubeLineGeometry}
            position={position}
            markingNumbers={markingNumbers}
            positivePosition={revertCoordinate(position, size)}
            colors={colors}
            size={size}
          ></Cube>
        ))}
      </group>

      {!isComplete && (
        <>
          <group>
            {CUBE_CONSTANT.BACK_SCAFFOLD[cameraPosition.join("")].map(
              (position) => (
                <DefaultScaffold
                  key={position}
                  layerPosition={position}
                  size={puzzle.size}
                  color="#ce4817"
                  thickness={1}
                />
              ),
            )}
          </group>

          <group>
            {CUBE_CONSTANT.BACK_SCAFFOLD[cameraPosition.join("")].map(
              (position) => (
                <Scaffold
                  key={position}
                  layerPosition={position}
                  size={puzzle.size}
                  color="#ffffff"
                  thickness={3}
                />
              ),
            )}
          </group>
        </>
      )}
    </>
  );
}

export default Puzzle;
