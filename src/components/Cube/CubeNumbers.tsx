import { Text } from "@react-three/drei";
import React from "react";

import { useLayerStore } from "../../store/store.tsx";
import CUBE_CONSTANT from "../../constants/cube.ts";

function CubeNumbers({ markingNumbers, positivePosition }) {
  const { layerDirection } = useLayerStore();
  const yzPosition = `${positivePosition[1]}${positivePosition[2]}`;
  const xzPosition = `${positivePosition[0]}${positivePosition[2]}`;
  const xyPosition = `${positivePosition[0]}${positivePosition[1]}`;

  return (
    <>
      {markingNumbers.layerX[yzPosition] && (
        <>
          <Text
            position={CUBE_CONSTANT.LAYERS.LEFT_LAYER.center}
            fontSize={1.2}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.LEFT_LAYER}
            font="/assets/Micro5-Regular.ttf"
          >
            {markingNumbers.layerX[yzPosition].total}
          </Text>
          <Text
            position={CUBE_CONSTANT.LAYERS.LEFT_LAYER.corner}
            fontSize={0.8}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.LEFT_LAYER}
            font="/assets/Micro5-Regular.ttf"
          >
            {markingNumbers.layerX[yzPosition].piece > 0 &&
              markingNumbers.layerX[yzPosition].piece}
          </Text>
          {(markingNumbers.layerX[yzPosition].total === 6 ||
            markingNumbers.layerX[yzPosition].total === 9) && (
            <Text
              position={CUBE_CONSTANT.LAYERS.LEFT_LAYER.center}
              fontSize={1}
              color="#000000"
              anchorX="center"
              anchorY="end"
              rotation={CUBE_CONSTANT.ROTATIONS.LEFT_LAYER}
              font="/assets/Micro5-Regular.ttf"
            >
              _
            </Text>
          )}

          <Text
            position={CUBE_CONSTANT.LAYERS.RIGHT_LAYER.center}
            fontSize={1.2}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.RIGHT_LAYER}
            font="/assets/Micro5-Regular.ttf"
          >
            {markingNumbers.layerX[yzPosition].total}
          </Text>
          <Text
            position={CUBE_CONSTANT.LAYERS.RIGHT_LAYER.corner}
            fontSize={0.8}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.RIGHT_LAYER}
            font="/assets/Micro5-Regular.ttf"
          >
            {markingNumbers.layerX[yzPosition].piece > 0 &&
              markingNumbers.layerX[yzPosition].piece}
          </Text>
          {(markingNumbers.layerX[yzPosition].total === 6 ||
            markingNumbers.layerX[yzPosition].total === 9) && (
            <Text
              position={CUBE_CONSTANT.LAYERS.RIGHT_LAYER.center}
              fontSize={1}
              color="#000000"
              anchorX="center"
              anchorY="end"
              rotation={CUBE_CONSTANT.ROTATIONS.RIGHT_LAYER}
              font="/assets/Micro5-Regular.ttf"
            >
              _
            </Text>
          )}
        </>
      )}

      {markingNumbers.layerY[xzPosition] && (
        <>
          <Text
            position={CUBE_CONSTANT.LAYERS.UP_LAYER.center}
            fontSize={1.2}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.UP_LAYER[layerDirection]}
            font="/assets/Micro5-Regular.ttf"
          >
            {markingNumbers.layerY[xzPosition].total}
          </Text>
          <Text
            position={CUBE_CONSTANT.LAYERS.UP_LAYER.corner[layerDirection]}
            fontSize={0.8}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.UP_LAYER[layerDirection]}
            font="/assets/Micro5-Regular.ttf"
          >
            {markingNumbers.layerY[xzPosition].piece > 0 &&
              markingNumbers.layerY[xzPosition].piece}
          </Text>
          {(markingNumbers.layerY[xzPosition].total === 6 ||
            markingNumbers.layerY[xzPosition].total === 9) && (
            <Text
              position={CUBE_CONSTANT.LAYERS.UP_LAYER.center}
              fontSize={1}
              color="#000000"
              anchorX="center"
              anchorY="end"
              rotation={CUBE_CONSTANT.ROTATIONS.UP_LAYER[layerDirection]}
              font="/assets/Micro5-Regular.ttf"
            >
              _
            </Text>
          )}

          <Text
            position={CUBE_CONSTANT.LAYERS.DOWN_LAYER.center}
            fontSize={1.2}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.DOWN_LAYER[layerDirection]}
            font="/assets/Micro5-Regular.ttf"
          >
            {markingNumbers.layerY[xzPosition].total}
          </Text>
          <Text
            position={CUBE_CONSTANT.LAYERS.DOWN_LAYER.corner[layerDirection]}
            fontSize={0.8}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.DOWN_LAYER[layerDirection]}
            font="/assets/Micro5-Regular.ttf"
          >
            {markingNumbers.layerY[xzPosition].piece > 0 &&
              markingNumbers.layerY[xzPosition].piece}
          </Text>
          {(markingNumbers.layerY[xzPosition].total === 6 ||
            markingNumbers.layerY[xzPosition].total === 9) && (
            <Text
              position={CUBE_CONSTANT.LAYERS.DOWN_LAYER.center}
              fontSize={1}
              color="#000000"
              anchorX="center"
              anchorY="end"
              rotation={CUBE_CONSTANT.ROTATIONS.DOWN_LAYER[layerDirection]}
              font="/assets/Micro5-Regular.ttf"
            >
              _
            </Text>
          )}
        </>
      )}

      {markingNumbers.layerZ[xyPosition] && (
        <>
          <Text
            position={CUBE_CONSTANT.LAYERS.FRONT_LAYER.center}
            fontSize={1.2}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.FRONT_LAYER}
            font="/assets/Micro5-Regular.ttf"
          >
            {markingNumbers.layerZ[xyPosition].total}
          </Text>
          <Text
            position={CUBE_CONSTANT.LAYERS.FRONT_LAYER.corner}
            fontSize={0.8}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.FRONT_LAYER}
            font="/assets/Micro5-Regular.ttf"
          >
            {markingNumbers.layerZ[xyPosition].piece > 0 &&
              markingNumbers.layerZ[xyPosition].piece}
          </Text>
          {(markingNumbers.layerZ[xyPosition].total === 6 ||
            markingNumbers.layerZ[xyPosition].total === 9) && (
            <Text
              position={CUBE_CONSTANT.LAYERS.FRONT_LAYER.center}
              fontSize={1}
              color="#000000"
              anchorX="center"
              anchorY="end"
              rotation={CUBE_CONSTANT.ROTATIONS.FRONT_LAYER.FRONT}
              font="/assets/Micro5-Regular.ttf"
            >
              _
            </Text>
          )}

          <Text
            position={CUBE_CONSTANT.LAYERS.BACK_LAYER.center}
            fontSize={1.2}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.BACK_LAYER}
            font="/assets/Micro5-Regular.ttf"
          >
            {markingNumbers.layerZ[xyPosition].total}
          </Text>
          <Text
            position={CUBE_CONSTANT.LAYERS.BACK_LAYER.corner}
            fontSize={0.8}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            rotation={CUBE_CONSTANT.ROTATIONS.BACK_LAYER}
            font="/assets/Micro5-Regular.ttf"
          >
            {markingNumbers.layerZ[xyPosition].piece > 0 &&
              markingNumbers.layerZ[xyPosition].piece}
          </Text>
          {(markingNumbers.layerZ[xyPosition].total === 6 ||
            markingNumbers.layerZ[xyPosition].total === 9) && (
            <Text
              position={CUBE_CONSTANT.LAYERS.BACK_LAYER.center}
              fontSize={1}
              color="#000000"
              anchorX="center"
              anchorY="end"
              rotation={CUBE_CONSTANT.ROTATIONS.BACK_LAYER.FRONT}
              font="/assets/Micro5-Regular.ttf"
            >
              _
            </Text>
          )}
        </>
      )}
    </>
  );
}

export default CubeNumbers;
