import { create } from "zustand";
import { Puzzle, CustomPuzzleState } from "../../types/puzzle.ts";

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
