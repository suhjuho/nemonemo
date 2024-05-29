import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePuzzlesStore = create(
  persist(
    (set) => ({
      puzzles: {
        tutorial: {},
        easy: {},
        normal: {},
        hard: {},
        custom: {},
      },
      setPuzzles: (puzzles) => set({ puzzles }),
    }),
    { name: "puzzles" },
  ),
);

export default usePuzzlesStore;
