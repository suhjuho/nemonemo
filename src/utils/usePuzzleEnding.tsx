import { MutableRefObject, useEffect } from "react";
import * as TWEEN from "@tweenjs/tween.js";
import { OrthographicCamera as OrthographicCameraType } from "three";

import { useAnswerStore, useSoundStore } from "../store/store.tsx";
import { soundEnding } from "./soundEffect.ts";

const usePuzzleEnding = (camera: MutableRefObject<OrthographicCameraType>) => {
  const { isComplete } = useAnswerStore();
  const { sound } = useSoundStore();

  useEffect(() => {
    if (camera.current && isComplete) {
      const coords = {
        x: camera.current.position.x,
        y: camera.current.position.y,
        z: camera.current.position.z,
      };

      const tween = new TWEEN.Tween(coords, false)
        .to({ x: -12, y: 12, z: 12 }, 1000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() =>
          camera.current.position.set(coords.x, coords.y, coords.z),
        )
        .start();

      function animate(time: number) {
        tween.update(time);
        requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);

      if (!sound.isMuted) {
        soundEnding(sound.bgmSound);
      }
    }
  }, [isComplete]);
};

export default usePuzzleEnding;
