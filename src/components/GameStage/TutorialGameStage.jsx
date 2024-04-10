import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import { ResizeObserver } from "@juggle/resize-observer";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as TWEEN from "@tweenjs/tween.js";

import Puzzle from "../Puzzle/Puzzle";
import BackGround from "./TutorialBackground";
import GameStageHeader from "../shared/Header/GameStageHeader";
import GameStageSideBar from "../shared/SideBar/TutorialStageSideBar";
import GameStageFooter from "../Footer/TutorialStageFooter";
import TutorialScene from "../TutorialScene/TutorialScene";
import PixelPointer from "../CubePointer/PixelPointer";
import CubePointer from "../CubePointer/CubePointer";
import AutoCamera from "../Edge/AutoCamera";

import {
  useClickModeStore,
  useOrbitControlStore,
  useAnswerStore,
  useSoundStore,
  useTutorialStepStore,
} from "../../store/store";
import usePuzzlesStore from "../../store/puzzle";
import { soundCube, soundEnding } from "../../utils/soundEffect";
import getMarkingNumbers from "../../utils/getMarkingNumbers";
import getDefaultPuzzle from "../../utils/getDefaultPuzzle";
import CUBE_CONSTANT from "../../constants/cube";

const Stage = styled.div`
  position: relative;
  height: 100vh;
`;

