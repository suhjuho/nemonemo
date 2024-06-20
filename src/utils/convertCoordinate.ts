function convertCoordinate(position: string, size: [number, number, number]) {
  const [sizeX, sizeY, sizeZ] = size;

  const convertFn = (puzzleSize: number, pos: string) =>
    2 * Math.abs(Number(pos)) - puzzleSize + 1;

  return [
    convertFn(sizeX, position[0]),
    convertFn(sizeY, position[1]),
    convertFn(sizeZ, position[2]),
  ];
}

export default convertCoordinate;
