import { useEffect } from "react";
import * as THREE from "three";

import { useParams } from "react-router-dom";
import convertCoordinate from "../../utils/convertCoordinate.ts";

import {
  useAnswerStore,
  useCubeStatesStore,
  useCameraPositionStore,
  useLayerStore,
} from "../../store/store.tsx";

import Cube from "../Cube/Cube.tsx";

import CUBE_CONSTANT from "../../constants/cube.ts";

import Scaffold from "../Edge/Scaffold.tsx";
import DefaultScaffold from "../Edge/DefaultScaffold.tsx";
import revertCoordinate from "../../utils/revertCoordinate.ts";
import { Puzzle as PuzzleData } from "../../../types/puzzle.ts";
import {
  MarkingNumbers,
  DefaultPuzzle,
  CubeState,
} from "../../../types/cube.ts";

const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const cubeLineGeometry = new THREE.CylinderGeometry(0.03, 0.03, 2, 8);

function Puzzle({
  puzzle,
  markingNumbers,
  defaultPuzzle,
}: {
  puzzle: PuzzleData;
  markingNumbers: MarkingNumbers;
  defaultPuzzle: DefaultPuzzle;
}) {
  const { size, answers, colors } = puzzle;
  const { difficulty, stageNumber } = useParams();

  const { setAnswer, isComplete, setIsComplete } = useAnswerStore();
  const {
    cubeStates,
    cubeStatesHistory,
    historyIndex,
    setCubeStates,
    setCubeStatesHistory,
    setHistoryIndex,
  } = useCubeStatesStore();
  const { cameraPosition } = useCameraPositionStore();
  const { layerDirection, layers, currentLayer, setCurrentLayer, setLayers } =
    useLayerStore();

  useEffect(() => {
    const newAnswer: Record<string, boolean> = {};
    const newCubeStates: Record<string, CubeState> = {};

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

    const puzzleLayers: { x: number[]; z: number[] } = { x: [], z: [] };

    for (let z = -1 * puzzle.size[2] + 1; z <= puzzle.size[2] - 1; z += 2) {
      puzzleLayers.z.push(z);
    }

    for (let x = -1 * puzzle.size[0] + 1; x <= puzzle.size[0] - 1; x += 2) {
      puzzleLayers.x.push(x);
    }

    setLayers(puzzleLayers);
    setCurrentLayer(puzzle.size[2]);

    setAnswer(newAnswer);
    setIsComplete(false);
    setCubeStates(newCubeStates);
    setCubeStatesHistory([JSON.parse(JSON.stringify(newCubeStates))]);
    setHistoryIndex(0);
  }, [difficulty, stageNumber, defaultPuzzle]);

  useEffect(() => {
    function handleCubeHistory(event: KeyboardEvent): void {
      const isUndo = CUBE_CONSTANT.UNDO_KEYS[event.key];
      const isRedo = CUBE_CONSTANT.REDO_KEYS[event.key];

      if (isUndo && historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
      }

      if (isRedo && historyIndex < cubeStatesHistory.length - 1) {
        setHistoryIndex(historyIndex + 1);
      }
    }

    window.addEventListener("keydown", handleCubeHistory);
    return () => window.removeEventListener("keydown", handleCubeHistory);
  }, [cubeStates, cubeStatesHistory, historyIndex]);

  useEffect(() => {
    function handleLayerChange(event: KeyboardEvent): void {
      const isInside = CUBE_CONSTANT.INSIDE_CUBE_KEYS[event.key];
      const isOutside = CUBE_CONSTANT.OUTSIDE_CUBE_KEYS[event.key];

      const layer =
        layerDirection === "FRONT" || layerDirection === "BACK"
          ? layers.z
          : layers.x;

      if (isInside) {
        if (CUBE_CONSTANT.INSIDE_DIRECTIONS[layerDirection]) {
          if (currentLayer > 1) {
            setCurrentLayer(currentLayer - 1);
          }
        } else if (CUBE_CONSTANT.OUTSIDE_DIRECTIONS[layerDirection]) {
          if (currentLayer < layer.length) {
            setCurrentLayer(currentLayer + 1);
          }
        }
      }

      if (isOutside) {
        if (CUBE_CONSTANT.INSIDE_DIRECTIONS[layerDirection]) {
          if (currentLayer < layer.length) {
            setCurrentLayer(currentLayer + 1);
          }
        } else if (CUBE_CONSTANT.OUTSIDE_DIRECTIONS[layerDirection]) {
          if (currentLayer > 1) {
            setCurrentLayer(currentLayer - 1);
          }
        }
      }
    }

    window.addEventListener("keydown", handleLayerChange);
    return () => window.removeEventListener("keydown", handleLayerChange);
  }, [currentLayer, layerDirection, layers]);

  return (
    <>
      <group>
        {defaultPuzzle.map((position) => (
          <Cube
            key={position.join("")}
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
