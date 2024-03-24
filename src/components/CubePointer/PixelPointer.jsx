import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

useGLTF.preload("/assets/mouse_arrow.glb");

function PixelPointer({ position, rotation, moveDirection }) {
  const pointerRef = useRef();
  const { nodes, materials } = useGLTF("/assets/mouse_arrow.glb");
  const [pointer, setPointer] = useState([]);

  useFrame((state) => {
    const counter = state.clock.elapsedTime;
    if (Math.floor(counter) % 2 === 0) {
      if (moveDirection === "y") {
        pointerRef.current.position.y += 0.002;
      } else if (moveDirection === "x") {
        pointerRef.current.position.x += 0.002;
      }
    } else if (moveDirection === "y") {
      pointerRef.current.position.y -= 0.002;
    } else if (moveDirection === "x") {
      pointerRef.current.position.x -= 0.002;
    }
  });

  useEffect(() => {
    Object.values(nodes).forEach((node) => {
      if (node.geometry && node.material) {
        if (node.type === "Mesh") {
          pointer.push(
            <mesh
              key={node.name + Date.now()}
              geometry={node.geometry}
              material={node.material}
            />,
          );
        }
      }
    });

    setPointer(pointer);
  }, []);

  return (
    <group
      ref={pointerRef}
      position={position}
      rotation={rotation}
      scale={[1, 1, 3]}
    >
      {pointer}
    </group>
  );
}

export default PixelPointer;
