function getDefaultPuzzle(size) {
  const [sizeX, sizeY, sizeZ] = size;
  const defaultPuzzle = [];

  const startX = -1 * sizeX + 1;
  const endX = sizeX - 1;
  const startY = -1 * sizeY + 1;
  const endY = sizeY - 1;
  const startZ = -1 * sizeZ + 1;
  const endZ = sizeZ - 1;

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
