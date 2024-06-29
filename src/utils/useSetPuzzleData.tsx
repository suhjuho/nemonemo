import { useEffect } from "react";
import { CubeState, DefaultPuzzle } from "../../types/cube.ts";
import convertCoordinate from "./convertCoordinate.ts";
import {
  useAnswerStore,
  useCubeStatesStore,
  useLayerStore,
} from "../store/store.tsx";
import { DifficultyLevel, Puzzle as PuzzleData } from "../../types/puzzle.ts";

const useSetPuzzleData = (
  puzzle: PuzzleData,
  defaultPuzzle: DefaultPuzzle,
  difficulty: DifficultyLevel,
  stageNumber: string,
) => {
  const { size, answers } = puzzle;
  const { setCurrentLayer, setLayers } = useLayerStore();
  const { setAnswer, setIsComplete } = useAnswerStore();
  const { setCubeStates, setCubeStatesHistory, setHistoryIndex } =
    useCubeStatesStore();

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
};

export default useSetPuzzleData;
