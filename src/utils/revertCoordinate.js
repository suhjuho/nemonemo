function revertCoordinate(position, size) {
  const [sizeX, sizeY, sizeZ] = size;

  return [
    (position[0] + sizeX - 1) / 2,
    (position[1] + sizeY - 1) / 2,
    (position[2] + sizeZ - 1) / 2,
  ];
}

export default revertCoordinate;
