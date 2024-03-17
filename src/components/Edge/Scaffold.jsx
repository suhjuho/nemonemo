import { useLayerStore } from "../../store/store";
import RectangleGrid from "./RectangleGrid";

import GRID_CONSTANT from "../../constants/Grid";

function Scaffold({ layerPosition, size, color, thickness }) {
  const { layerDirection, currentLayer } = useLayerStore();
  const centerPosition = [0, 0, 0];
  const [fixedIndex, indexOne, indexTwo] =
    GRID_CONSTANT.POSITION.LAYER[layerPosition];

  centerPosition[fixedIndex] = size[fixedIndex];

  if (
    layerPosition === "DOWN" ||
    layerPosition === "LEFT" ||
    layerPosition === "BACK"
  ) {
    centerPosition[fixedIndex] *= -1;
  }

  const cornerDots = [
    centerPosition.slice(),
    centerPosition.slice(),
    centerPosition.slice(),
    centerPosition.slice(),
  ];

  cornerDots[0][indexOne] = -1 * size[indexOne];
  cornerDots[0][indexTwo] = -1 * size[indexTwo];

  cornerDots[1][indexOne] = -1 * size[indexOne];
  cornerDots[1][indexTwo] = size[indexTwo];

  cornerDots[2][indexOne] = size[indexOne];
  cornerDots[2][indexTwo] = -1 * size[indexTwo];

  cornerDots[3][indexOne] = size[indexOne];
  cornerDots[3][indexTwo] = size[indexTwo];

  if (layerDirection === "FRONT") {
    const zPosition = 2 * currentLayer - size[2];

    cornerDots.forEach((cornerDot) => {
      cornerDot[2] = zPosition < cornerDot[2] ? zPosition : cornerDot[2];
    });
  }

  if (layerDirection === "BACK") {
    const zPosition = -1 * size[2] + 2 * (currentLayer - 1);

    cornerDots.forEach((cornerDot) => {
      cornerDot[2] = zPosition > cornerDot[2] ? zPosition : cornerDot[2];
    });
  }

  if (layerDirection === "RIGHT") {
    const xPosition = 2 * currentLayer - size[0];

    cornerDots.forEach((cornerDot) => {
      cornerDot[0] = xPosition < cornerDot[0] ? xPosition : cornerDot[0];
    });
  }

  if (layerDirection === "LEFT") {
    const xPosition = -1 * size[0] + 2 * (currentLayer - 1);

    cornerDots.forEach((cornerDot) => {
      cornerDot[0] = xPosition > cornerDot[0] ? xPosition : cornerDot[0];
    });
  }

  return (
    <RectangleGrid
      cornerDots={cornerDots}
      color={color}
      thickness={thickness}
    />
  );
}

export default Scaffold;
