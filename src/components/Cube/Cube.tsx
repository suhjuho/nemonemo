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
} from "../../store/store.tsx";
import useSolvedPuzzlesStore from "../../store/solvedPuzzles.tsx";
import checkAnswer from "../../utils/checkAnswer.ts";
import { soundClick } from "../../utils/soundEffect.ts";
import revertCoordinate from "../../utils/revertCoordinate.ts";
import { CUBE_CONSTANT } from "../../constants/cube.ts";
import { Coordinate, MarkingNumbers } from "../../../types/cube.ts";
import { DifficultyLevel } from "../../../types/puzzle.ts";
import checkCubeState from "../../utils/checkCubeState.ts";
import useCheckCurrentLayer from "../../utils/useCheckCurrentLayer.ts";
import useCheckCubeHistory from "../../utils/useCheckCubeHistory.ts";

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

  const { difficulty, stageNumber } = useParams<{
    difficulty: DifficultyLevel;
    stageNumber: string;
  }>();
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
  const { layerDirection } = useLayerStore();

  useEffect(() => {
    setIsClicked(false);
    setIsRemoved(false);
    setIsHidden(false);
    setIsHover(false);
    setClickMode("color");
  }, [stageNumber]);

  useEffect(() => {
    setIsHidden(false);
  }, [layerDirection]);

  useEffect(() => {
    if (isComplete) {
      setIsHidden(false);
    }
  }, [isComplete]);

  const cubeState = useMemo(
    () => checkCubeState(isClicked, isRemoved, clickMode, isHidden),
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
    cubeStates[position.join("")] = { isClicked, isRemoved, isHidden };

    setCubeStates(cubeStates);
  }, [isClicked, isRemoved, clickMode]);

  useCheckCurrentLayer(position, setIsHidden);
  useCheckCubeHistory(position, setIsClicked, setIsRemoved, setIsHover);

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

    if (checkAnswer(answer, cubeStates) && difficulty && stageNumber) {
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
                  color="#000000"
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
