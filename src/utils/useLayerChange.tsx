import { useEffect } from "react";
import { CUBE_CONSTANT } from "../constants/cube.ts";
import { useLayerStore } from "../store/store.tsx";

const useLayerChange = () => {
  const { layerDirection, layers, currentLayer, setCurrentLayer } =
    useLayerStore();

  useEffect(() => {
    function handleLayerChange(event: KeyboardEvent): void {
      const isInside = CUBE_CONSTANT.INSIDE_CUBE_KEYS[event.key];
      const isOutside = CUBE_CONSTANT.OUTSIDE_CUBE_KEYS[event.key];

      const layer =
        layerDirection === "FRONT" || layerDirection === "BACK"
          ? layers.z
          : layers.x;

      if (isInside) {
        if (CUBE_CONSTANT.INSIDE_DIRECTIONS[layerDirection]) {
          if (currentLayer > 1) {
            setCurrentLayer(currentLayer - 1);
          }
        } else if (CUBE_CONSTANT.OUTSIDE_DIRECTIONS[layerDirection]) {
          if (currentLayer < layer.length) {
            setCurrentLayer(currentLayer + 1);
          }
        }
      }

      if (isOutside) {
        if (CUBE_CONSTANT.INSIDE_DIRECTIONS[layerDirection]) {
          if (currentLayer < layer.length) {
            setCurrentLayer(currentLayer + 1);
          }
        } else if (CUBE_CONSTANT.OUTSIDE_DIRECTIONS[layerDirection]) {
          if (currentLayer > 1) {
            setCurrentLayer(currentLayer - 1);
          }
        }
      }
    }

    window.addEventListener("keydown", handleLayerChange);
    return () => window.removeEventListener("keydown", handleLayerChange);
  }, [currentLayer, layerDirection, layers]);
};

export default useLayerChange;
