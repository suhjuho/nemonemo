import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls, Text } from "@react-three/drei";

import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import MainBackGround from "./MainBackGround";
import GameStageHeader from "../Header/GameStageHeader";

const Stage = styled.div`
  position: relative;
  height: 100vh;
`;

function Main() {
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

        <group position={[-4, 0, 0]}>
          <mesh
            onClick={() => navigate("/puzzles/tutorial")}
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
            Easy
          </Text>
        </group>
        <group position={[0, 0, 0]}>
          <mesh
            onClick={() => navigate("/puzzles/normal")}
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
            Normal
          </Text>
        </group>
        <group position={[4, 0, 0]}>
          <mesh
            onClick={() => navigate("/puzzles/hard")}
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
            Hard
          </Text>
        </group>

        <MainBackGround />
        <OrbitControls
          ref={controls}
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.2}
        />
      </Canvas>
    </Stage>
  );
}

export default Main;
