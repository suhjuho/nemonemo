import styled from "styled-components";

import { useState } from "react";
import usePuzzleMakingStore from "../../store/making.tsx";
import { useMarkingNumbersStore } from "../../store/store.tsx";
import getMarkingNumbers from "../../utils/getMarkingNumbers.ts";
import { Coordinate } from "../../../types/cube.ts";

const SideBar = styled.section`
  position: fixed;
  right: 10px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  z-index: 25;

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

const LayerSelection = styled.div<{ isSelected: boolean }>`
  font-size: 48px;
  font-weight: 900;
  margin: 2px 0px;
  padding: 0px 10px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.1);
  background-color: ${(props) =>
    props.isSelected ? `rgb(255, 255, 255)` : `rgba(255, 255, 255, 0.1)`};
  border: 3px solid white;
  border-radius: 20px;
  box-shadow: 2px 4px 8px;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  min-width: 100px;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    color: #007302;
  }
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

function CustomPuzzleTable({ size }: { size: Coordinate }) {
  const [sizeX, sizeY, sizeZ] = size;
  const { puzzleMaking, setPuzzleMaking } = usePuzzleMakingStore();
  const { setMarkingNumbers } = useMarkingNumbersStore();
  const [isSelected, setIsSelected] = useState({
    YZ: true,
    XZ: false,
    XY: false,
  });

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

  const handleMarkingNumberX = (positionY: number, positionZ: number) => {
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

  const handleMarkingNumberY = (positionX: number, positionZ: number) => {
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

  const handleMarkingNumberZ = (positionX: number, positionY: number) => {
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
      <LayerSelection
        isSelected={isSelected.YZ}
        onClick={() => {
          setIsSelected({ YZ: !isSelected.YZ, XZ: false, XY: false });
        }}
      >
        YZ평면
      </LayerSelection>

      {isSelected.YZ && (
        <Layer>
          {positionsLayerX.map((row) => (
            <CubeSides key={row[0][0]}>
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
      )}

      <LayerSelection
        isSelected={isSelected.XZ}
        onClick={() => {
          setIsSelected({ YZ: false, XZ: !isSelected.XZ, XY: false });
        }}
      >
        XZ평면
      </LayerSelection>
      {isSelected.XZ && (
        <Layer>
          {positionsLayerY.map((row) => (
            <CubeSides key={row[0][0]}>
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
      )}

      <LayerSelection
        isSelected={isSelected.XY}
        onClick={() => {
          setIsSelected({ YZ: false, XZ: false, XY: !isSelected.XY });
        }}
      >
        XY평면
      </LayerSelection>
      {isSelected.XY && (
        <Layer>
          {positionsLayerZ.map((row) => (
            <CubeSides key={row[0][0]}>
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
      )}
    </SideBar>
  );
}

export default CustomPuzzleTable;
