import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";

import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Puzzle from "../Puzzle/Puzzle";
import BackGround from "./BackGround";
import GameStageHeader from "../Header/GameStageHeader";
import GameStageSideBar from "../SideBar/GameStageSideBar";
import GameStageFooter from "../Footer/GameStageFooter";

import usePuzzlesStore from "../../store/puzzle";

import {
  useClickModeStore,
  useOrbitControlStore,
  useAnswerStore,
} from "../../store/store";

import { GameCompleteModal } from "../GameCompleteModal/GameCompleteModal";
import AutoCamera from "../Edge/AutoCamera";

import getMarkingNumbers from "../../utils/getMarkingNumbers";
import getDefaultPuzzle from "../../utils/getDefaultPuzzle";

const Stage = styled.div`
  position: relative;
  height: 100vh;
`;

function GameStage() {
  const { puzzles } = usePuzzlesStore();
  const { clickMode, setClickMode } = useClickModeStore();
  const { isOrbitEnable } = useOrbitControlStore();
  const { difficulty, stageNumber } = useParams();
  const { isComplete } = useAnswerStore();
  const controls = useRef();
  const camera = useRef();

  const puzzle = puzzles[difficulty][stageNumber];
  const { size, answers, showingNumbers } = puzzle;

  const defaultPuzzle = getDefaultPuzzle(size);
  const [markingNumbers, setMarkingNumbers] = useState({});

  useEffect(() => {
    const numbers = getMarkingNumbers(answers, showingNumbers, size);

    setMarkingNumbers(numbers);
  }, []);

  useEffect(() => {
    function handleContextMenu(event) {
      if (event.key === "c" || event.key === "C" || event.key === "ㅊ") {
        if (clickMode === "color") {
          setClickMode("cube");
        } else {
          setClickMode("color");
        }
      }
    }

    window.addEventListener("keydown", handleContextMenu);
    return () => window.removeEventListener("keydown", handleContextMenu);
  }, [clickMode]);

  return (
    <Stage>
      {isComplete && <GameCompleteModal />}
      <GameStageHeader title={puzzle.title} />
      <GameStageSideBar />
      <GameStageFooter />

      <Canvas>
        <ambientLight intensity={1} />
        <pointLight position={[0, 15, 20]} />
        <directionalLight intensity={1} position={[10, 5, -10]} />
        <directionalLight intensity={1} position={[10, 5, 10]} />

        <AutoCamera puzzle={puzzle} />

        <OrthographicCamera
          ref={camera}
          makeDefault
          position={[-12, 12, 12]}
          fov={100}
          near={1}
          far={1000}
          zoom={Math.floor(300 / Math.max(...puzzle.size))}
        />

        <Puzzle
          puzzle={puzzle}
          markingNumbers={markingNumbers}
          defaultPuzzle={defaultPuzzle}
        />
        <BackGround />

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
