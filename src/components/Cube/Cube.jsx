import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useSpring, animated, config } from "@react-spring/three";
import { useParams } from "react-router-dom";
import axios from "axios";

import CubeEdge from "./CubeEdge";
import CubeNumbers from "./CubeNumbers";

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
  useGameTimeStore,
} from "../../store/store";
import useSolvedPuzzlesStore from "../../store/solvedPuzzles";
import checkAnswer from "../../utils/checkAnswer";
import { soundClick } from "../../utils/soundEffect";
import revertCoordinate from "../../utils/revertCoordinate";
import CUBE_CONSTANT from "../../constants/cube";

function rank(difficulty, stageNumber, time) {
  async function saveScore() {
    try {
      await axios.post(`${import.meta.env.VITE_SAVE_PUZZLE_API}`, {
        score: { difficulty, stageNumber, time },
      });
    } catch (error) {
      console.error(error);
    }
  }

  saveScore();
}

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

  const { difficulty = "tutorial", stageNumber } = useParams();
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
    if (newCubeStates[position.join("")]) {
      setIsClicked(newCubeStates[position.join("")].isClicked);
      setIsRemoved(newCubeStates[position.join("")].isRemoved);
      setIsHover(false);
    }
  }, [historyIndex]);

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
      rank(difficulty, stageNumber, gameTime);

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
