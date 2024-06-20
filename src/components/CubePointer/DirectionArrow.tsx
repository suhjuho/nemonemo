import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

useGLTF.preload("/assets/direction_arrow.glb");

function DirectionArrow({ position, rotation }) {
  const pointerRef = useRef();
  const { nodes, materials } = useGLTF("/assets/direction_arrow.glb");

  return (
    <group
      ref={pointerRef}
      position={position}
      rotation={rotation}
      scale={[0.5, 0.5, 0.5]}
    >
      <mesh
        geometry={nodes.Arrow_Material001_0.geometry}
        material={materials["Material.001"]}
      />
    </group>
  );
}

export default DirectionArrow;
