import Cube from "../Cube/Cube";

function Bamboo({ positions, numbersList }) {
  const puzzle = positions.map((position, index) => (
    <Cube key={position} position={position} numbers={numbersList[index]} />
  ));

  return puzzle;
}

export default Bamboo;
