import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import styled from "styled-components";

import Puzzle from "../Puzzle/Puzzle";
import BackGround from "./BackGround";
import GameStageHeader from "../Header/GameStageHeader";
import GameStageSideBar from "../SideBar/GameStageSideBar";
import GameStageFooter from "../Footer/GameStageFooter";

import {
  usePuzzlesStore,
  useClickModeStore,
  useOrbitControlStore,
  useCameraPositionStore,
  useLayerStore,
  useAnswerStore,
} from "../../store/store";
import { GameCompleteModal } from "../GameCompleteModal/GameCompleteModal";

const Stage = styled.div`
  position: relative;
  height: 100vh;
`;

function GameStage() {
  const { puzzles } = usePuzzlesStore();
  const { clickMode, setClickMode } = useClickModeStore();
  const { isOrbitEnable } = useOrbitControlStore();
  const { setCameraPosition } = useCameraPositionStore();
  const { layerDirection, setLayerDirection, setCurrentLayer, setLayers } =
    useLayerStore();
  const { difficulty, stageNumber } = useParams();
  const { isComplete } = useAnswerStore();
  const controls = useRef();
  const camera = useRef();

  const puzzle = puzzles[difficulty][stageNumber];

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

  function checkCameraPosition(cameraPosition) {
    const posX = cameraPosition.x >= 0 ? 1 : 0;
    const posY = cameraPosition.y >= 0 ? 1 : 0;
    const posZ = cameraPosition.z >= 0 ? 1 : 0;

    return [posX, posY, posZ];
  }

  function checkLayerDirection(cameraPosition) {
    const X = cameraPosition.x;
    const Z = cameraPosition.z;

    if (Z < X && Z >= -1 * X) {
      if (layerDirection !== "RIGHT") {
        const newLayers = [];

        for (let x = -1 * puzzle.size[0] + 1; x <= puzzle.size[0] - 1; x += 2) {
          newLayers.push(x);
        }

        setCurrentLayer(puzzle.size[0]);
        setLayers(newLayers);
        setLayerDirection("RIGHT");
      }
    } else if (Z >= X && Z < -1 * X) {
      if (layerDirection !== "LEFT") {
        const newLayers = [];

        for (let x = -1 * puzzle.size[0] + 1; x <= puzzle.size[0] - 1; x += 2) {
          newLayers.push(x);
        }

        setCurrentLayer(1);
        setLayers(newLayers);
        setLayerDirection("LEFT");
      }
    } else if (Z >= X && Z >= -1 * X) {
      if (layerDirection !== "FRONT") {
        const newLayers = [];

        for (let z = -1 * puzzle.size[2] + 1; z <= puzzle.size[2] - 1; z += 2) {
          newLayers.push(z);
        }

        setCurrentLayer(puzzle.size[2]);
        setLayers(newLayers);
        setLayerDirection("FRONT");
      }
    } else if (Z < X && Z < -1 * X) {
      if (layerDirection !== "BACK") {
        const newLayers = [];

        for (let z = -1 * puzzle.size[2] + 1; z <= puzzle.size[2] - 1; z += 2) {
          newLayers.push(z);
        }

        setCurrentLayer(1);
        setLayers(newLayers);
        setLayerDirection("BACK");
      }
    }
  }

  const handleRotate = () => {
    const cam = camera.current;
    const position = cam.position.clone();

    setCameraPosition(checkCameraPosition(position));
    checkLayerDirection(position);
  };

  return (
    <Stage>
      {isComplete && <GameCompleteModal />}
      <GameStageHeader title={puzzle.title} />
      <GameStageSideBar />
      <GameStageFooter />

      <Canvas>
        <ambientLight intensity={1} />
        <pointLight position={[0, 15, 20]} />
        <directionalLight intensity={1} position={[10, 5, -10]} />
        <directionalLight intensity={1} position={[10, 5, 10]} />

        <OrthographicCamera
          ref={camera}
          makeDefault
          position={[-10, 10, 10]}
          fov={100}
          near={1}
          far={1000}
          zoom={Math.floor(300 / Math.max(...puzzle.size))}
        />

        <Puzzle puzzle={puzzle} />
        <BackGround />
        {/* <axesHelper scale={[10, 10, 10]} /> */}

        <OrbitControls
          ref={controls}
          enableZoom={false}
          enablePan={false}
          enabled={isOrbitEnable}
          enableDamping
          dampingFactor={0.2}
          onChange={handleRotate}
        />
      </Canvas>
    </Stage>
  );
}

export default GameStage;
