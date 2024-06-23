export type Puzzle = {
  title: string;
  size: [number, number, number];
  answers: Record<string, boolean>;
  colors: Record<string, string>;
  showingNumbers: {
    layerX: Record<string, boolean>;
    layerY: Record<string, boolean>;
    layerZ: Record<string, boolean>;
  };
  mainColor: string;
  subColor: string;
  ranking: number[];
};

export interface CustomPuzzleState {
  puzzleMaking: Puzzle;
  hasAnswers: boolean;
  hasColors: boolean;
  hasNumbers: boolean;
}

export interface PuzzlesData {
  custom: Puzzle[];
  tutorial: Puzzle[];
  easy: Puzzle[];
  normal: Puzzle[];
  hard: Puzzle[];
}

export interface PuzzlesIndexState {
  puzzlesIndex: Record<string, number>;
  setPuzzlesIndex: (puzzlesIndex: Record<string, number>) => void;
}

export interface SolvedPuzzlesData {
  custom: Record<string, boolean>;
  tutorial: Record<string, boolean>;
  easy: Record<string, boolean>;
  normal: Record<string, boolean>;
  hard: Record<string, boolean>;
}

export type AnswerState = {
  answer: Record<string, boolean>;
  isComplete: boolean;
  setAnswer: (answer: Record<string, boolean>) => void;
  setIsComplete: (isComplete: boolean) => void;
};

export type LayerState = {
  layerDirection: "FRONT" | "BACK" | "LEFT" | "RIGHT";
  currentLayer: number;
  layers: { x: number[]; z: number[] };
  setLayerDirection: (
    layerDirection: "FRONT" | "BACK" | "LEFT" | "RIGHT",
  ) => void;
  setCurrentLayer: (currentLayer: number) => void;
  setLayers: (layers: { x: number[]; z: number[] }) => void;
};
