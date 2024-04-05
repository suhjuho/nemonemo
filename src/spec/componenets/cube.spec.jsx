import * as THREE from "three";

import ReactThreeTestRenderer from "@react-three/test-renderer";
import { describe, expect, it } from "vitest";
import Cube from "../../components/Cube/Cube";
import CustomCube from "../../components/CustomPuzzle/CustomCube";

const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const cubeLineGeometry = new THREE.CylinderGeometry(0.03, 0.03, 2, 8);

describe("render Main Page", () => {
  it("render cube", async () => {
    const renderer = await ReactThreeTestRenderer.create(
      <Cube
        position={[0, 0, 0]}
        cubeGeometry={cubeGeometry}
        cubeLineGeometry={cubeLineGeometry}
        markingNumbers={{ layerX: [], layerY: [], layerZ: [] }}
        positivePosition={[0, 0, 0]}
        colors="#ffffff"
        size={[1, 1, 1]}
      />,
    );

    const mesh = renderer.scene.children[0];

    expect(mesh.children[0]._fiber.material.color.getHexString()).toBe(
      "ffffff",
    );
  });

  it("render cube", async () => {
    const renderer = await ReactThreeTestRenderer.create(
      <CustomCube
        position={[0, 0, 0]}
        cubeGeometry={cubeGeometry}
        cubeLineGeometry={cubeLineGeometry}
        positivePosition={[0, 0, 0]}
        cubeColor="#ffffff"
        size={[1, 1, 1]}
        customCubesState={{}}
        changeCustomCubesState={() => {}}
      />,
    );
  });
});
