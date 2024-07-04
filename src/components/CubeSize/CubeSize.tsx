import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import { ResizeObserver } from "@juggle/resize-observer";
import styled from "styled-components";
import { Coordinate } from "../../../types/cube.ts";
import CubeNumbers from "../Cube/CubeNumbers.tsx";

const Stage = styled.div`
  z-index: 100;
  position: absolute;
  right: 10px;
  bottom: 10px;
  height: 160px;
  width: 160px;
`;

function CubeSize({
  cubeCameraPosition,
  size,
  textColor,
}: {
  cubeCameraPosition: Coordinate;
  size: Coordinate;
  textColor: string;
}) {
  return (
    <Stage>
      <Canvas resize={{ polyfill: ResizeObserver }}>
        <ambientLight intensity={1} />
        <pointLight position={[0, 15, 20]} />
        <directionalLight intensity={3} position={[-10, -8, -6]} />
        <directionalLight intensity={5} position={[10, 8, 6]} />

        <OrthographicCamera
          makeDefault
          position={cubeCameraPosition}
          near={1}
          far={1000}
          zoom={Math.floor(40)}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping={false}
        />

        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#eeeeee" />
        </mesh>
        <CubeNumbers
          markingNumbers={{
            layerX: { "00": { total: size[0], piece: 0 } },
            layerY: { "00": { total: size[1], piece: 0 } },
            layerZ: { "00": { total: size[2], piece: 0 } },
          }}
          positivePosition={[0, 0, 0]}
          color={textColor}
        />
      </Canvas>
    </Stage>
  );
}

export default CubeSize;
