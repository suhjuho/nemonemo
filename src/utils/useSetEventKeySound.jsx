import { useEffect } from "react";

import { soundCube } from "./soundEffect";
import { useSoundStore } from "../store/store";
import CUBE_CONSTANT from "../constants/cube";

const useSetEventKeySound = () => {
  const { sound } = useSoundStore();

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
};

export default useSetEventKeySound;
