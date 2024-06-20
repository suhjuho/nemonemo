import { useEffect } from "react";

import { soundCube } from "./soundEffect.ts";
import { useSoundStore } from "../store/store.tsx";
import CUBE_CONSTANT from "../constants/cube.ts";

const useSetEventKeySound = () => {
  const { sound } = useSoundStore();

  useEffect(() => {
    function handleContextMenu(event: KeyboardEvent) {
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
};

export default useSetEventKeySound;
