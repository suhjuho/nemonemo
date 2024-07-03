import { useSpring, animated, config } from "@react-spring/three";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";

import { BoxGeometry, CylinderGeometry, Mesh } from "three";
import { ThreeEvent } from "@react-three/fiber";
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
import { CUBE_CONSTANT } from "../../constants/cube.ts";
import { Coordinate } from "../../../types/cube.ts";
import useCheckCurrentLayer from "../../utils/useCheckCurrentLayer.ts";
import checkCubeState from "../../utils/checkCubeState.ts";

interface CustomCubeProps {
  position: Coordinate;
  cubeGeometry: BoxGeometry;
  cubeLineGeometry: CylinderGeometry;
  customCubesState: Record<string, boolean>;
  changeCustomCubesState: (customCubesState: Record<string, boolean>) => void;
  size: [number, number, number];
  cubeColor: string;
  positivePosition: Coordinate;
}

function CustomCube({
  position,
  cubeGeometry,
  cubeLineGeometry,
  customCubesState,
  changeCustomCubesState,
  size,
  cubeColor,
  positivePosition,
}: CustomCubeProps) {
  const cube = useRef<Mesh>(null!);
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

  const { layerDirection } = useLayerStore();

  useEffect(() => {
    if (hasAnswers && hasColors) {
      setIsRemoved(false);
      setClickMode("cube");
    }
  }, [hasColors]);

  useEffect(() => {
    setIsHidden(false);
  }, [layerDirection]);

  useEffect(() => {
    customCubesState[
      revertCoordinate(position, size.map(Number) as Coordinate).join("")
    ] = isRemoved;
    changeCustomCubesState(customCubesState);
  }, [isRemoved]);

  const cubeState = useMemo(
    () => checkCubeState(isClicked, isRemoved, clickMode, isHidden),
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

  useCheckCurrentLayer(position, setIsHidden);

  const handleRightClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      if (!hasAnswers) {
        setOrbitEnableState(false);
        setIsRightClick(true);
        setDragPosition(position);

        setIsClicked(false);
        setIsRemoved(true);
      }
    },
    [setOrbitEnableState, setIsRightClick, setDragPosition, position],
  );

  const handleDrag = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();

      if (isOrbitEnable) {
        return;
      }

      if (hasAnswers) {
        puzzleMaking.colors[
          revertCoordinate(position, size.map(Number) as Coordinate).join("")
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

      if (hasAnswers) {
        puzzleMaking.colors[
          revertCoordinate(position, size.map(Number) as Coordinate).join("")
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
    },
    [
      cubeColor,
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
