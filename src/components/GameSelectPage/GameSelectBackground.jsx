import * as THREE from "three";
import BACKGROUND_CONSTANT from "../../constants/background";

const planeGeometry = new THREE.PlaneGeometry(
  ...BACKGROUND_CONSTANT.GEOMETRY_ARGS,
);
const backgroundMaterial = new THREE.MeshBasicMaterial({
  ...BACKGROUND_CONSTANT.MATERIAL_ARGS,
});

function GameSelectBackground() {
  return (
    <group>
      {BACKGROUND_CONSTANT.DIRECTIONS.map((direction) => (
        <mesh
          key={`${direction.rotation.join("")}`}
          rotation={direction.rotation}
          position={direction.position}
          geometry={planeGeometry}
          material={backgroundMaterial}
        />
      ))}
    </group>
  );
}

export default GameSelectBackground;
