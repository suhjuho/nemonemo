import * as THREE from "three";
import {
  useClickModeStore,
  useCubeStatesStore,
  useOrbitControlStore,
  useRightClickStore,
  useAnswerStore,
} from "../../store/store";

import BACKGROUND_CONSTANT from "../../constants/background";

import checkAnswer from "../../utils/checkAnswer";
import { clickColorSound } from "../../utils/soundEffect";

const planeGeometry = new THREE.PlaneGeometry(
  ...BACKGROUND_CONSTANT.GEOMETRY_ARGS,
);
const backgroundMaterial = new THREE.MeshBasicMaterial({
  ...BACKGROUND_CONSTANT.MATERIAL_ARGS,
});

function BackGround() {
  const { clickMode, setClickMode } = useClickModeStore();
  const { setOrbitEnableState } = useOrbitControlStore();
  const { isRightClick, setIsRightClick } = useRightClickStore();
  const { answer, setIsComplete } = useAnswerStore();
  const {
    cubeStates,
    cubeStatesHistory,
    historyIndex,
    setCubeStatesHistory,
    setHistoryIndex,
  } = useCubeStatesStore();

  function handleContextMenu(event) {
    event.stopPropagation();

    if (clickMode === "color") {
      setClickMode("cube");
    } else {
      setClickMode("color");
    }
  }

  const handleDragEnd = (event) => {
    event.stopPropagation();
    setOrbitEnableState(true);

    if (isRightClick) {
      clickColorSound();
    }

    setIsRightClick(false);

    if (
      JSON.stringify(cubeStates) !==
      JSON.stringify(cubeStatesHistory[historyIndex])
    ) {
      cubeStatesHistory.push(JSON.parse(JSON.stringify(cubeStates)));

      setCubeStatesHistory(cubeStatesHistory);
      setHistoryIndex(cubeStatesHistory.length - 1);
    }

    if (checkAnswer(answer, cubeStates)) {
      setIsComplete(true);
    }
  };

  return (
    <group>
      {BACKGROUND_CONSTANT.DIRECTIONS.map((direction) => (
        <mesh
          key={`${direction.rotation.join("")}`}
          onContextMenu={handleContextMenu}
          onPointerUp={handleDragEnd}
          rotation={direction.rotation}
          position={direction.position}
          geometry={planeGeometry}
          material={backgroundMaterial}
        />
      ))}
    </group>
  );
}

export default BackGround;
