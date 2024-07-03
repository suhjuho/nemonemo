import { useEffect } from "react";
import { useCubeStatesStore } from "../store/store.tsx";
import { Coordinate } from "../../types/cube.ts";

const useCheckCubeHistory = (
  position: Coordinate,
  setIsClicked: (state: boolean) => void,
  setIsRemoved: (state: boolean) => void,
  setIsHover: (state: boolean) => void,
) => {
  const { cubeStatesHistory, historyIndex } = useCubeStatesStore();

  useEffect(() => {
    const newCubeStates = cubeStatesHistory[historyIndex];

    if (newCubeStates && newCubeStates[position.join("")]) {
      setIsClicked(newCubeStates[position.join("")].isClicked);
      setIsRemoved(newCubeStates[position.join("")].isRemoved);
      setIsHover(false);
    }
  }, [historyIndex]);
};

export default useCheckCubeHistory;