function TutorialGameStage() {
  const { tutorialStep } = useTutorialStepStore();
  const { puzzles } = usePuzzlesStore();
  const { clickMode, setClickMode } = useClickModeStore();
  const { isOrbitEnable } = useOrbitControlStore();
  const { stageNumber } = useParams();
  const difficulty = "tutorial";
  const { isComplete, setIsComplete } = useAnswerStore();
  const { sound } = useSoundStore();
  const controls = useRef();
  const camera = useRef();

  const puzzle = puzzles[difficulty][stageNumber];
  const { size, answers, showingNumbers } = puzzle;

  const [defaultPuzzle, setDefaultPuzzle] = useState([]);
  const [markingNumbers, setMarkingNumbers] = useState({});

  useEffect(() => {
    setDefaultPuzzle(getDefaultPuzzle(size));
    setIsComplete(false);
  }, [difficulty, stageNumber]);

  useEffect(() => {
    const numbers = getMarkingNumbers(answers, showingNumbers, size);

    setMarkingNumbers(numbers);
  }, [difficulty, stageNumber]);

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
  }, [clickMode, difficulty, stageNumber]);

  useEffect(() => {
    function handleContextMenu(event) {
      const isInside = CUBE_CONSTANT.INSIDE_CUBE_KEYS[event.key];
      const isOutside = CUBE_CONSTANT.OUTSIDE_CUBE_KEYS[event.key];
      const isUndo = CUBE_CONSTANT.UNDO_KEYS[event.key];
      const isRedo = CUBE_CONSTANT.REDO_KEYS[event.key];
      const isModeChange = CUBE_CONSTANT.MODE_CHANGE_KEYS[event.key];

      if (isInside || isOutside || isUndo || isRedo || isModeChange) {
        if (!sound.isMuted) {
          soundCube(sound.effectSound);
        }
      }
    }

    window.addEventListener("keydown", handleContextMenu);
    return () => window.removeEventListener("keydown", handleContextMenu);
  }, [difficulty, stageNumber]);

  useEffect(() => {
    if (camera.current && isComplete) {
      const coords = {
        x: camera.current.position.x,
        y: camera.current.position.y,
        z: camera.current.position.z,
      };

      const tween = new TWEEN.Tween(coords, false)
        .to({ x: 12, y: 12, z: 12 }, 1000)
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

      if (!sound.isMuted) {
        soundEnding(sound.bgmSound);
      }
    }
  }, [isComplete, difficulty, stageNumber]);

  const [pixelPointerPosition, setPixelPointerPosition] = useState([
    -100, 0, 0,
  ]);
  const [pixelPointerRotation, setPixelPointerRotation] = useState([
    0,
    Math.PI / 4,
    Math.PI,
  ]);
  const [cubePointerPosition, setCubePointerPosition] = useState([-100, 0, 0]);
  const [tutorialNumber, setTutorialNumber] = useState(0);
  const [moveDirection, setMoveDirection] = useState("y");

  useEffect(() => {
    if (stageNumber === "1" && tutorialStep[stageNumber] === 4) {
      setPixelPointerPosition([-0.5, 3.5, 0.3]);
      setPixelPointerRotation([0, Math.PI / 4, Math.PI]);
    } else if (stageNumber === "1" && tutorialStep[stageNumber] === 5) {
      setPixelPointerPosition([1.5, 3.5, 0.3]);
      setPixelPointerRotation([0, Math.PI / 4, Math.PI]);
    } else {
      setPixelPointerPosition([-100, 0, 0]);
    }
  }, [tutorialStep["1"]]);

  useEffect(() => {
    if (stageNumber === "2" && tutorialStep[stageNumber] === 2) {
      setPixelPointerPosition([-0.5, 7.5, 0.3]);
      setCubePointerPosition([-1, 5, 2]);
    } else if (stageNumber === "2" && tutorialStep[stageNumber] === 3) {
      setPixelPointerPosition([1.5, 7.5, 0.3]);
      setCubePointerPosition([1, 5, 2]);
    } else {
      setPixelPointerPosition([-100, 0, 0]);
      setCubePointerPosition([-100, 0, 0]);
    }
  }, [tutorialStep["2"]]);

  useEffect(() => {
    if (stageNumber === "3" && tutorialStep[stageNumber] === 2) {
      setPixelPointerPosition([2, 5, 0]);
    } else if (stageNumber === "3" && tutorialStep[stageNumber] === 3) {
      setPixelPointerPosition([2.6, 5, -0.6]);
    } else if (stageNumber === "3" && tutorialStep[stageNumber] === 4) {
      setPixelPointerPosition([5, 2.5, 0.3]);
      setPixelPointerRotation([0, 0, Math.PI / 2 + 0.4]);
      setMoveDirection("x");
    } else if (stageNumber === "3" && tutorialStep[stageNumber] === 5) {
      setPixelPointerPosition([-100, 0, 0]);
      setCubePointerPosition([2, 5, 0]);
    } else {
      setPixelPointerPosition([-100, 0, 0]);
      setCubePointerPosition([-100, 0, 0]);
    }
  }, [tutorialStep["3"]]);

  useEffect(() => {
    if (stageNumber === "1") {
      setTutorialNumber(1);
    } else if (stageNumber === "2") {
      setTutorialNumber(2);
    } else if (stageNumber === "3") {
      setTutorialNumber(3);
    } else if (stageNumber === "4") {
      setTutorialNumber(4);
    }
  }, [stageNumber]);

  return (
    <Stage>
      {tutorialNumber === 1 && <TutorialScene />}
      {tutorialNumber === 2 && <TutorialScene />}
      {tutorialNumber === 3 && <TutorialScene />}
      {tutorialNumber === 4 && <TutorialScene />}

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
        {/* <ambientLight intensity={1} /> */}
        <pointLight position={[0, 15, 20]} />
        <directionalLight intensity={3} position={[-10, -8, -6]} />
        <directionalLight intensity={8} position={[10, 8, 6]} />

        <AutoCamera puzzle={puzzle} />

        <OrthographicCamera
          ref={camera}
          makeDefault
          position={[12, 12, 12]}
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

        {stageNumber === "1" && (
          <PixelPointer
            position={pixelPointerPosition}
            rotation={pixelPointerRotation}
            moveDirection={moveDirection}
          />
        )}
        {stageNumber === "2" && (
          <>
            <PixelPointer
              position={pixelPointerPosition}
              rotation={pixelPointerRotation}
              moveDirection={moveDirection}
            />
            <CubePointer position={cubePointerPosition} />
          </>
        )}
        {stageNumber === "3" && (
          <>
            <PixelPointer
              position={pixelPointerPosition}
              rotation={pixelPointerRotation}
              moveDirection={moveDirection}
            />
            <CubePointer position={cubePointerPosition} />
          </>
        )}
      </Canvas>
    </Stage>
  );
}

export default TutorialGameStage;
