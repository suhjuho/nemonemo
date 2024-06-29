import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useSpring, animated, config } from "@react-spring/three";
import { useParams } from "react-router-dom";

import { BoxGeometry, CylinderGeometry, Mesh } from "three";
import { ThreeEvent } from "@react-three/fiber";
import CubeEdge from "./CubeEdge.tsx";
import CubeNumbers from "./CubeNumbers.tsx";

import usePuzzlesStore from "../../store/puzzle.tsx";
import {
  useAnswerStore,
  useClickModeStore,
  useCubeStatesStore,
  useOrbitControlStore,
  useRightClickStore,
  useDragPositionStore,
  useLayerStore,
  useSoundStore,
  useGameTimeStore,
} from "../../store/store.tsx";
import useSolvedPuzzlesStore from "../../store/solvedPuzzles.tsx";
import checkAnswer from "../../utils/checkAnswer.ts";
import { soundClick } from "../../utils/soundEffect.ts";
import revertCoordinate from "../../utils/revertCoordinate.ts";
import CUBE_CONSTANT from "../../constants/cube.ts";
import saveRank from "../../utils/saveRank.ts";
import { Coordinate, MarkingNumbers } from "../../../types/cube.ts";
import { DifficultyLevel } from "../../../types/puzzle.ts";

interface CubeProps {
  position: Coordinate;
  cubeGeometry: BoxGeometry;
  cubeLineGeometry: CylinderGeometry;
  markingNumbers: MarkingNumbers;
  positivePosition: Coordinate;
  colors: Record<string, string>;
  size: [number, number, number];
}

