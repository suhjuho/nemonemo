function getDefaultPuzzle(size) {
  const [sizeX, sizeY, sizeZ] = size;
  const defaultPuzzle = [];

  for (let x = -1 * sizeX + 1; x <= sizeX - 1; x += 2) {
    for (let y = -1 * sizeY + 1; y <= sizeY - 1; y += 2) {
      for (let z = -1 * sizeZ + 1; z <= sizeZ - 1; z += 2) {
        defaultPuzzle.push([x, y, z]);
      }
    }
  }

  return defaultPuzzle;
}

export default getDefaultPuzzle;
