function checkNumberShown(position, size, numbers) {
  const [sizeX, sizeY, sizeZ] = size;
  let isShown = false;

  numbers.forEach((number) => {
    if (
      number.join("") ===
      [
        (position[0] + sizeX - 1) / 2,
        (position[1] + sizeY - 1) / 2,
        (position[2] + sizeZ - 1) / 2,
      ].join("")
    ) {
      isShown = true;
    }
  });

  return isShown;
}

export default checkNumberShown;
