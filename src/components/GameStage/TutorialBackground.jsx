import * as THREE from "three";
import { useParams } from "react-router-dom";
import axios from "axios";

import checkAnswer from "../../utils/checkAnswer";
import { soundClick } from "../../utils/soundEffect";
import usePuzzlesStore from "../../store/puzzle";
import useSolvedPuzzlesStore from "../../store/solvedPuzzles";
import {
  useClickModeStore,
  useCubeStatesStore,
  useOrbitControlStore,
  useRightClickStore,
  useAnswerStore,
  useSoundStore,
  useGameTimeStore,
} from "../../store/store";
import BACKGROUND_CONSTANT from "../../constants/background";

function rank(difficulty, stageNumber, time) {
  async function saveScore() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SAVE_PUZZLE_API}`,
        { score: { difficulty, stageNumber, time } },
      );

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  saveScore();
}

function TutorialBackGround({ color }) {
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
  const { stageNumber } = useParams();
  const { solvedPuzzles, setSolvedPuzzles } = useSolvedPuzzlesStore();
  const { gameTime } = useGameTimeStore();
  const difficulty = "tutorial";

  function handleContextMenu(event) {
    event.stopPropagation();

    if (clickMode === "color") {
      setClickMode("cube");
    } else {
      setClickMode("color");
    }
  }

  const handleDragEnd = (event) => {
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

    if (checkAnswer(answer, cubeStates)) {
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
          rotation={direction.rotation}
          position={direction.position}
          geometry={planeGeometry}
          material={backgroundMaterial}
        />
      ))}
    </group>
  );
}

export default TutorialBackGround;
