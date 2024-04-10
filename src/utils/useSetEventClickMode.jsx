import { useEffect } from "react";

import CUBE_CONSTANT from "../constants/cube";
import { useClickModeStore } from "../store/store";

const useSetEventClickMode = () => {
  const { clickMode, setClickMode } = useClickModeStore();

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
};

export default useSetEventClickMode;
