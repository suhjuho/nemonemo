import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";

useGLTF.preload("/assets/arrow_3d.glb");

function AxisArrow({ position, rotation, size }) {
  const pointerRef = useRef();
  const { nodes, materials } = useGLTF("/assets/arrow_3d.glb");

  useEffect(() => {
    if (pointerRef) {
      pointerRef.current.material.color.set("#12e75c");
      pointerRef.current.material.opacity = 0.1;
    }
  }, [pointerRef]);

  return (
    <group position={position} rotation={rotation} scale={[0.05, 0.2, 0.3]}>
      <mesh
        scale={[1, 1 * size, 1]}
        ref={pointerRef}
        geometry={nodes.Arrow__0.geometry}
        material={materials["Scene_-_Root"]}
      />
    </group>
  );
}

export default AxisArrow;
