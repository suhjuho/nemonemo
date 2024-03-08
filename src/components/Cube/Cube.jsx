import { useState, useRef } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";

import CUBE_CONSTANT from "../../constants/cube";

function Cube({ position, numbers }) {
  const cube = useRef();
  const [isClicked, setIsClicked] = useState(false);

  const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(2, 2, 2));
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
  const edgeLines = new THREE.LineSegments(edges, lineMaterial);

  function handleClick() {
    setIsClicked(!isClicked);
  }

  return (
    <group position={position}>
      <mesh ref={cube} onClick={handleClick}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={`${isClicked ? "#55cd55" : "#ffffff"}`} />
      </mesh>

      {numbers &&
        numbers.map((number, index) => (
          <Text
            key={`${position.join("")}${CUBE_CONSTANT.LAYERS[index]}`}
            position={CUBE_CONSTANT.LAYERS[index]}
            fontSize={1}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS[index]}
          >
            {number !== null ? number : ""}
          </Text>
        ))}

      <primitive object={edgeLines} />
    </group>
  );
}

export default Cube;
