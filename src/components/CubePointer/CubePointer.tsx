import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

useGLTF.preload("/assets/arrow.glb");

function CubePointer({ position }) {
  const pointerRef = useRef();
  const { nodes, materials } = useGLTF("/assets/arrow.glb");

  materials.Material.color.setRGB(255, 255, 255);

  useFrame((state) => {
    const counter = state.clock.elapsedTime;
    if (Math.floor(counter) % 2 === 0) {
      pointerRef.current.position.y += 0.005;
    } else {
      pointerRef.current.position.y -= 0.005;
    }
  });

  return (
    <group
      ref={pointerRef}
      position={position}
      rotation={[0, 0, -Math.PI / 2]}
      scale={[1, 0.3, 1]}
    >
      <mesh
        geometry={nodes.Plane_Material_0.geometry}
        material={materials.Material}
      />
    </group>
  );
}

export default CubePointer;
