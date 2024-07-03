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

import { useOrbitControlStore, useAnswerStore } from "../../store/store.tsx";
import usePuzzlesStore from "../../store/puzzle.tsx";
import getMarkingNumbers from "../../utils/getMarkingNumbers.ts";
import getDefaultPuzzle from "../../utils/getDefaultPuzzle.ts";
import useSetEventKeySound from "../../utils/useSetEventKeySound.tsx";
import useSetEventClickMode from "../../utils/useSetEventClickMode.tsx";
import usePuzzleEnding from "../../utils/usePuzzleEnding.tsx";
import breakpoints from "../../styles/media.tsx";
import { Puzzle as PuzzleType } from "../../../types/puzzle.ts";
import {
  Coordinate,
  DefaultPuzzle,
  MarkingNumbers,
} from "../../../types/cube.ts";
import useSetTutorialStep from "../../utils/useSetTutorialStep.ts";

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

  const [pixelPointerPosition, setPixelPointerPosition] = useState<Coordinate>([
    -100, 0, 0,
  ]);
  const [pixelPointerRotation, setPixelPointerRotation] = useState<Coordinate>([
    0,
    Math.PI / 4,
    Math.PI,
  ]);
  const [cubePointerPosition, setCubePointerPosition] = useState<Coordinate>([
    -100, 0, 0,
  ]);
  const [moveDirection, setMoveDirection] = useState<"x" | "y">("y");
  const [tutorialNumber, setTutorialNumber] = useState<number>(0);

  useSetTutorialStep(
    stageNumber,
    setPixelPointerPosition,
    setPixelPointerRotation,
    setCubePointerPosition,
    setMoveDirection,
    setTutorialNumber,
  );

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
