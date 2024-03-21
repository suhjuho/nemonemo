import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";

import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import * as TWEEN from "@tweenjs/tween.js";

import Puzzle from "../Puzzle/Puzzle";
import BackGround from "./BackGround";
import GameStageHeader from "../Header/GameStageHeader";
import GameStageSideBar from "../SideBar/GameStageSideBar";
import GameStageFooter from "../Footer/GameStageFooter";

import usePuzzlesStore from "../../store/puzzle";

import CUBE_CONSTANT from "../../constants/cube";

import { clickCubeSound } from "../../utils/soundEffect";
import {
  useClickModeStore,
  useOrbitControlStore,
  useAnswerStore,
} from "../../store/store";

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
      const isModeChange = CUBE_CONSTANT.MODE_CHANGE_KEYS[event.key];

      if (isModeChange) {
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

  useEffect(() => {
    function handleContextMenu(event) {
      const isInside = CUBE_CONSTANT.INSIDE_CUBE_KEYS[event.key];
      const isOutside = CUBE_CONSTANT.OUTSIDE_CUBE_KEYS[event.key];
      const isUndo = CUBE_CONSTANT.UNDO_KEYS[event.key];
      const isRedo = CUBE_CONSTANT.REDO_KEYS[event.key];
      const isModeChange = CUBE_CONSTANT.MODE_CHANGE_KEYS[event.key];

      if (isInside || isOutside || isUndo || isRedo || isModeChange) {
        clickCubeSound();
      }
    }

    window.addEventListener("keydown", handleContextMenu);
    return () => window.removeEventListener("keydown", handleContextMenu);
  }, []);

  useEffect(() => {
    if (camera.current && isComplete) {
      const coords = {
        x: camera.current.position.x,
        y: camera.current.position.y,
        z: camera.current.position.z,
      };

      const tween = new TWEEN.Tween(coords, false)
        .to({ x: -12, y: 12, z: 12 }, 1000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() =>
          camera.current.position.set(coords.x, coords.y, coords.z),
        )
        .start();

      function animate(time) {
        tween.update(time);
        requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    }
  }, [isComplete]);

  return (
    <Stage>
      <GameStageHeader
        difficulty={difficulty}
        type="game"
        puzzleTitle={puzzle.title}
      />
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
          zoom={Math.floor(250 / Math.max(...puzzle.size))}
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
