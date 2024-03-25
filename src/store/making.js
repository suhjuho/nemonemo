import { create } from "zustand";

const puzzleMakingStore = (set) => ({
  puzzleMaking: {
    title: "",
    size: [1, 1, 1],
    answers: {},
    colors: {},
    showingNumbers: { layerX: {}, layerY: {}, layerZ: {} },
    mainColor: "#000000",
    subColor: "#ffffff",
  },
  hasAnswers: false,
  hasColors: false,
  hasNumbers: false,
  setPuzzleMaking: (puzzleMaking) => set({ puzzleMaking }),
  getAnswers: (hasAnswers) => set({ hasAnswers }),
  getColors: (hasColors) => set({ hasColors }),
  getNumbers: (hasNumbers) => set({ hasNumbers }),
});

const usePuzzleMakingStore = create(puzzleMakingStore);

export default usePuzzleMakingStore;
