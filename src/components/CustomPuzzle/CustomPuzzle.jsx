import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import { ResizeObserver } from "@juggle/resize-observer";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import AutoCamera from "../Edge/AutoCamera";
import CustomBackground from "./CustomBackground";
import GameStageSideBar from "../shared/SideBar/GameStageSideBar";
import getDefaultPuzzle from "../../utils/getDefaultPuzzle";
import CustomPuzzleHeader from "./CustomPuzzleHeader";
import CustomPuzzleFooter from "./CustomPuzzleFooter";
import CustomPuzzleColorPicker from "./CustomPuzzleColorPicker";
import CustomPuzzleTable from "./CustomPuzzleTable";
import CustomCube from "./CustomCube";
import Scaffold from "../Edge/Scaffold";
import DefaultScaffold from "../Edge/DefaultScaffold";
import AxisArrow from "../CubePointer/AxisArrow";
import { AxisX, AxisY, AxisZ } from "../CubePointer/AxisMarker";

import {
  useCameraPositionStore,
  useClickModeStore,
  useLayerStore,
  useOrbitControlStore,
  useSoundStore,
} from "../../store/store";
import usePuzzleMakingStore from "../../store/making";
import revertCoordinate from "../../utils/revertCoordinate";
import { soundCube } from "../../utils/soundEffect";
import CUBE_CONSTANT from "../../constants/cube";

const Stage = styled.div`
  position: relative;
  height: 100vh;
`;

const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const cubeLineGeometry = new THREE.CylinderGeometry(0.03, 0.03, 2, 8);

