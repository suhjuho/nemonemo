import { Text } from "@react-three/drei";
import React from "react";
import CUBE_CONSTANT from "../../constants/cube";

function CubeNumbers({ markingNumbers, positivePosition }) {
  const yzPosition = `${positivePosition[1]}${positivePosition[2]}`;
  const xzPosition = `${positivePosition[0]}${positivePosition[2]}`;
  const xyPosition = `${positivePosition[0]}${positivePosition[1]}`;

  return (
    <>
      {markingNumbers.layerX[yzPosition] && (
        <>
          <Text
            position={CUBE_CONSTANT.LAYERS.LEFT_LAYER.center}
            fontSize={1}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.LEFT_LAYER}
          >
            {markingNumbers.layerX[yzPosition].total}
          </Text>
          <Text
            position={CUBE_CONSTANT.LAYERS.LEFT_LAYER.corner}
            fontSize={0.5}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.LEFT_LAYER}
          >
            {markingNumbers.layerX[yzPosition].piece > 0 &&
              markingNumbers.layerX[yzPosition].piece}
          </Text>

          <Text
            position={CUBE_CONSTANT.LAYERS.RIGHT_LAYER.center}
            fontSize={1}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.RIGHT_LAYER}
          >
            {markingNumbers.layerX[yzPosition].total}
          </Text>
          <Text
            position={CUBE_CONSTANT.LAYERS.RIGHT_LAYER.corner}
            fontSize={0.5}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.RIGHT_LAYER}
          >
            {markingNumbers.layerX[yzPosition].piece > 0 &&
              markingNumbers.layerX[yzPosition].piece}
          </Text>
        </>
      )}

      {markingNumbers.layerY[xzPosition] && (
        <>
          <Text
            position={CUBE_CONSTANT.LAYERS.UP_LAYER.center}
            fontSize={1}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.UP_LAYER.FRONT}
          >
            {markingNumbers.layerY[xzPosition].total}
          </Text>
          <Text
            position={CUBE_CONSTANT.LAYERS.UP_LAYER.corner.FRONT}
            fontSize={0.5}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.UP_LAYER.FRONT}
          >
            {markingNumbers.layerY[xzPosition].piece > 0 &&
              markingNumbers.layerY[xzPosition].piece}
          </Text>

          <Text
            position={CUBE_CONSTANT.LAYERS.DOWN_LAYER.center}
            fontSize={1}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.DOWN_LAYER.FRONT}
          >
            {markingNumbers.layerY[xzPosition].total}
          </Text>
          <Text
            position={CUBE_CONSTANT.LAYERS.DOWN_LAYER.corner.FRONT}
            fontSize={0.5}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.DOWN_LAYER.FRONT}
          >
            {markingNumbers.layerY[xzPosition].piece > 0 &&
              markingNumbers.layerY[xzPosition].piece}
          </Text>
        </>
      )}

      {markingNumbers.layerZ[xyPosition] && (
        <>
          <Text
            position={CUBE_CONSTANT.LAYERS.FRONT_LAYER.center}
            fontSize={1}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.FRONT_LAYER}
          >
            {markingNumbers.layerZ[xyPosition].total}
          </Text>
          <Text
            position={CUBE_CONSTANT.LAYERS.FRONT_LAYER.corner}
            fontSize={0.5}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.FRONT_LAYER}
          >
            {markingNumbers.layerZ[xyPosition].piece > 0 &&
              markingNumbers.layerZ[xyPosition].piece}
          </Text>

          <Text
            position={CUBE_CONSTANT.LAYERS.BACK_LAYER.center}
            fontSize={1}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.BACK_LAYER}
          >
            {markingNumbers.layerZ[xyPosition].total}
          </Text>
          <Text
            position={CUBE_CONSTANT.LAYERS.BACK_LAYER.corner}
            fontSize={0.5}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.BACK_LAYER}
          >
            {markingNumbers.layerZ[xyPosition].piece > 0 &&
              markingNumbers.layerZ[xyPosition].piece}
          </Text>
        </>
      )}
    </>
  );
}

export default CubeNumbers;
