import { useEffect } from "react";
import { Coordinate } from "../../types/cube.ts";
import { useLayerStore } from "../store/store.tsx";

const useCheckCurrentLayer = (
  position: Coordinate,
  setIsHidden: (state: boolean) => void,
) => {
  const { layerDirection, layers, currentLayer } = useLayerStore();

  useEffect(() => {
    const [targetPosition, layer] =
      layerDirection === "FRONT" || layerDirection === "BACK"
        ? [position[2], layers.z]
        : [position[0], layers.x];

    if (layerDirection === "FRONT" || layerDirection === "RIGHT") {
      if (targetPosition <= layer[currentLayer - 1]) {
        setIsHidden(false);
      }

      if (targetPosition > layer[currentLayer - 1]) {
        setIsHidden(true);
      }
    }

    if (layerDirection === "BACK" || layerDirection === "LEFT") {
      if (targetPosition < layer[currentLayer - 1]) {
        setIsHidden(true);
      }

      if (targetPosition >= layer[currentLayer - 1]) {
        setIsHidden(false);
      }
    }
  }, [currentLayer]);
};

export default useCheckCurrentLayer;
