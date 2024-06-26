import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Mesh, MeshStandardMaterial } from "three";
import { Coordinate } from "../../../types/cube.ts";

useGLTF.preload("/assets/alphabet_asset.glb");

interface AxisProps {
  position: Coordinate;
  rotation: Coordinate;
}

function AxisX({ position, rotation }: AxisProps) {
  const pointerRef = useRef<Mesh>(null!);
  const { nodes } = useGLTF("/assets/alphabet_asset.glb");

  useEffect(() => {
    if (pointerRef.current) {
      const material = pointerRef.current.material as MeshStandardMaterial;
      material.color.set("#000000");
    }
  }, [pointerRef]);

  return (
    <group position={position} rotation={rotation} scale={[0.5, 0.5, 0.5]}>
      {nodes.Object_8 && nodes.Object_8 instanceof Mesh && (
        <mesh
          ref={pointerRef}
          geometry={nodes.Object_8.geometry}
          material={nodes.Object_8.material}
        />
      )}
    </group>
  );
}

function AxisY({ position, rotation }) {
  const pointerRef = useRef<Mesh>(null!);
  const { nodes } = useGLTF("/assets/alphabet_asset.glb");

  useEffect(() => {
    if (pointerRef.current) {
      const material = pointerRef.current.material as MeshStandardMaterial;
      material.color.set("#000000");
    }
  }, [pointerRef]);

  return (
    <group position={position} rotation={rotation} scale={[0.5, 0.5, 0.5]}>
      {nodes.Object_4 && nodes.Object_4 instanceof Mesh && (
        <mesh
          ref={pointerRef}
          geometry={nodes.Object_4.geometry}
          material={nodes.Object_4.material}
        />
      )}
      ;
    </group>
  );
}

function AxisZ({ position, rotation }) {
  const pointerRef = useRef<Mesh>(null!);
  const { nodes } = useGLTF("/assets/alphabet_asset.glb");

  useEffect(() => {
    if (pointerRef.current) {
      const material = pointerRef.current.material as MeshStandardMaterial;
      material.color.set("#000000");
    }
  }, [pointerRef]);

  return (
    <group position={position} rotation={rotation} scale={[0.5, 0.5, 0.5]}>
      {nodes.Object_6 && nodes.Object_6 instanceof Mesh && (
        <mesh
          ref={pointerRef}
          geometry={nodes.Object_6.geometry}
          material={nodes.Object_6.material}
        />
      )}
    </group>
  );
}

export { AxisX, AxisY, AxisZ };
