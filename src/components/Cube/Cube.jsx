import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useSpring, animated, config } from "@react-spring/three";

import { useParams } from "react-router-dom";
import usePuzzlesStore from "../../store/puzzle";
import {
  useAnswerStore,
  useClickModeStore,
  useCubeStatesStore,
  useOrbitControlStore,
  useRightClickStore,
  useDragPositionStore,
  useLayerStore,
  useSoundStore,
} from "../../store/store";
import checkAnswer from "../../utils/checkAnswer";
import CUBE_CONSTANT from "../../constants/cube";

import CubeEdge from "./CubeEdge";
import CubeNumbers from "./CubeNumbers";

import { soundClick } from "../../utils/soundEffect";
import revertCoordinate from "../../utils/revertCoordinate";

function Cube({
  position,
  cubeGeometry,
  cubeLineGeometry,
  markingNumbers,
  positivePosition,
  colors,
  size,
}) {
  const cube = useRef();
  const [isClicked, setIsClicked] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const { puzzles, setPuzzles } = usePuzzlesStore();
  const { difficulty, stageNumber } = useParams();

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
  const { layerDirection, layers, currentLayer, setCurrentLayer } =
    useLayerStore();

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
    let result;
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
    function handleLayerChange(event) {
      const isInside = CUBE_CONSTANT.INSIDE_CUBE_KEYS[event.key];
      const isOutside = CUBE_CONSTANT.OUTSIDE_CUBE_KEYS[event.key];

      const [targetPosition, layer] =
        layerDirection === "FRONT" || layerDirection === "BACK"
          ? [position[2], layers.z]
          : [position[0], layers.x];

      if (isInside) {
        if (CUBE_CONSTANT.INSIDE_DIRECTIONS[layerDirection]) {
          if (currentLayer > 1 && targetPosition === layer[currentLayer - 1]) {
            setIsHidden(true);
            setCurrentLayer(currentLayer - 1);
          }
        } else if (CUBE_CONSTANT.OUTSIDE_DIRECTIONS[layerDirection]) {
          if (
            currentLayer < layer.length &&
            targetPosition === layer[currentLayer - 1]
          ) {
            setIsHidden(true);
            setCurrentLayer(currentLayer + 1);
          }
        }
      }

      if (isOutside) {
        if (CUBE_CONSTANT.INSIDE_DIRECTIONS[layerDirection]) {
          if (targetPosition === layer[currentLayer]) {
            setIsHidden(false);
            setCurrentLayer(currentLayer + 1);
          }
        } else if (CUBE_CONSTANT.OUTSIDE_DIRECTIONS[layerDirection]) {
          if (targetPosition === layer[currentLayer - 2]) {
            setIsHidden(false);
            setCurrentLayer(currentLayer - 1);
          }
        }
      }
    }

    window.addEventListener("keydown", handleLayerChange);
    return () => window.removeEventListener("keydown", handleLayerChange);
  }, [currentLayer, layerDirection, layers, position]);

  useEffect(() => {
    function handleCubeHistory(event) {
      const isUndo = CUBE_CONSTANT.UNDO_KEYS[event.key];
      const isRedo = CUBE_CONSTANT.REDO_KEYS[event.key];

      if (isUndo && historyIndex > 0) {
        const newCubeStates = cubeStatesHistory[historyIndex - 1];

        setHistoryIndex(historyIndex - 1);
        setIsClicked(newCubeStates[position.join("")].isClicked);
        setIsRemoved(newCubeStates[position.join("")].isRemoved);
        setIsHover(false);
      }

      if (isRedo && historyIndex < cubeStatesHistory.length - 1) {
        const newCubeStates = cubeStatesHistory[historyIndex + 1];

        setHistoryIndex(historyIndex + 1);
        setIsClicked(newCubeStates[position.join("")].isClicked);
        setIsRemoved(newCubeStates[position.join("")].isRemoved);
        setIsHover(false);
      }
    }

    window.addEventListener("keydown", handleCubeHistory);
    return () => window.removeEventListener("keydown", handleCubeHistory);
  }, [cubeStates, cubeStatesHistory, historyIndex]);

  const handleRightClick = useCallback((event) => {
    event.stopPropagation();
    setOrbitEnableState(false);
    setIsRightClick(true);
    setDragPosition(position);

    setIsClicked(false);
    setIsRemoved(true);
  });

  const handleDrag = useCallback((event) => {
    event.stopPropagation();

    if (isOrbitEnable) {
      return;
    }

    if (clickMode === "color") {
      if (!isRightClick) {
        setIsClicked(!isClicked);
      } else if (
        (dragPosition[0] === position[0] && dragPosition[1] === position[1]) ||
        (dragPosition[1] === position[1] && dragPosition[2] === position[2]) ||
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
  });

  const handleDragStart = useCallback((event) => {
    event.stopPropagation();
    setOrbitEnableState(false);

    if (clickMode === "color") {
      setIsClicked(!isClicked);
    }

    if (clickMode === "cube") {
      setIsClicked(false);
      setIsRemoved(!isRemoved);
    }
  });

  const handleDragEnd = (event) => {
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

    if (checkAnswer(answer, cubeStates)) {
      if (puzzles[difficulty]) {
        puzzles[difficulty][stageNumber].isSolved = true;
      } else {
        puzzles.tutorial[stageNumber].isSolved = true;
      }

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
            scale={scale}
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
