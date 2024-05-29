function revertCoordinate(position, size) {
  const [sizeX, sizeY, sizeZ] = size;
  const revertCoordinateFn = (pos, puzzleSize) => (pos + puzzleSize - 1) / 2;

  return [
    revertCoordinateFn(position[0], sizeX),
    revertCoordinateFn(position[1], sizeY),
    revertCoordinateFn(position[2], sizeZ),
  ];
}

export default revertCoordinate;
