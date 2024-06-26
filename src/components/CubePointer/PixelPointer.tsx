import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group, MeshStandardMaterial, BufferGeometry } from "three";
import { Coordinate } from "../../../types/cube.ts";

useGLTF.preload("/assets/mouse_arrow.glb");

interface PixelPointerProps {
  position: Coordinate;
  rotation: Coordinate;
  moveDirection: string;
}

interface GLTFNode {
  name: string;
  type: string;
  geometry?: BufferGeometry;
  material?: MeshStandardMaterial;
}

function PixelPointer({
  position,
  rotation,
  moveDirection,
}: PixelPointerProps) {
  const pointerRef = useRef<Group>(null!);
  const { nodes } = useGLTF("/assets/mouse_arrow.glb") as {
    nodes: Record<string, GLTFNode>;
  };
  const [pointer, setPointer] = useState<JSX.Element[]>([]);

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
