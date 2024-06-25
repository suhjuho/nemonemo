export type Coordinate = [number, number, number];

type MarkingNumber = {
  total: number;
  piece: number;
};

export type MarkingNumbers = {
  layerX: Record<string, MarkingNumber>;
  layerY: Record<string, MarkingNumber>;
  layerZ: Record<string, MarkingNumber>;
};

export type ShowingNumbers = {
  layerX?: Record<string, boolean>;
  layerY?: Record<string, boolean>;
  layerZ?: Record<string, boolean>;
};

export type MarkingNumbersState = {
  markingNumbers: MarkingNumbers;
  setMarkingNumbers: (markingNumbers: MarkingNumbers) => void;
};

export type DefaultPuzzle = Coordinate[];

export type CubeState = {
  isClicked: boolean;
  isRemoved: boolean;
  isHidden: boolean;
};

export type CubeStatesState = {
  cubeStates: Record<string, CubeState>;
  cubeStatesHistory: Record<string, CubeState>[];
  historyIndex: number;
  setCubeStates: (cubeStates: Record<string, CubeState>) => void;
  setCubeStatesHistory: (
    cubeStatesHistory: Record<string, CubeState>[],
  ) => void;
  setHistoryIndex: (historyIndex: number) => void;
};
