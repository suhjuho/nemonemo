import { create } from "zustand";

const puzzlesStore = (set) => ({
  puzzles: {
    tutorial: {},
    easy: {},
    normal: {},
    hard: {},
    custom: {},
  },
  setPuzzles: (puzzles) => set({ puzzles }),
});

const usePuzzlesStore = create(puzzlesStore);

export default usePuzzlesStore;
