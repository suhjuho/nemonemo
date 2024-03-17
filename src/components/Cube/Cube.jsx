import React, { useState, useRef, useEffect, useMemo } from "react";

import {
  useAnswerStore,
  useClickModeStore,
  useCubeStatesStore,
  useOrbitControlStore,
  useRightClickStore,
  useDragPositionStore,
  useLayerStore,
} from "../../store/store";
import checkAnswer from "../../utils/checkAnswer";
import CUBE_CONSTANT from "../../constants/cube";

import CubeEdge from "./CubeEdge";
import CubeNumbers from "./CubeNumbers";

function Cube({
  position,
  cubeGeometry,
  cubeLineGeometry,
  markingNumbers,
  positivePosition,
}) {
  const cube = useRef();
  const [isClicked, setIsClicked] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [hoverState, setHoverState] = useState("default");

  const { answer, setIsComplete } = useAnswerStore();
  const { clickMode } = useClickModeStore();
  const { isRightClick, setIsRightClick } = useRightClickStore();
  const { dragPosition, setDragPosition } = useDragPositionStore();
  const { isOrbitEnable, setOrbitEnableState } = useOrbitControlStore();
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
    [isClicked, isRemoved, clickMode, isHidden],
  );

  useEffect(() => {
    setIsHidden(false);
  }, [layerDirection]);

  useEffect(() => {
    saveCubeStates();
  }, [isClicked, isRemoved, clickMode]);

  useEffect(() => {
    function handleLayerChange(event) {
      const isInside = CUBE_CONSTANT.INSIDE_CUBE_KEYS.includes(event.key);
      const isOutside = CUBE_CONSTANT.OUTSIDE_CUBE_KEYS.includes(event.key);

      const targetPosition =
        layerDirection === "FRONT" || layerDirection === "BACK"
          ? position[2]
          : position[0];

      if (isInside) {
        if (CUBE_CONSTANT.INSIDE_DIRECTIONS.includes(layerDirection)) {
          if (currentLayer > 1 && targetPosition === layers[currentLayer - 1]) {
            setIsHidden(true);
            setCurrentLayer(currentLayer - 1);
          }
        } else if (CUBE_CONSTANT.OUTSIDE_DIRECTIONS.includes(layerDirection)) {
          if (
            currentLayer < layers.length &&
            targetPosition === layers[currentLayer - 1]
          ) {
            setIsHidden(true);
            setCurrentLayer(currentLayer + 1);
          }
        }
      }

      if (isOutside) {
        if (CUBE_CONSTANT.INSIDE_DIRECTIONS.includes(layerDirection)) {
          if (targetPosition === layers[currentLayer]) {
            setIsHidden(false);
            setCurrentLayer(currentLayer + 1);
          }
        } else if (CUBE_CONSTANT.OUTSIDE_DIRECTIONS.includes(layerDirection)) {
          if (targetPosition === layers[currentLayer - 2]) {
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
      const isUndo = CUBE_CONSTANT.UNDO_KEYS.includes(event.key);
      const isRedo = CUBE_CONSTANT.REDO_KEYS.includes(event.key);

      if (isUndo && historyIndex > 0) {
        const newCubeStates = cubeStatesHistory[historyIndex - 1];

        setHistoryIndex(historyIndex - 1);
        setIsClicked(newCubeStates[position.join("")].isClicked);
        setIsRemoved(newCubeStates[position.join("")].isRemoved);
        setHoverState("default");
      }

      if (isRedo && historyIndex < cubeStatesHistory.length - 1) {
        const newCubeStates = cubeStatesHistory[historyIndex + 1];

        setHistoryIndex(historyIndex + 1);
        setIsClicked(newCubeStates[position.join("")].isClicked);
        setIsRemoved(newCubeStates[position.join("")].isRemoved);
        setHoverState("default");
      }
    }

    window.addEventListener("keydown", handleCubeHistory);
    return () => window.removeEventListener("keydown", handleCubeHistory);
  }, [cubeStates, cubeStatesHistory, historyIndex]);

  function handleRightClick(event) {
    event.stopPropagation();
    setOrbitEnableState(false);
    setIsRightClick(true);
    setDragPosition(position);

    setIsClicked(false);
    setIsRemoved(true);
  }

  function handleDrag(event) {
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
  }

  const handleDragStart = (event) => {
    event.stopPropagation();
    setOrbitEnableState(false);

    if (clickMode === "color") {
      setIsClicked(!isClicked);
    }

    if (clickMode === "cube") {
      setIsClicked(false);
      setIsRemoved(!isRemoved);
    }
  };

  const handleDragEnd = (event) => {
    event.stopPropagation();
    setOrbitEnableState(true);
    setIsRightClick(false);
    setDragPosition([]);

    if (historyIndex !== cubeStatesHistory.length - 1) {
      cubeStatesHistory.push(
        JSON.parse(JSON.stringify(cubeStatesHistory[historyIndex])),
      );
    }

    cubeStatesHistory.push(JSON.parse(JSON.stringify(cubeStates)));

    setCubeStatesHistory(cubeStatesHistory);
    setHistoryIndex(cubeStatesHistory.length - 1);

    if (checkAnswer(answer, cubeStates)) {
      setIsComplete(true);
    }
  };

  return (
    <group position={position}>
      {cubeState === "invisible" ? null : (
        <>
          <mesh
            ref={cube}
            onContextMenu={handleRightClick}
            onPointerDown={handleDragStart}
            onPointerUp={handleDragEnd}
            onPointerEnter={handleDrag}
            onPointerOver={() => setHoverState("hover")}
            onPointerLeave={() => setHoverState("default")}
            geometry={cubeGeometry}
          >
            <meshStandardMaterial
              transparent
              {...CUBE_CONSTANT.MATERIAL_ARGS[cubeState]}
              {...CUBE_CONSTANT.HOVER_MATERIAL_ARGS[hoverState]}
            />
          </mesh>

          {cubeState !== "haze" && (
            <CubeNumbers
              markingNumbers={markingNumbers}
              positivePosition={positivePosition}
            />
          )}

          <CubeEdge cubeLineGeometry={cubeLineGeometry} />
        </>
      )}
    </group>
  );
}

export default Cube;
