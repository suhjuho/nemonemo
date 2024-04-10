import styled from "styled-components";

import usePuzzleMakingStore from "../../store/making";
import { useMarkingNumbersStore } from "../../store/store";
import getMarkingNumbers from "../../utils/getMarkingNumbers";

const SideBar = styled.section`
  position: fixed;
  right: 10px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  z-index: 5;

  .layer-direction {
    font-size: 32px;
    font-weight: 900;
  }
`;

const Layer = styled.div`
  border: 3px solid white;
  margin: 10px 0px;
`;

const CubeSides = styled.div`
  display: flex;
`;

const CubeSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 1px solid white;
  font-size: 16px;
  font-weight: 900;
`;

function CustomPuzzleTable({ size }) {
  const [sizeX, sizeY, sizeZ] = size;
  const { puzzleMaking, setPuzzleMaking } = usePuzzleMakingStore();
  const { setMarkingNumbers } = useMarkingNumbersStore();

  const positionsLayerX = [];
  const positionsLayerY = [];
  const positionsLayerZ = [];

  for (let i = sizeY - 1; i >= 0; i -= 1) {
    const row = [];

    for (let j = 0; j < sizeZ; j += 1) {
      row.push([i, j]);
    }

    positionsLayerX.push(row);
  }

  for (let i = 0; i < sizeZ; i += 1) {
    const row = [];

    for (let j = 0; j < sizeX; j += 1) {
      row.push([j, i]);
    }

    positionsLayerY.push(row);
  }

  for (let i = sizeY - 1; i >= 0; i -= 1) {
    const row = [];

    for (let j = 0; j < sizeX; j += 1) {
      row.push([j, i]);
    }

    positionsLayerZ.push(row);
  }

  const handleMarkingNumberX = (positionY, positionZ) => {
    if (puzzleMaking.showingNumbers.layerX[`${positionY}${positionZ}`]) {
      delete puzzleMaking.showingNumbers.layerX[`${positionY}${positionZ}`];
    } else {
      puzzleMaking.showingNumbers.layerX[`${positionY}${positionZ}`] = true;
    }

    setPuzzleMaking(puzzleMaking);

    const numbers = getMarkingNumbers(
      puzzleMaking.answers,
      puzzleMaking.showingNumbers,
      puzzleMaking.size,
    );

    setMarkingNumbers(numbers);
  };

  const handleMarkingNumberY = (positionX, positionZ) => {
    if (puzzleMaking.showingNumbers.layerY[`${positionX}${positionZ}`]) {
      delete puzzleMaking.showingNumbers.layerY[`${positionX}${positionZ}`];
    } else {
      puzzleMaking.showingNumbers.layerY[`${positionX}${positionZ}`] = true;
    }

    setPuzzleMaking(puzzleMaking);

    const numbers = getMarkingNumbers(
      puzzleMaking.answers,
      puzzleMaking.showingNumbers,
      puzzleMaking.size,
    );

    setMarkingNumbers(numbers);
  };

  const handleMarkingNumberZ = (positionX, positionY) => {
    if (puzzleMaking.showingNumbers.layerZ[`${positionX}${positionY}`]) {
      delete puzzleMaking.showingNumbers.layerZ[`${positionX}${positionY}`];
    } else {
      puzzleMaking.showingNumbers.layerZ[`${positionX}${positionY}`] = true;
    }

    setPuzzleMaking(puzzleMaking);

    const numbers = getMarkingNumbers(
      puzzleMaking.answers,
      puzzleMaking.showingNumbers,
      puzzleMaking.size,
    );

    setMarkingNumbers(numbers);
  };

  return (
    <SideBar>
      <div className="layer-direction">가로 방향(YZ평면)</div>
      <Layer>
        {positionsLayerX.map((row) => (
          <CubeSides key={row}>
            {row.map((position) => (
              <CubeSide
                key={`${position[0]}${position[1]}`}
                onClick={() => {
                  handleMarkingNumberX(position[0], position[1]);
                }}
              >
                {`[${position[0]}, ${position[1]}]`}
              </CubeSide>
            ))}
          </CubeSides>
        ))}
      </Layer>

      <div className="layer-direction">높이 방향(XZ평면) </div>
      <Layer>
        {positionsLayerY.map((row) => (
          <CubeSides key={row}>
            {row.map((position) => (
              <CubeSide
                key={`${position[0]}${position[1]}`}
                onClick={() => {
                  handleMarkingNumberY(position[0], position[1]);
                }}
              >
                {`[${position[0]}, ${position[1]}]`}
              </CubeSide>
            ))}
          </CubeSides>
        ))}
      </Layer>

      <div className="layer-direction">세로 방향(XY평면) </div>
      <Layer>
        {positionsLayerZ.map((row) => (
          <CubeSides key={row}>
            {row.map((position) => (
              <CubeSide
                key={`${position[0]}${position[1]}`}
                onClick={() => {
                  handleMarkingNumberZ(position[0], position[1]);
                }}
              >
                {`[${position[0]}, ${position[1]}]`}
              </CubeSide>
            ))}
          </CubeSides>
        ))}
      </Layer>
    </SideBar>
  );
}

export default CustomPuzzleTable;