function Cube({
  position,
  cubeGeometry,
  cubeLineGeometry,
  markingNumbers,
  positivePosition,
  colors,
  size,
}: CubeProps) {
  const cube = useRef<Mesh>(null!);
  const [isClicked, setIsClicked] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const { difficulty = "tutorial", stageNumber } = useParams<{
    difficulty: DifficultyLevel;
    stageNumber: string;
  }>();
  const { gameTime } = useGameTimeStore();
  const { solvedPuzzles, setSolvedPuzzles } = useSolvedPuzzlesStore();
  const { puzzles, setPuzzles } = usePuzzlesStore();
  const { answer, isComplete, setIsComplete } = useAnswerStore();
  const { clickMode, setClickMode } = useClickModeStore();
  const { isRightClick, setIsRightClick } = useRightClickStore();
  const { dragPosition, setDragPosition } = useDragPositionStore();
  const { isOrbitEnable, setOrbitEnableState } = useOrbitControlStore();
  const { sound } = useSoundStore();
  const {
    cubeStates,
    cubeStatesHistory,
    historyIndex,
    setCubeStates,
    setCubeStatesHistory,
    setHistoryIndex,
  } = useCubeStatesStore();
  const { layerDirection, layers, currentLayer } = useLayerStore();

  useEffect(() => {
    setIsClicked(false);
    setIsRemoved(false);
    setIsHidden(false);
    setIsHover(false);
    setClickMode("color");
  }, [stageNumber]);

  useEffect(() => {
    if (isComplete) {
      setIsHidden(false);
    }
  }, [isComplete]);

  function saveCubeStates() {
    cubeStates[position.join("")] = { isClicked, isRemoved, isHidden };
    setCubeStates(cubeStates);
  }

  function checkCubeState() {
    let result: keyof typeof CUBE_CONSTANT.MATERIAL_ARGS = "blank";

    if (!isClicked && !isRemoved) {
      result = "blank";
    }

    if (isClicked && !isRemoved) {
      result = "marked";
    }

    if (!isClicked && isRemoved && clickMode === "color") {
      result = "invisible";
    }

    if (!isClicked && isRemoved && clickMode === "cube") {
      result = "haze";
    }

    if (isHidden) {
      result = "invisible";
    }

    return result;
  }

  const cubeState = useMemo(
    () => checkCubeState(),
    [isClicked, isRemoved, clickMode, isHidden, stageNumber],
  );

  const { color, opacity } = useSpring({
    color: isComplete
      ? colors[revertCoordinate(position, size).join("")]
      : CUBE_CONSTANT.MATERIAL_ARGS[cubeState].color,
    opacity: CUBE_CONSTANT.MATERIAL_ARGS[cubeState].opacity,
    config: config.wobbly,
  });

  const { scale } = useSpring({
    scale: cubeState === "invisible" ? [0.01, 0.01, 0.01] : [1, 1, 1],
    onStart: () => {
      setIsVisible(true);
    },
    onRest: () => {
      if (cubeState === "invisible") {
        setIsVisible(false);
      }
    },
  });

  useEffect(() => {
    setIsHidden(false);
  }, [layerDirection]);

  useEffect(() => {
    saveCubeStates();
  }, [isClicked, isRemoved, clickMode]);

  useEffect(() => {
    const [targetPosition, layer] =
      layerDirection === "FRONT" || layerDirection === "BACK"
        ? [position[2], layers.z]
        : [position[0], layers.x];

    if (layerDirection === "FRONT" || layerDirection === "RIGHT") {
      if (targetPosition <= layer[currentLayer - 1]) {
        setIsHidden(false);
      }

      if (targetPosition > layer[currentLayer - 1]) {
        setIsHidden(true);
      }
    }

    if (layerDirection === "BACK" || layerDirection === "LEFT") {
      if (targetPosition < layer[currentLayer - 1]) {
        setIsHidden(true);
      }

      if (targetPosition >= layer[currentLayer - 1]) {
        setIsHidden(false);
      }
    }
  }, [currentLayer]);

  useEffect(() => {
    const newCubeStates = cubeStatesHistory[historyIndex];

    if (newCubeStates && newCubeStates[position.join("")]) {
      setIsClicked(newCubeStates[position.join("")].isClicked);
      setIsRemoved(newCubeStates[position.join("")].isRemoved);
      setIsHover(false);
    }
  }, [historyIndex]);

  const handleRightClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      setOrbitEnableState(false);
      setIsRightClick(true);
      setDragPosition(position);

      setIsClicked(false);
      setIsRemoved(true);
    },
    [setOrbitEnableState, setIsRightClick, setDragPosition, position],
  );

  const handleDrag = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();

      if (isOrbitEnable) {
        return;
      }

      if (clickMode === "color") {
        if (!isRightClick) {
          setIsClicked(!isClicked);
        } else if (
          (dragPosition[0] === position[0] &&
            dragPosition[1] === position[1]) ||
          (dragPosition[1] === position[1] &&
            dragPosition[2] === position[2]) ||
          (dragPosition[2] === position[2] && dragPosition[0] === position[0])
        ) {
          setIsClicked(false);
          setIsRemoved(!isRemoved);
        }
      }

      if (clickMode === "cube") {
        setIsClicked(false);
        setIsRemoved(!isRemoved);
      }
    },
    [
      isOrbitEnable,
      clickMode,
      isRightClick,
      dragPosition,
      position,
      setIsClicked,
      setIsRemoved,
    ],
  );

  const handleDragStart = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      setOrbitEnableState(false);

      if (clickMode === "color") {
        setIsClicked(!isClicked);
      }

      if (clickMode === "cube") {
        setIsClicked(false);
        setIsRemoved(!isRemoved);
      }
    },
    [
      clickMode,
      setOrbitEnableState,
      isClicked,
      setIsClicked,
      isRemoved,
      setIsRemoved,
    ],
  );

  const handleDragEnd = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setOrbitEnableState(true);
    setIsRightClick(false);
    setDragPosition([]);

    if (!sound.isMuted) {
      soundClick(sound.effectSound);
    }

    if (historyIndex !== cubeStatesHistory.length - 1) {
      cubeStatesHistory.push(
        JSON.parse(JSON.stringify(cubeStatesHistory[historyIndex])),
      );
    }

    cubeStatesHistory.push(JSON.parse(JSON.stringify(cubeStates)));

    setCubeStatesHistory(cubeStatesHistory);
    setHistoryIndex(cubeStatesHistory.length - 1);

    if (checkAnswer(answer, cubeStates) && stageNumber) {
      saveRank(difficulty, stageNumber, gameTime);

      solvedPuzzles[difficulty][stageNumber] = true;
      setSolvedPuzzles(solvedPuzzles);

      setClickMode("color");
      setPuzzles(puzzles);
      setIsComplete(true);
    }
  };

  return (
    <group position={position}>
      {isVisible && (
        <>
          <animated.mesh
            ref={cube}
            onContextMenu={handleRightClick}
            onPointerDown={handleDragStart}
            onPointerUp={handleDragEnd}
            onPointerEnter={handleDrag}
            onPointerOver={() => {
              setIsHover(true);
            }}
            onPointerLeave={() => setIsHover(false)}
            geometry={cubeGeometry}
            scale={scale.to((x, y, z) => [x, y, z])}
          >
            <animated.meshStandardMaterial
              transparent
              color={color}
              opacity={opacity}
              emissive={isHover ? "#5bea5b" : "#000000"}
            />
          </animated.mesh>

          {cubeState !== "invisible" && cubeState !== "haze" && (
            <>
              {!isComplete && (
                <CubeNumbers
                  markingNumbers={markingNumbers}
                  positivePosition={positivePosition}
                />
              )}
              <CubeEdge cubeLineGeometry={cubeLineGeometry} />
            </>
          )}
        </>
      )}
    </group>
  );
}

export default Cube;
