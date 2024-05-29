import { create } from "zustand";

interface Puzzle {
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
}

interface CustomPuzzleState {
  puzzleMaking: Puzzle;
  hasAnswers: boolean;
  hasColors: boolean;
  hasNumbers: boolean;
}

const usePuzzleMakingStore = create<CustomPuzzleState>()((set) => ({
  puzzleMaking: {
    title: "",
    size: [1, 1, 1],
    answers: {},
    colors: {},
    showingNumbers: { layerX: {}, layerY: {}, layerZ: {} },
    mainColor: "#000000",
    subColor: "#ffffff",
    ranking: [],
  },
  hasAnswers: false,
  hasColors: false,
  hasNumbers: false,
  setPuzzleMaking: (puzzleMaking: Puzzle) => set({ puzzleMaking }),
  getAnswers: (hasAnswers: boolean) => set({ hasAnswers }),
  getColors: (hasColors: boolean) => set({ hasColors }),
  getNumbers: (hasNumbers: boolean) => set({ hasNumbers }),
}));

export default usePuzzleMakingStore;
