import ReactThreeTestRenderer from "@react-three/test-renderer";
import { describe, expect, it } from "vitest";
import BackGround from "../../components/GameStage/BackGround";
import TutorialBackground from "../../components/GameStage/TutorialBackground";
import Scaffold from "../../components/Edge/Scaffold";
import { useLayerStore } from "../../store/store";

describe("render background", () => {
  it("render game stage background", async () => {
    const BACKGROUND_COLOR = "333333";
    const renderer = await ReactThreeTestRenderer.create(
      <BackGround color={`#${BACKGROUND_COLOR}`} />,
    );

    const mesh = renderer.scene.children[0];
    await renderer.fireEvent(mesh, "click");

    expect(mesh.children[0]._fiber.material.color.getHexString()).toBe(
      BACKGROUND_COLOR,
    );
  });

  it("render tutorial stage background", async () => {
    const BACKGROUND_COLOR = "333333";
    const renderer = await ReactThreeTestRenderer.create(
      <TutorialBackground color={`#${BACKGROUND_COLOR}`} />,
    );

    const mesh = renderer.scene.children[0];
    await renderer.fireEvent(mesh, "click");

    expect(mesh.children[0]._fiber.material.color.getHexString()).toBe(
      BACKGROUND_COLOR,
    );
  });

  it("render scaffold", async () => {
    const initialState = useLayerStore.getState();

    initialState.layerDirection = "FRONT";
    initialState.currentLayer = 0;

    useLayerStore.setState(initialState);

    await ReactThreeTestRenderer.create(
      <Scaffold
        layerPosition="DOWN"
        size={[3, 3, 3]}
        color="#ffffff"
        thickness={3}
      />,
    );
  });
});
