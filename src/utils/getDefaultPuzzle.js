function getDefaultPuzzle(size) {
  const [sizeX, sizeY, sizeZ] = size;
  const defaultPuzzle = [];

  const getStartPosition = (puzzleSize) => 1 - puzzleSize;
  const getEndPosition = (puzzleSize) => puzzleSize - 1;

  const [startX, endX] = [getStartPosition(sizeX), getEndPosition(sizeX)];
  const [startY, endY] = [getStartPosition(sizeY), getEndPosition(sizeY)];
  const [startZ, endZ] = [getStartPosition(sizeZ), getEndPosition(sizeZ)];

  for (let x = startX; x <= endX; x += 2) {
    for (let y = startY; y <= endY; y += 2) {
      for (let z = startZ; z <= endZ; z += 2) {
        defaultPuzzle.push([x, y, z]);
      }
    }
  }

  return defaultPuzzle;
}

export default getDefaultPuzzle;
