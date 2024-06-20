import { useFrame, useThree } from "@react-three/fiber";
import { useState } from "react";

import { useCameraPositionStore, useLayerStore } from "../../store/store.tsx";

function AutoCamera({ puzzle }) {
  const { camera } = useThree();
  const { setCameraPosition } = useCameraPositionStore();
  const { layerDirection, setLayerDirection, setCurrentLayer } =
    useLayerStore();

  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0, z: 0 });

  function checkCameraPosition(cameraX, cameraY, cameraZ) {
    const posX = cameraX >= 0 ? 1 : 0;
    const posY = cameraY >= 0 ? 1 : 0;
    const posZ = cameraZ >= 0 ? 1 : 0;

    setCameraPosition([posX, posY, posZ]);
  }

  function checkLayerDirection(cameraX, cameraZ) {
    const X = cameraX;
    const Z = cameraZ;

    if (Z < X && Z >= -1 * X) {
      if (layerDirection !== "RIGHT") {
        setCurrentLayer(puzzle.size[0]);
        setLayerDirection("RIGHT");
      }
    } else if (Z >= X && Z < -1 * X) {
      if (layerDirection !== "LEFT") {
        setCurrentLayer(1);
        setLayerDirection("LEFT");
      }
    } else if (Z >= X && Z >= -1 * X) {
      if (layerDirection !== "FRONT") {
        setCurrentLayer(puzzle.size[2]);
        setLayerDirection("FRONT");
      }
    } else if (Z < X && Z < -1 * X) {
      if (layerDirection !== "BACK") {
        setCurrentLayer(1);
        setLayerDirection("BACK");
      }
    }
  }

  const saveCamera = (x, y, z) => {
    checkLayerDirection(x, z);
    checkCameraPosition(x, y, z);
  };

  useFrame(() => {
    const [cameraX, cameraY, cameraZ] = [
      Math.floor(camera.position.x),
      Math.floor(camera.position.y),
      Math.floor(camera.position.z),
    ];

    if (
      cameraX !== prevPosition.x ||
      cameraY !== prevPosition.y ||
      cameraZ !== prevPosition.z
    ) {
      saveCamera(cameraX, cameraY, cameraZ);
      prevPosition.x = cameraX;
      prevPosition.y = cameraY;
      prevPosition.z = cameraZ;
      setPrevPosition(prevPosition);
    }
  });

  return null;
}

export default AutoCamera;
