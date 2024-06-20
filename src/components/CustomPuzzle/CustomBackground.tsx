import * as THREE from "three";

import {
  useClickModeStore,
  useOrbitControlStore,
  useRightClickStore,
  useSoundStore,
} from "../../store/store.tsx";
import { soundClick } from "../../utils/soundEffect.ts";
import BACKGROUND_CONSTANT from "../../constants/background.ts";

const planeGeometry = new THREE.PlaneGeometry(
  ...BACKGROUND_CONSTANT.GEOMETRY_ARGS,
);

function CustomBackground({ color }) {
  const backgroundMaterial = new THREE.MeshBasicMaterial({
    color,
  });

  const { clickMode, setClickMode } = useClickModeStore();
  const { setOrbitEnableState } = useOrbitControlStore();
  const { isRightClick, setIsRightClick } = useRightClickStore();
  const { sound } = useSoundStore();

  function handleContextMenu(event) {
    event.stopPropagation();

    if (clickMode === "color") {
      setClickMode("cube");
    } else {
      setClickMode("color");
    }
  }

  const handleDragStart = (event) => {
    event.stopPropagation();
  };

  const handleDragEnd = (event) => {
    event.stopPropagation();
    setOrbitEnableState(true);

    if (isRightClick) {
      if (!sound.isMuted) {
        soundClick(sound.effectSound);
      }
    }

    setIsRightClick(false);
  };

  return (
    <group>
      {BACKGROUND_CONSTANT.DIRECTIONS.map((direction) => (
        <mesh
          key={`${direction.rotation.join("")}`}
          onContextMenu={handleContextMenu}
          onPointerDown={handleDragStart}
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

export default CustomBackground;
