import RectangleGrid from "./RectangleGrid.tsx";

import GRID_CONSTANT from "../../constants/Grid.ts";
import { Coordinate } from "../../../types/cube.ts";

interface DefaultScaffoldProps {
  layerPosition: "UP" | "DOWN" | "FORTH" | "BACK" | "RIGHT" | "LEFT";
  size: Coordinate;
  color: string;
  thickness: number;
}

function DefaultScaffold({
  layerPosition,
  size,
  color,
  thickness,
}: DefaultScaffoldProps) {
  const centerPosition: Coordinate = [0, 0, 0];
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

  const cornerDots: Coordinate[] = [
    centerPosition.slice() as Coordinate,
    centerPosition.slice() as Coordinate,
    centerPosition.slice() as Coordinate,
    centerPosition.slice() as Coordinate,
  ];

  cornerDots[0][indexOne] = -1 * size[indexOne];
  cornerDots[0][indexTwo] = -1 * size[indexTwo];

  cornerDots[1][indexOne] = -1 * size[indexOne];
  cornerDots[1][indexTwo] = size[indexTwo];

  cornerDots[2][indexOne] = size[indexOne];
  cornerDots[2][indexTwo] = -1 * size[indexTwo];

  cornerDots[3][indexOne] = size[indexOne];
  cornerDots[3][indexTwo] = size[indexTwo];

  return (
    <RectangleGrid
      cornerDots={cornerDots}
      color={color}
      thickness={thickness}
    />
  );
}

export default DefaultScaffold;
