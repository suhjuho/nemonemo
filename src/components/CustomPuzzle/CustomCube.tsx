import { useSpring, animated, config } from "@react-spring/three";
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import CubeEdge from "../Cube/CubeEdge.tsx";
import CubeNumbers from "../Cube/CubeNumbers.tsx";

import {
  useClickModeStore,
  useOrbitControlStore,
  useRightClickStore,
  useDragPositionStore,
  useLayerStore,
  useSoundStore,
  useMarkingNumbersStore,
} from "../../store/store.tsx";
import usePuzzleMakingStore from "../../store/making.tsx";
import { soundClick } from "../../utils/soundEffect.ts";
import revertCoordinate from "../../utils/revertCoordinate.ts";
import CUBE_CONSTANT from "../../constants/cube.ts";

function CustomCube({
  position,
  cubeGeometry,
  cubeLineGeometry,
  customCubesState,
  changeCustomCubesState,
  size,
  cubeColor,
  positivePosition,
}) {
  const cube = useRef();
  const [isClicked, setIsClicked] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const { markingNumbers } = useMarkingNumbersStore();
  const { clickMode, setClickMode } = useClickModeStore();
  const { isRightClick, setIsRightClick } = useRightClickStore();
  const { dragPosition, setDragPosition } = useDragPositionStore();
  const { isOrbitEnable, setOrbitEnableState } = useOrbitControlStore();
  const { puzzleMaking, setPuzzleMaking, hasAnswers, hasColors } =
    usePuzzleMakingStore();
  const { sound } = useSoundStore();
  const [answerColor, setAnswerColor] = useState("#ffffff");

  const { layerDirection, layers, currentLayer, setCurrentLayer } =
    useLayerStore();

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

  useEffect(() => {
    if (hasAnswers && hasColors) {
      setIsRemoved(false);
      setClickMode("cube");
    }
  }, [hasColors]);

  useEffect(() => {
    customCubesState[revertCoordinate(position, size.map(Number)).join("")] =
      isRemoved;
    changeCustomCubesState(customCubesState);
  }, [isRemoved]);

  const cubeState = useMemo(
    () => checkCubeState(),
    [isClicked, isRemoved, clickMode, isHidden],
  );

  const { color, opacity } = useSpring({
    color: hasAnswers
      ? answerColor
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

  const handleRightClick = useCallback((event) => {
    event.stopPropagation();
    if (!hasAnswers) {
      setOrbitEnableState(false);
      setIsRightClick(true);
      setDragPosition(position);

      setIsClicked(false);
      setIsRemoved(true);
    }
  });

  const handleDrag = useCallback((event) => {
    event.stopPropagation();

    if (isOrbitEnable) {
      return;
    }

    if (hasAnswers) {
      puzzleMaking.colors[
        revertCoordinate(position, size.map(Number)).join("")
      ] = cubeColor;
      puzzleMaking.mainColor = cubeColor;

      setAnswerColor(cubeColor);
      setPuzzleMaking(puzzleMaking);
    } else {
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
    }

    if (hasAnswers && hasColors) {
      setIsRemoved(!isRemoved);
    }
  });

  const handleDragStart = useCallback((event) => {
    event.stopPropagation();
    setOrbitEnableState(false);

    if (hasAnswers) {
      puzzleMaking.colors[
        revertCoordinate(position, size.map(Number)).join("")
      ] = cubeColor;

      puzzleMaking.mainColor = cubeColor;

      setAnswerColor(cubeColor);
      setPuzzleMaking(puzzleMaking);
    } else {
      if (clickMode === "color") {
        setIsClicked(!isClicked);
      }

      if (clickMode === "cube") {
        setIsClicked(false);
        setIsRemoved(!isRemoved);
      }
    }

    if (hasAnswers && hasColors) {
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
              {hasAnswers && hasColors && (
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

export default CustomCube;
