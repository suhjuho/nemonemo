import { create } from "zustand";

const puzzlesIndexStore = (set) => ({
  puzzlesIndex: { tutorial: 1, easy: 1, normal: 1, hard: 1, custom: 1 },
  setPuzzlesIndex: (puzzleIndex) => set({ puzzleIndex }),
});

const usePuzzlesIndexStore = create(puzzlesIndexStore);

export default usePuzzlesIndexStore;
