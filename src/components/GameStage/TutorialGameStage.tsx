import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import { OrthographicCamera as OrthographicCameraType } from "three";
import { OrbitControls as OrbitControlsType } from "three-stdlib";
import { ResizeObserver } from "@juggle/resize-observer";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Puzzle from "../Puzzle/Puzzle.tsx";
import BackGround from "./TutorialBackground.tsx";
import GameStageHeader from "../shared/Header/GameStageHeader.tsx";
import GameStageSideBar from "../shared/SideBar/TutorialStageSideBar.tsx";
import GameStageFooter from "../Footer/TutorialStageFooter.tsx";
import TutorialScene from "../TutorialScene/TutorialScene.tsx";
import PixelPointer from "../CubePointer/PixelPointer.tsx";
import CubePointer from "../CubePointer/CubePointer.tsx";
import AutoCamera from "../Edge/AutoCamera.tsx";

import {
  useOrbitControlStore,
  useAnswerStore,
  useTutorialStepStore,
} from "../../store/store.tsx";
import usePuzzlesStore from "../../store/puzzle.tsx";
import getMarkingNumbers from "../../utils/getMarkingNumbers.ts";
import getDefaultPuzzle from "../../utils/getDefaultPuzzle.ts";
import useSetEventKeySound from "../../utils/useSetEventKeySound.tsx";
import useSetEventClickMode from "../../utils/useSetEventClickMode.tsx";
import usePuzzleEnding from "../../utils/usePuzzleEnding.tsx";
import breakpoints from "../../styles/media.tsx";
import { Puzzle as PuzzleType } from "../../../types/puzzle.ts";
import { DefaultPuzzle, MarkingNumbers } from "../../../types/cube.ts";

const Stage = styled.div`
  position: relative;
  height: 100vh;
`;

function TutorialGameStage() {
  const difficulty = "tutorial";
  const { stageNumber } = useParams<{ stageNumber: string }>();
  const [defaultPuzzle, setDefaultPuzzle] = useState<DefaultPuzzle>(null!);
  const [markingNumbers, setMarkingNumbers] = useState<MarkingNumbers>(null!);
  const { puzzles } = usePuzzlesStore();
  const { isOrbitEnable } = useOrbitControlStore();
  const { isComplete, setIsComplete } = useAnswerStore();
  const { tutorialStep } = useTutorialStepStore();
  const controls = useRef<OrbitControlsType>(null!);
  const camera = useRef<OrthographicCameraType>(null!);
  const mediaQueryList = window.matchMedia(`(max-width: ${breakpoints.md})`);
  let puzzle: PuzzleType = null!;

  if (difficulty && stageNumber) {
    puzzle = puzzles[difficulty][stageNumber];
  }

  const { size, answers, showingNumbers } = puzzle as PuzzleType;

  useEffect(() => {
    const numbers = getMarkingNumbers(answers, showingNumbers, size);

    setDefaultPuzzle(getDefaultPuzzle(size));
    setMarkingNumbers(numbers);
    setIsComplete(false);
  }, [difficulty, stageNumber]);

  useSetEventClickMode();
  useSetEventKeySound();
  usePuzzleEnding(camera);

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
          currentIndex={Number(stageNumber)}
        />
      )}

      <Canvas resize={{ polyfill: ResizeObserver }}>
        <ambientLight intensity={1} />
        <pointLight position={[0, 15, 20]} />
        <directionalLight intensity={3} position={[-10, -8, -6]} />
        <directionalLight intensity={8} position={[10, 8, 6]} />

        <AutoCamera puzzle={puzzle} />

        <OrthographicCamera
          ref={camera}
          makeDefault
          position={[12, 12, 12]}
          near={1}
          far={1000}
          zoom={
            mediaQueryList.matches
              ? Math.floor(120 / Math.max(...puzzle.size))
              : Math.floor(250 / Math.max(...puzzle.size))
          }
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
