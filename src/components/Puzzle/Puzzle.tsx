import { useParams } from "react-router-dom";

import Cube from "../Cube/Cube.tsx";
import Scaffold from "../Edge/Scaffold.tsx";
import DefaultScaffold from "../Edge/DefaultScaffold.tsx";
import { useAnswerStore, useCameraPositionStore } from "../../store/store.tsx";
import {
  CUBE_CONSTANT,
  CubeGeometry,
  CubeLineGeometry,
} from "../../constants/cube.ts";
import {
  DifficultyLevel,
  Puzzle as PuzzleData,
} from "../../../types/puzzle.ts";
import { MarkingNumbers, DefaultPuzzle } from "../../../types/cube.ts";
import revertCoordinate from "../../utils/revertCoordinate.ts";
import useSetPuzzleData from "../../utils/useSetPuzzleData.tsx";
import useSetGameHistory from "../../utils/useSetGameHistory.tsx";
import useLayerChange from "../../utils/useLayerChange.tsx";

function Puzzle({
  puzzle,
  markingNumbers,
  defaultPuzzle,
}: {
  puzzle: PuzzleData;
  markingNumbers: MarkingNumbers;
  defaultPuzzle: DefaultPuzzle;
}) {
  const { size, colors } = puzzle;
  const { difficulty = "easy", stageNumber = "1" } = useParams<{
    difficulty: DifficultyLevel;
    stageNumber: string;
  }>();

  const { isComplete } = useAnswerStore();
  const { cameraPosition } = useCameraPositionStore();

  useSetPuzzleData(puzzle, defaultPuzzle, difficulty, stageNumber);
  useSetGameHistory();
  useLayerChange();

  return (
    <>
      <group>
        {defaultPuzzle.map((position) => (
          <Cube
            key={position.join("")}
            cubeGeometry={CubeGeometry}
            cubeLineGeometry={CubeLineGeometry}
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
