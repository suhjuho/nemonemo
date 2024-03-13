import { useNavigate, useParams } from "react-router-dom";

import {
  useClickModeStore,
  useCubeStatesStore,
  useOrbitControlStore,
  useRightClickStore,
  useAnswerStore,
} from "../../store/store";

import BACKGROUND_CONSTANT from "../../constants/background";

import checkAnswer from "../../utils/checkAnswer";

function BackGround() {
  const navigate = useNavigate();
  const { difficulty, stageNumber } = useParams();
  const { clickMode, setClickMode } = useClickModeStore();
  const { setOrbitEnableState } = useOrbitControlStore();
  const { setIsRightClick } = useRightClickStore();
  const { answer } = useAnswerStore();
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
      navigate(`/completion/${difficulty}/${stageNumber}`);
    }
  };

  return (
    <>
      {/* y-wall bottom ceil */}
      <mesh
        onContextMenu={handleContextMenu}
        onPointerUp={handleDragEnd}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -100, 0]}
      >
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial {...BACKGROUND_CONSTANT.MATERIAL_ARGS} />
      </mesh>

      <mesh
        onContextMenu={handleContextMenu}
        onPointerUp={handleDragEnd}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 100, 0]}
      >
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial {...BACKGROUND_CONSTANT.MATERIAL_ARGS} />
      </mesh>

      {/* x-wall */}
      <mesh
        onContextMenu={handleContextMenu}
        onPointerUp={handleDragEnd}
        rotation={[0, -Math.PI / 2, -Math.PI / 2]}
        position={[100, 0, 0]}
      >
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial {...BACKGROUND_CONSTANT.MATERIAL_ARGS} />
      </mesh>

      <mesh
        onContextMenu={handleContextMenu}
        onPointerUp={handleDragEnd}
        rotation={[0, Math.PI / 2, -Math.PI / 2]}
        position={[-100, 0, 0]}
      >
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial {...BACKGROUND_CONSTANT.MATERIAL_ARGS} />
      </mesh>

      {/* z-wall */}
      <mesh
        onContextMenu={handleContextMenu}
        onPointerUp={handleDragEnd}
        rotation={[0, 0, -Math.PI / 2]}
        position={[0, 0, -100]}
      >
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial {...BACKGROUND_CONSTANT.MATERIAL_ARGS} />
      </mesh>

      <mesh
        onContextMenu={handleContextMenu}
        onPointerUp={handleDragEnd}
        rotation={[0, Math.PI, -Math.PI / 2]}
        position={[0, 0, 100]}
      >
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial {...BACKGROUND_CONSTANT.MATERIAL_ARGS} />
      </mesh>
    </>
  );
}

export default BackGround;
