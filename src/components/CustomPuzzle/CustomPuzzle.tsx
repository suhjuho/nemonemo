import { useEffect, useRef, useState } from "react";

import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import { OrthographicCamera as OrthographicCameraType } from "three";
import { OrbitControls as OrbitControlsType } from "three-stdlib";
import { ResizeObserver } from "@juggle/resize-observer";
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";

import AutoCamera from "../Edge/AutoCamera.tsx";
import CustomBackground from "./CustomBackground.tsx";
import GameStageSideBar from "../shared/SideBar/GameStageSideBar.tsx";
import CustomPuzzleHeader from "./CustomPuzzleHeader.tsx";
import CustomPuzzleFooter from "./CustomPuzzleFooter.tsx";
import CustomPuzzleColorPicker from "./CustomPuzzleColorPicker.tsx";
import CustomPuzzleTable from "./CustomPuzzleTable.tsx";
import CustomCube from "./CustomCube.tsx";
import Scaffold from "../Edge/Scaffold.tsx";
import DefaultScaffold from "../Edge/DefaultScaffold.tsx";
import AxisArrow from "../CubePointer/AxisArrow.tsx";
import { AxisX, AxisY, AxisZ } from "../CubePointer/AxisMarker.tsx";
import getDefaultPuzzle from "../../utils/getDefaultPuzzle.ts";

import {
  useCameraPositionStore,
  useLayerStore,
  useOrbitControlStore,
} from "../../store/store.tsx";
import usePuzzleMakingStore from "../../store/making.tsx";
import {
  CUBE_CONSTANT,
  CubeGeometry,
  CubeLineGeometry,
} from "../../constants/cube.ts";
import {
  Coordinate,
  DefaultPuzzle,
  ShowingNumbers,
} from "../../../types/cube.ts";
import revertCoordinate from "../../utils/revertCoordinate.ts";
import useSetEventKeySound from "../../utils/useSetEventKeySound.tsx";
import useSetEventClickMode from "../../utils/useSetEventClickMode.tsx";
import useLayerChange from "../../utils/useLayerChange.tsx";

const Stage = styled.div`
  position: relative;
  height: 100vh;
`;

function CustomPuzzle() {
  const { isOrbitEnable } = useOrbitControlStore();
  const { puzzleMaking, setPuzzleMaking, hasAnswers, hasColors } =
    usePuzzleMakingStore();
  const { setCurrentLayer, setLayers } = useLayerStore();
  const controls = useRef<OrbitControlsType>(null!);
  const camera = useRef<OrthographicCameraType>(null!);
  const [defaultPuzzle, setDefaultPuzzle] = useState<DefaultPuzzle>(null!);
  const [customCubesState, setCustomCubesState] = useState({});
  const [cubeColor, setCubeColor] = useState<string>("#ffffff");
  const { cameraPosition } = useCameraPositionStore();

  useEffect(() => {
    const defaultPositions = getDefaultPuzzle(puzzleMaking.size);
    setDefaultPuzzle(defaultPositions);

    const showing: ShowingNumbers = { layerX: {}, layerY: {}, layerZ: {} };

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

    const cubesStates: Record<string, boolean> = {};

    defaultPositions.forEach((defaultPosition) => {
      cubesStates[
        revertCoordinate(
          defaultPosition,
          puzzleMaking.size.map(Number) as Coordinate,
        ).join("")
      ] = true;
    });

    setCustomCubesState(cubesStates);

    const layers: { x: number[]; z: number[] } = { x: [], z: [] };

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

  useSetEventClickMode();
  useSetEventKeySound();
  useLayerChange();

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
                key={position.join("")}
                cubeGeometry={CubeGeometry}
                cubeLineGeometry={CubeLineGeometry}
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
