import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import styled from "styled-components";

import Puzzle from "../puzzles/Puzzle";
import { usePuzzlesStore } from "../../store/store";

import GameStageHeader from "../Header/GameStageHeader";
import GameStageSideBar from "../SideBar/GameStageSideBar";

function GameStage() {
  const { puzzles } = usePuzzlesStore();
  const { difficulty, stageNumber } = useParams();
  const controls = useRef();

  const puzzle = puzzles[difficulty][stageNumber];

  const Stage = styled.div`
    position: relative;
    height: 100vh;
  `;

  return (
    <Stage>
      <GameStageHeader title={puzzle.title} />
      <GameStageSideBar />

      <Canvas>
        <ambientLight />
        <pointLight position={[0, 15, 20]} />
        <spotLight angle={0.25} penumbra={0.5} position={[10, 10, 5]} />
        <OrthographicCamera
          makeDefault
          position={[-6, 6, 6]}
          fov={40}
          near={0.04}
          far={1000}
          zoom={Math.floor(300 / Math.max(...puzzle.size))}
        />
        <OrbitControls ref={controls} enableZoom={false} />
        <color attach="background" args={["#577D6D"]} />
        <axesHelper scale={[5, 5, 5]} />

        <Puzzle puzzle={puzzle} />
      </Canvas>
    </Stage>
  );
}

export default GameStage;
