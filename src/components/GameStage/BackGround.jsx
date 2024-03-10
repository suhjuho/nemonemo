import {
  useClickModeStore,
  useOrbitControlStore,
  useRightClickStore,
} from "../../store/store";

import BACKGROUND_CONSTANT from "../../constants/background";

function BackGround() {
  const { clickMode, setClickMode } = useClickModeStore();
  const { setOrbitEnableState } = useOrbitControlStore();
  const { setIsRightClick } = useRightClickStore();

  function handleContextMenu(event) {
    event.stopPropagation();

    if (clickMode === "color") {
      setClickMode("cube");
    } else {
      setClickMode("color");
    }
  }

  const handleDragEnd = () => {
    setOrbitEnableState(true);
    setIsRightClick(false);
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
