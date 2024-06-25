import * as THREE from "three";
import { useParams } from "react-router-dom";
import axios from "axios";

import { ThreeEvent } from "@react-three/fiber";
import checkAnswer from "../../utils/checkAnswer.ts";
import { soundClick } from "../../utils/soundEffect.ts";
import usePuzzlesStore from "../../store/puzzle.tsx";
import useSolvedPuzzlesStore from "../../store/solvedPuzzles.tsx";
import {
  useClickModeStore,
  useCubeStatesStore,
  useOrbitControlStore,
  useRightClickStore,
  useAnswerStore,
  useSoundStore,
  useGameTimeStore,
} from "../../store/store.tsx";
import BACKGROUND_CONSTANT from "../../constants/background.ts";
import { DifficultyLevel } from "../../../types/puzzle.ts";

function rank(difficulty: DifficultyLevel, stageNumber: string, time: number) {
  async function saveScore() {
    try {
      await axios.post(`${import.meta.env.VITE_SAVE_PUZZLE_API}`, {
        score: { difficulty, stageNumber, time },
      });
    } catch (error) {
      console.error(error);
    }
  }

  saveScore();
}

function TutorialBackGround({ color }: { color: string }) {
  const planeGeometry = new THREE.PlaneGeometry(
    ...BACKGROUND_CONSTANT.GEOMETRY_ARGS,
  );
  const backgroundMaterial = new THREE.MeshBasicMaterial({
    color,
  });
  const { clickMode, setClickMode } = useClickModeStore();
  const { setOrbitEnableState } = useOrbitControlStore();
  const { isRightClick, setIsRightClick } = useRightClickStore();
  const { answer, setIsComplete } = useAnswerStore();
  const { sound } = useSoundStore();
  const {
    cubeStates,
    cubeStatesHistory,
    historyIndex,
    setCubeStatesHistory,
    setHistoryIndex,
  } = useCubeStatesStore();
  const { puzzles, setPuzzles } = usePuzzlesStore();
  const { solvedPuzzles, setSolvedPuzzles } = useSolvedPuzzlesStore();
  const { stageNumber } = useParams<{ stageNumber: string }>();
  const { gameTime } = useGameTimeStore();
  const difficulty = "tutorial";

  function handleContextMenu(event: ThreeEvent<MouseEvent>): void {
    event.stopPropagation();

    if (clickMode === "color") {
      setClickMode("cube");
    } else {
      setClickMode("color");
    }
  }

  const handleDragEnd = (event: ThreeEvent<PointerEvent>): void => {
    event.stopPropagation();
    setOrbitEnableState(true);

    if (isRightClick) {
      if (!sound.isMuted) {
        soundClick(sound.effectSound);
      }
    }

    setIsRightClick(false);

    if (
      JSON.stringify(cubeStates) !==
      JSON.stringify(cubeStatesHistory[historyIndex])
    ) {
      cubeStatesHistory.push(JSON.parse(JSON.stringify(cubeStates)));

      setCubeStatesHistory(cubeStatesHistory);
      setHistoryIndex(cubeStatesHistory.length - 1);
    }

    if (checkAnswer(answer, cubeStates) && difficulty && stageNumber) {
      rank(difficulty, stageNumber, gameTime);

      solvedPuzzles[difficulty][stageNumber] = true;
      setSolvedPuzzles(solvedPuzzles);

      setClickMode("color");
      setPuzzles(puzzles);
      setIsComplete(true);
    }
  };

  return (
    <group>
      {BACKGROUND_CONSTANT.DIRECTIONS.map((direction) => (
        <mesh
          key={`${direction.rotation.join("")}`}
          onContextMenu={handleContextMenu}
          onPointerUp={handleDragEnd}
          rotation={new THREE.Euler(...direction.rotation)}
          position={new THREE.Vector3(...direction.position)}
          geometry={planeGeometry}
          material={backgroundMaterial}
        />
      ))}
    </group>
  );
}

export default TutorialBackGround;
