import ReactThreeTestRenderer from "@react-three/test-renderer";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import AxisArrow from "../../components/CubePointer/AxisArrow";
import { AxisX, AxisY, AxisZ } from "../../components/CubePointer/AxisMarker";
import CubePointer from "../../components/CubePointer/CubePointer";
import DirectionArrow from "../../components/CubePointer/DirectionArrow";
import PixelPointer from "../../components/CubePointer/PixelPointer";

const bufferGeometry = new THREE.BufferGeometry();
const meshStandardMaterial = new THREE.MeshStandardMaterial();

describe("render 3D asset using useGLTF", () => {
  beforeEach(() => {
    vi.mock("@react-three/drei", () => {
      const mockUseGLTF = vi.fn(() => ({
        nodes: {
          Arrow__0: {
            geometry: bufferGeometry,
            material: meshStandardMaterial,
          },
          Object_4: {
            geometry: bufferGeometry,
            material: meshStandardMaterial,
          },
          Object_6: {
            geometry: bufferGeometry,
            material: meshStandardMaterial,
          },
          Object_8: {
            geometry: bufferGeometry,
            material: meshStandardMaterial,
          },
          Arrow_Material001_0: {
            geometry: bufferGeometry,
            material: meshStandardMaterial,
          },
          Plane_Material_0: {
            geometry: bufferGeometry,
            material: meshStandardMaterial,
          },
        },
        materials: {
          "Scene_-_Root": meshStandardMaterial,
          "Material.001": meshStandardMaterial,
          Material: meshStandardMaterial,
        },
      }));

      mockUseGLTF.preload = vi.fn();

      return {
        useGLTF: mockUseGLTF,
      };
    });
  });

  it("render Axis Arrow Component with arrow_3d.glb", async () => {
    await ReactThreeTestRenderer.create(<AxisArrow />);

    expect(useGLTF).toHaveBeenCalledWith("/assets/arrow_3d.glb");
    expect(useGLTF.preload).toHaveBeenCalledWith("/assets/arrow_3d.glb");
  });

  it("render X Axis Marker Component with arrow_3d.glb", async () => {
    await ReactThreeTestRenderer.create(<AxisX />);

    expect(useGLTF).toHaveBeenCalledWith("/assets/alphabet_asset.glb");
    expect(useGLTF.preload).toHaveBeenCalledWith("/assets/alphabet_asset.glb");
  });

  it("render Y Axis Marker Component with arrow_3d.glb", async () => {
    await ReactThreeTestRenderer.create(<AxisY />);

    expect(useGLTF).toHaveBeenCalledWith("/assets/alphabet_asset.glb");
    expect(useGLTF.preload).toHaveBeenCalledWith("/assets/alphabet_asset.glb");
  });

  it("render Z Axis Marker Component with arrow_3d.glb", async () => {
    await ReactThreeTestRenderer.create(<AxisZ />);

    expect(useGLTF).toHaveBeenCalledWith("/assets/alphabet_asset.glb");
    expect(useGLTF.preload).toHaveBeenCalledWith("/assets/alphabet_asset.glb");
  });

  it("render CubePointer Component with arrow_3d.glb", async () => {
    await ReactThreeTestRenderer.create(<CubePointer />);

    expect(useGLTF).toHaveBeenCalledWith("/assets/arrow.glb");
    expect(useGLTF.preload).toHaveBeenCalledWith("/assets/arrow.glb");
  });

  it("render DirectionArrow Component with arrow_3d.glb", async () => {
    await ReactThreeTestRenderer.create(<DirectionArrow />);

    expect(useGLTF).toHaveBeenCalledWith("/assets/direction_arrow.glb");
    expect(useGLTF.preload).toHaveBeenCalledWith("/assets/direction_arrow.glb");
  });

  it("render PixelPointer Component with arrow_3d.glb", async () => {
    await ReactThreeTestRenderer.create(<PixelPointer />);

    expect(useGLTF).toHaveBeenCalledWith("/assets/mouse_arrow.glb");
    expect(useGLTF.preload).toHaveBeenCalledWith("/assets/mouse_arrow.glb");
  });
});
