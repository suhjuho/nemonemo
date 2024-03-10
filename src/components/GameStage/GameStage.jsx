import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import styled from "styled-components";

import Puzzle from "../puzzles/Puzzle";
import BackGround from "./BackGround";
import GameStageHeader from "../Header/GameStageHeader";
import GameStageSideBar from "../SideBar/GameStageSideBar";
import GameStageFooter from "../Footer/GameStageFooter";

import {
  usePuzzlesStore,
  useClickModeStore,
  useOrbitControlStore,
} from "../../store/store";

const Stage = styled.div`
  position: relative;
  height: 100vh;
`;

function GameStage() {
  const { puzzles } = usePuzzlesStore();
  const { clickMode, setClickMode } = useClickModeStore();
  const { isOrbitEnable } = useOrbitControlStore();
  const { difficulty, stageNumber } = useParams();
  const controls = useRef();

  useEffect(() => {
    function handleContextMenu(event) {
      if (event.key === "c" || event.key === "C" || event.key === "ㅊ") {
        if (clickMode === "color") {
          setClickMode("cube");
        } else {
          setClickMode("color");
        }
      }
    }

    window.addEventListener("keydown", handleContextMenu);
    return () => window.removeEventListener("keydown", handleContextMenu);
  }, [clickMode]);

  const puzzle = puzzles[difficulty][stageNumber];

  return (
    <Stage>
      <GameStageHeader title={puzzle.title} />
      <GameStageSideBar />
      <GameStageFooter />

      <Canvas>
        <ambientLight intensity={1} />
        <pointLight position={[0, 15, 20]} />
        <directionalLight intensity={1} position={[10, 5, -10]} />
        <directionalLight intensity={1} position={[10, 5, 10]} />

        <OrthographicCamera
          makeDefault
          position={[-10, 10, 10]}
          fov={100}
          near={1}
          far={1000}
          zoom={Math.floor(300 / Math.max(...puzzle.size))}
        />

        <Puzzle puzzle={puzzle} />
        <BackGround />
        <axesHelper scale={[10, 10, 10]} />

        <OrbitControls
          ref={controls}
          enableZoom={false}
          enablePan={false}
          enabled={isOrbitEnable}
        />
      </Canvas>
    </Stage>
  );
}

export default GameStage;
