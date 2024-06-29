import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Mesh, MeshStandardMaterial } from "three";
import { Coordinate } from "../../../types/cube.ts";

useGLTF.preload("/assets/arrow_3d.glb");

interface AxisArrowProps {
  position: Coordinate;
  rotation: Coordinate;
  size: number;
}

function AxisArrow({ position, rotation, size }: AxisArrowProps) {
  const pointerRef = useRef<Mesh>(null!);
  const { nodes, materials } = useGLTF("/assets/arrow_3d.glb");

  useEffect(() => {
    if (pointerRef.current) {
      const material = pointerRef.current.material as MeshStandardMaterial;
      material.color.set("#12e75c");
    }
  }, [pointerRef]);

  return (
    <group position={position} rotation={rotation} scale={[0.05, 0.2, 0.3]}>
      {nodes.Arrow__0 && nodes.Arrow__0 instanceof Mesh && (
        <mesh
          scale={[1, 1 * size, 1]}
          ref={pointerRef}
          geometry={nodes.Arrow__0.geometry}
          material={materials["Scene_-_Root"]}
        />
      )}
    </group>
  );
}

export default AxisArrow;
