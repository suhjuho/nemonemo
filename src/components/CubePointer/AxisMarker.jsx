import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";

useGLTF.preload("/assets/alphabet_asset.glb");

function AxisX({ position, rotation, size }) {
  const pointerRef = useRef();
  const { nodes } = useGLTF("/assets/alphabet_asset.glb");

  useEffect(() => {
    if (pointerRef) {
      pointerRef.current.material.color.set("#000000");
    }
  }, []);

  return (
    <group position={position} rotation={rotation} scale={[0.5, 0.5, 0.5]}>
      <mesh
        ref={pointerRef}
        geometry={nodes.Object_8.geometry}
        material={nodes.Object_8.material}
      />
    </group>
  );
}

function AxisY({ position, rotation, size }) {
  const pointerRef = useRef();
  const { nodes } = useGLTF("/assets/alphabet_asset.glb");

  useEffect(() => {
    if (pointerRef) {
      pointerRef.current.material.color.set("#000000");
    }
  }, []);

  return (
    <group position={position} rotation={rotation} scale={[0.5, 0.5, 0.5]}>
      <mesh
        ref={pointerRef}
        geometry={nodes.Object_4.geometry}
        material={nodes.Object_4.material}
      />
    </group>
  );
}

function AxisZ({ position, rotation, size }) {
  const pointerRef = useRef();
  const { nodes } = useGLTF("/assets/alphabet_asset.glb");

  useEffect(() => {
    if (pointerRef) {
      pointerRef.current.material.color.set("#000000");
    }
  }, []);

  return (
    <group position={position} rotation={rotation} scale={[0.5, 0.5, 0.5]}>
      <mesh
        ref={pointerRef}
        geometry={nodes.Object_6.geometry}
        material={nodes.Object_6.material}
      />
    </group>
  );
}

export { AxisX, AxisY, AxisZ };
