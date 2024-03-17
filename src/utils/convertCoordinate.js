function convertCoordinate(position, size) {
  const [sizeX, sizeY, sizeZ] = size;

  return [
    -1 * sizeX + 1 + 2 * Math.abs(Number(position[0])),
    -1 * sizeY + 1 + 2 * Math.abs(Number(position[1])),
    -1 * sizeZ + 1 + 2 * Math.abs(Number(position[2])),
  ];
}

export default convertCoordinate;
