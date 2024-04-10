import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import { ResizeObserver } from "@juggle/resize-observer";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Puzzle from "../Puzzle/Puzzle";
import BackGround from "./BackGround";
import AutoCamera from "../Edge/AutoCamera";
import GameStageHeader from "../shared/Header/GameStageHeader";
import GameStageSideBar from "../shared/SideBar/GameStageSideBar";
import GameStageFooter from "../Footer/GameStageFooter";

import getMarkingNumbers from "../../utils/getMarkingNumbers";
import getDefaultPuzzle from "../../utils/getDefaultPuzzle";
import usePuzzlesStore from "../../store/puzzle";
import { useOrbitControlStore, useAnswerStore } from "../../store/store";

import useSetEventClickMode from "../../utils/useSetEventClickMode";
import useSetEventKeySound from "../../utils/useSetEventKeySound";
import usePuzzleEnding from "../../utils/usePuzzleEnding";

const Stage = styled.div`
  position: relative;
  height: 100vh;
`;

function GameStage() {
  const { difficulty, stageNumber } = useParams();
  const [defaultPuzzle, setDefaultPuzzle] = useState([]);
  const [markingNumbers, setMarkingNumbers] = useState({});
  const { puzzles } = usePuzzlesStore();
  const { isOrbitEnable } = useOrbitControlStore();
  const { isComplete, setIsComplete } = useAnswerStore();
  const controls = useRef();
  const camera = useRef();

  const puzzle = puzzles[difficulty][stageNumber];
  const { size, answers, showingNumbers } = puzzle;

  useEffect(() => {
    const numbers = getMarkingNumbers(answers, showingNumbers, size);

    setDefaultPuzzle(getDefaultPuzzle(size));
    setMarkingNumbers(numbers);
    setIsComplete(false);
  }, [difficulty, stageNumber]);

  useSetEventClickMode();
  useSetEventKeySound();
  usePuzzleEnding(camera);

  return (
    <Stage>
      <GameStageHeader
        difficulty={difficulty}
        type="game"
        puzzleTitle={puzzle.title}
        puzzleSize={puzzle.size}
      />
      <GameStageSideBar />
      {isComplete && (
        <GameStageFooter
          difficulty={difficulty}
          puzzleLength={Object.keys(puzzles[difficulty]).length}
          currentIndex={stageNumber}
        />
      )}

      <Canvas resize={{ polyfill: ResizeObserver }}>
        <ambientLight intensity={1} />
        <pointLight position={[0, 15, 20]} />
        <directionalLight intensity={3} position={[-10, -8, -6]} />
        <directionalLight intensity={5} position={[10, 8, 6]} />

        <AutoCamera puzzle={puzzle} />

        <OrthographicCamera
          ref={camera}
          makeDefault
          position={[-12, 12, 12]}
          fov={100}
          near={1}
          far={1000}
          zoom={Math.floor(250 / Math.max(...puzzle.size))}
        />

        <Puzzle
          puzzle={puzzle}
          markingNumbers={markingNumbers}
          defaultPuzzle={defaultPuzzle}
        />
        <BackGround color={puzzle.subColor} />

        <OrbitControls
          ref={controls}
          enableZoom={false}
          enablePan={false}
          enabled={isOrbitEnable}
          enableDamping={false}
        />
      </Canvas>
    </Stage>
  );
}

export default GameStage;
