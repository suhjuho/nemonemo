import { useEffect } from "react";
import { CUBE_CONSTANT } from "../constants/cube.ts";
import { useCubeStatesStore } from "../store/store.tsx";

const useSetGameHistory = () => {
  const { cubeStates, cubeStatesHistory, historyIndex, setHistoryIndex } =
    useCubeStatesStore();

  useEffect(() => {
    function handleCubeHistory(event: KeyboardEvent): void {
      const isUndo = CUBE_CONSTANT.UNDO_KEYS[event.key];
      const isRedo = CUBE_CONSTANT.REDO_KEYS[event.key];

      if (isUndo && historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
      }

      if (isRedo && historyIndex < cubeStatesHistory.length - 1) {
        setHistoryIndex(historyIndex + 1);
      }
    }

    window.addEventListener("keydown", handleCubeHistory);
    return () => window.removeEventListener("keydown", handleCubeHistory);
  }, [cubeStates, cubeStatesHistory, historyIndex]);
};

export default useSetGameHistory;