function CustomPuzzle() {
  const { clickMode, setClickMode } = useClickModeStore();
  const { isOrbitEnable } = useOrbitControlStore();
  const { sound } = useSoundStore();
  const { puzzleMaking, setPuzzleMaking, hasAnswers, hasColors } =
    usePuzzleMakingStore();
  const { setCurrentLayer, setLayers } = useLayerStore();
  const controls = useRef();
  const camera = useRef();

  const [defaultPuzzle, setDefaultPuzzle] = useState([]);
  const [customCubesState, setCustomCubesState] = useState({});
  const [cubeColor, setCubeColor] = useState("#ffffff");
  const { cameraPosition } = useCameraPositionStore();

  useEffect(() => {
    const defaultPositions = getDefaultPuzzle(puzzleMaking.size);
    setDefaultPuzzle(defaultPositions);

    const showing = { layerX: {}, layerY: {}, layerZ: {} };

    for (let y = 0; y < puzzleMaking.size[1]; y += 1) {
      for (let z = 0; z < puzzleMaking.size[2]; z += 1) {
        showing.layerX[`${y}${z}`] = true;
      }
    }

    for (let x = 0; x < puzzleMaking.size[0]; x += 1) {
      for (let z = 0; z < puzzleMaking.size[2]; z += 1) {
        showing.layerY[`${x}${z}`] = true;
      }
    }

    for (let x = 0; x < puzzleMaking.size[0]; x += 1) {
      for (let y = 0; y < puzzleMaking.size[1]; y += 1) {
        showing.layerZ[`${x}${y}`] = true;
      }
    }

    puzzleMaking.showingNumbers = showing;
    setPuzzleMaking(puzzleMaking);

    const cubesStates = [];

    defaultPositions.forEach((defaultPosition) => {
      cubesStates[
        revertCoordinate(defaultPosition, puzzleMaking.size.map(Number)).join(
          "",
        )
      ] = true;
    });

    setCustomCubesState(cubesStates);

    const layers = { x: [], z: [] };

    for (
      let z = -1 * puzzleMaking.size[2] + 1;
      z <= puzzleMaking.size[2] - 1;
      z += 2
    ) {
      layers.z.push(z);
    }

    for (
      let x = -1 * puzzleMaking.size[0] + 1;
      x <= puzzleMaking.size[0] - 1;
      x += 2
    ) {
      layers.x.push(x);
    }

    setLayers(layers);
    setCurrentLayer(puzzleMaking.size[2]);
  }, [puzzleMaking.size[0], puzzleMaking.size[1], puzzleMaking.size[2]]);

  useEffect(() => {
    function handleContextMenu(event) {
      const isModeChange = CUBE_CONSTANT.MODE_CHANGE_KEYS[event.key];

      if (isModeChange) {
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

  useEffect(() => {
    function handleContextMenu(event) {
      const isInside = CUBE_CONSTANT.INSIDE_CUBE_KEYS[event.key];
      const isOutside = CUBE_CONSTANT.OUTSIDE_CUBE_KEYS[event.key];
      const isUndo = CUBE_CONSTANT.UNDO_KEYS[event.key];
      const isRedo = CUBE_CONSTANT.REDO_KEYS[event.key];
      const isModeChange = CUBE_CONSTANT.MODE_CHANGE_KEYS[event.key];

      if (isInside || isOutside || isUndo || isRedo || isModeChange) {
        if (!sound.isMuted) {
          soundCube(sound.effectSound);
        }
      }
    }

    window.addEventListener("keydown", handleContextMenu);
    return () => window.removeEventListener("keydown", handleContextMenu);
  }, []);

  return (
    <Stage>
      <CustomPuzzleHeader />
      <GameStageSideBar />
      {hasAnswers && !hasColors && (
        <CustomPuzzleColorPicker
          cubeColor={cubeColor}
          handleCubeColor={setCubeColor}
        />
      )}

      {hasAnswers && hasColors && (
        <CustomPuzzleTable size={puzzleMaking.size} />
      )}

      <CustomPuzzleFooter customCubesState={customCubesState} />

      <Canvas resize={{ polyfill: ResizeObserver }}>
        <ambientLight intensity={1} />
        <pointLight position={[0, 15, 20]} />
        <directionalLight intensity={3} position={[-10, -8, -6]} />
        <directionalLight intensity={5} position={[10, 8, 6]} />

        <AutoCamera puzzle={puzzleMaking} />

        <CustomBackground color="#eeee80" />

        <OrthographicCamera
          ref={camera}
          makeDefault
          position={[-12, 12, 12]}
          fov={100}
          near={1}
          far={1000}
          zoom={
            Math.floor(200 / Math.max(...puzzleMaking.size)) > 80
              ? 80
              : Math.floor(200 / Math.max(...puzzleMaking.size))
          }
        />

        <AxisZ
          position={[
            -1 * puzzleMaking.size[0] - 2,
            -1 * puzzleMaking.size[1],
            -1 * puzzleMaking.size[2] + 2 + 2 * (puzzleMaking.size[2] - 1),
          ]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        />
        <AxisArrow
          position={[
            -1 * puzzleMaking.size[0] - 1,
            -1 * puzzleMaking.size[1],
            -1 * puzzleMaking.size[2] + 1 + 2 * (puzzleMaking.size[2] - 1),
          ]}
          rotation={[-Math.PI / 2, 0, 0]}
          size={puzzleMaking.size[2]}
        />

        <AxisY
          position={[
            -1 * puzzleMaking.size[0] - 1.5,
            -1 * puzzleMaking.size[1] + 2.5 + 2 * (puzzleMaking.size[1] - 1),
            -1 * puzzleMaking.size[2] - 1.5,
          ]}
          rotation={[Math.PI / 2, 0, -Math.PI / 4]}
        />
        <AxisArrow
          position={[
            -1 * puzzleMaking.size[0] - 1,
            -1 * puzzleMaking.size[1] + 2 + 2 * (puzzleMaking.size[1] - 1),
            -1 * puzzleMaking.size[2] - 1,
          ]}
          rotation={[0, 0, -Math.PI]}
          size={puzzleMaking.size[1]}
        />

        <AxisX
          position={[
            -1 * puzzleMaking.size[0] + 2 + 2 * (puzzleMaking.size[0] - 1),
            -1 * puzzleMaking.size[1],
            -1 * puzzleMaking.size[2] - 2,
          ]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <AxisArrow
          position={[
            -1 * puzzleMaking.size[0] + 1 + 2 * (puzzleMaking.size[0] - 1),
            -1 * puzzleMaking.size[1],
            -1 * puzzleMaking.size[2] - 1,
          ]}
          rotation={[0, 0, Math.PI / 2]}
          size={puzzleMaking.size[0]}
        />

        {defaultPuzzle && (
          <group>
            {defaultPuzzle.map((position) => (
              <CustomCube
                key={position}
                cubeGeometry={cubeGeometry}
                cubeLineGeometry={cubeLineGeometry}
                position={position}
                customCubesState={customCubesState}
                changeCustomCubesState={setCustomCubesState}
                size={puzzleMaking.size}
                cubeColor={cubeColor}
                positivePosition={revertCoordinate(position, puzzleMaking.size)}
              ></CustomCube>
            ))}
          </group>
        )}

        {!hasAnswers &&
          puzzleMaking.size[0] > 0 &&
          puzzleMaking.size[1] > 0 &&
          puzzleMaking.size[2] > 0 && (
            <>
              <group>
                {CUBE_CONSTANT.BACK_SCAFFOLD[cameraPosition.join("")].map(
                  (position) => (
                    <DefaultScaffold
                      key={position}
                      layerPosition={position}
                      size={puzzleMaking.size}
                      color="#ce4817"
                      thickness={1}
                    />
                  ),
                )}
              </group>
              <group>
                {CUBE_CONSTANT.BACK_SCAFFOLD[cameraPosition.join("")].map(
                  (position) => (
                    <Scaffold
                      key={position}
                      layerPosition={position}
                      size={puzzleMaking.size}
                      color="#ffffff"
                      thickness={4}
                    />
                  ),
                )}
              </group>
            </>
          )}

        <OrbitControls
          ref={controls}
          enableZoom={false}
          enablePan={false}
          enabled={isOrbitEnable}
          enableDamping={false}
        />
      </Canvas>
    </Stage>
  );
}

export default CustomPuzzle;
