import { useState, useRef, useEffect } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";

import { useNavigate, useParams } from "react-router-dom";
import {
  useAnswerStore,
  useClickModeStore,
  useDefaultPositionsStore,
  useOrbitControlStore,
  useRightClickStore,
  useDragPositionStore,
} from "../../store/store";
import checkAnswer from "../../utils/checkAnswer";
import CUBE_CONSTANT from "../../constants/cube";

function Cube({ position, numbers }) {
  const cube = useRef();
  const navigate = useNavigate();
  const { difficulty, stageNumber } = useParams();
  const [isClicked, setIsClicked] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [cubeState, setCubeState] = useState("blank");
  const [hoverState, setHoverState] = useState("default");

  const { answer } = useAnswerStore();
  const { clickMode } = useClickModeStore();
  const { isRightClick, setIsRightClick } = useRightClickStore();
  const { dragPosition, setDragPosition } = useDragPositionStore();
  const { isOrbitEnable, setOrbitEnableState } = useOrbitControlStore();
  const { defaultPositions, setDefaultPositions } = useDefaultPositionsStore();

  const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(2, 2, 2));
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
  const edgeLines = new THREE.LineSegments(edges, lineMaterial);

  useEffect(() => {
    if (!isClicked && !isRemoved) {
      setCubeState("blank");
    }

    if (isClicked && !isRemoved) {
      setCubeState("marked");
    }

    if (!isClicked && isRemoved && clickMode === "color") {
      setCubeState("invisible");
    }

    if (!isClicked && isRemoved && clickMode === "cube") {
      setCubeState("haze");
    }
  }, [isClicked, isRemoved, clickMode]);

  function handleRightClick(event) {
    event.stopPropagation();
    setOrbitEnableState(false);
    setIsRightClick(true);
    setDragPosition(position);

    if (clickMode === "color") {
      if (event.type === "click") {
        setIsClicked(!isClicked);

        defaultPositions[position.join("")] =
          !defaultPositions[position.join("")];
      }

      if (event.type === "contextmenu") {
        setIsClicked(false);
        setIsRemoved(true);

        defaultPositions[position.join("")] = false;
      }

      setDefaultPositions(defaultPositions);

      const result = checkAnswer(answer, defaultPositions);

      if (result) {
        navigate(`/completion/${difficulty}/${stageNumber}`);
      }
    }

    if (clickMode === "cube" && event.type === "click") {
      setIsClicked(false);
      setIsRemoved(!isRemoved);

      defaultPositions[position.join("")] = false;

      setDefaultPositions(defaultPositions);

      const result = checkAnswer(answer, defaultPositions);

      if (result) {
        navigate(`/completion/${difficulty}/${stageNumber}`);
      }
    }
  }

  function handleDrag(event) {
    event.stopPropagation();

    if (isOrbitEnable) {
      return;
    }

    if (clickMode === "color") {
      if (!isRightClick) {
        setIsClicked(!isClicked);

        defaultPositions[position.join("")] =
          !defaultPositions[position.join("")];
      } else if (
        (dragPosition[0] === position[0] && dragPosition[1] === position[1]) ||
        (dragPosition[1] === position[1] && dragPosition[2] === position[2]) ||
        (dragPosition[2] === position[2] && dragPosition[0] === position[0])
      ) {
        setIsClicked(false);
        setIsRemoved(!isRemoved);

        defaultPositions[position.join("")] = false;
      }

      setDefaultPositions(defaultPositions);

      const result = checkAnswer(answer, defaultPositions);

      if (result) {
        navigate(`/completion/${difficulty}/${stageNumber}`);
      }
    }

    if (clickMode === "cube") {
      setIsClicked(false);
      setIsRemoved(!isRemoved);

      defaultPositions[position.join("")] = false;

      setDefaultPositions(defaultPositions);

      const result = checkAnswer(answer, defaultPositions);

      if (result) {
        navigate(`/completion/${difficulty}/${stageNumber}`);
      }
    }
  }

  const handleDragStart = (event) => {
    event.stopPropagation();
    setOrbitEnableState(false);

    if (clickMode === "color") {
      setIsClicked(!isClicked);

      defaultPositions[position.join("")] =
        !defaultPositions[position.join("")];
    }

    if (clickMode === "cube") {
      setIsClicked(false);
      setIsRemoved(!isRemoved);

      defaultPositions[position.join("")] = false;
    }

    setDefaultPositions(defaultPositions);

    const result = checkAnswer(answer, defaultPositions);

    if (result) {
      navigate(`/completion/${difficulty}/${stageNumber}`);
    }
  };

  const handleDragEnd = () => {
    setOrbitEnableState(true);
    setIsRightClick(false);
    setDragPosition([]);
  };

  return (
    <group position={position}>
      {cubeState === "invisible" ? null : (
        <>
          <mesh
            ref={cube}
            onContextMenu={handleRightClick}
            onPointerDown={handleDragStart}
            onPointerMissed={handleDragEnd}
            onPointerUp={handleDragEnd}
            onPointerEnter={handleDrag}
            onPointerOver={() => setHoverState("hover")}
            onPointerLeave={() => setHoverState("default")}
          >
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial
              transparent
              {...CUBE_CONSTANT.MATERIAL_ARGS[cubeState]}
              {...CUBE_CONSTANT.HOVER_MATERIAL_ARGS[hoverState]}
            />
          </mesh>
          {numbers &&
            numbers.map((number, index) => (
              <Text
                key={`${position.join("")}${CUBE_CONSTANT.LAYERS[index]}`}
                position={CUBE_CONSTANT.LAYERS[index]}
                fontSize={1}
                color="#000000"
                anchorX="center"
                anchorY="middle"
                rotation={CUBE_CONSTANT.ROTATIONS[index]}
              >
                {number !== null ? number : ""}
              </Text>
            ))}
          <primitive object={edgeLines} />
        </>
      )}
    </group>
  );
}

export default Cube;
