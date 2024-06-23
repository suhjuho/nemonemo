import { Coordinate } from "../../types/cube.ts";

function revertCoordinate(position: Coordinate, size: Coordinate): Coordinate {
  const [sizeX, sizeY, sizeZ] = size;
  const revertCoordinateFn = (pos: number, puzzleSize: number): number =>
    (pos + puzzleSize - 1) / 2;

  return [
    revertCoordinateFn(position[0], sizeX),
    revertCoordinateFn(position[1], sizeY),
    revertCoordinateFn(position[2], sizeZ),
  ];
}

export default revertCoordinate;
