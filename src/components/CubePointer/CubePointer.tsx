import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group, MeshStandardMaterial } from "three";
import { Coordinate } from "../../../types/cube.ts";

useGLTF.preload("/assets/arrow.glb");

function CubePointer({ position }: { position: Coordinate }) {
  const pointerRef = useRef<Group>(null!);
  const { nodes, materials } = useGLTF("/assets/arrow.glb");

  const material = materials.Material as MeshStandardMaterial;
  material.color.setRGB(255, 255, 255);

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
      {nodes.Plane_Material_0 instanceof Mesh && (
        <mesh
          geometry={nodes.Plane_Material_0.geometry}
          material={materials.Material}
        />
      )}
    </group>
  );
}

export default CubePointer;
