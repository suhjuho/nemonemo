import { useRef, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls, Text } from "@react-three/drei";

import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import GameSelectBackground from "./GameSelectBackground";
import GameStageHeader from "../Header/GameStageHeader";

const Stage = styled.div`
  position: relative;
  height: 100vh;
`;

function GameSelectPage() {
  const navigate = useNavigate();
  const controls = useRef();
  const camera = useRef();

  const [isHoveredEasy, setIsHoveredEasy] = useState(false);
  const [isHoveredNormal, setIsHoveredNormal] = useState(false);
  const [isHoveredHard, setIsHoveredHard] = useState(false);

  return (
    <Stage>
      <GameStageHeader title="main" />

      <Canvas>
        <ambientLight intensity={1} />
        <pointLight position={[0, 15, 20]} />
        <directionalLight intensity={1} position={[10, 5, -10]} />
        <directionalLight intensity={1} position={[10, 5, 10]} />
        <OrthographicCamera
          ref={camera}
          makeDefault
          position={[0, 0, 10]}
          fov={100}
          near={1}
          far={1000}
          zoom={80}
        />

        {/* <axesHelper scale={[5, 5, 5]} /> */}

        <group position={[-4, 0, 0]}>
          <mesh
            onClick={() => navigate("/puzzles/tutorial/1")}
            onPointerEnter={() => setIsHoveredEasy(true)}
            onPointerLeave={() => setIsHoveredEasy(false)}
          >
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial
              color={isHoveredEasy ? "#8ad71d" : "#9dea30"}
              transparent
            />
          </mesh>
          <Text
            position={[0, 0, 1.01]}
            fontSize={0.5}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={[0, 0, 0]}
          >
            1
          </Text>
        </group>
        <group position={[0, 0, 0]}>
          <mesh
            onClick={() => navigate("/puzzles/tutorial/2")}
            onPointerEnter={() => setIsHoveredNormal(true)}
            onPointerLeave={() => setIsHoveredNormal(false)}
          >
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial
              color={isHoveredNormal ? "#76bade" : "#8ac9eb"}
              transparent
            />
          </mesh>
          <Text
            position={[0, 0, 1.01]}
            fontSize={0.5}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={[0, 0, 0]}
          >
            2
          </Text>
        </group>
        <group position={[4, 0, 0]}>
          <mesh
            onClick={() => navigate("/puzzles/tutorial/3")}
            onPointerEnter={() => setIsHoveredHard(true)}
            onPointerLeave={() => setIsHoveredHard(false)}
          >
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial
              color={isHoveredHard ? "#d748d7" : "#da74da"}
              transparent
            />
          </mesh>
          <Text
            position={[0, 0, 1.01]}
            fontSize={0.5}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={[0, 0, 0]}
          >
            3
          </Text>
        </group>

        <GameSelectBackground />
        <OrbitControls
          ref={controls}
          enableZoom={false}
          enablePan={false}
          // enableRotate={false}
          enableDamping
          dampingFactor={0.2}
        />
      </Canvas>
    </Stage>
  );
}

export default GameSelectPage;
