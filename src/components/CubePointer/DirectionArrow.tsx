import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Mesh, Group } from "three";

useGLTF.preload("/assets/direction_arrow.glb");

function DirectionArrow({ position, rotation }) {
  const pointerRef = useRef<Group>(null!);
  const { nodes, materials } = useGLTF("/assets/direction_arrow.glb");

  return (
    <group
      ref={pointerRef}
      position={position}
      rotation={rotation}
      scale={[0.5, 0.5, 0.5]}
    >
      {nodes.Arrow_Material001_0 instanceof Mesh && (
        <mesh
          geometry={nodes.Arrow_Material001_0.geometry}
          material={materials["Material.001"]}
        />
      )}
    </group>
  );
}

export default DirectionArrow;
