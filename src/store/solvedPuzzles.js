import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSolvedPuzzlesStore = create(
  persist(
    (set) => ({
      solvedPuzzles: {
        tutorial: {},
        easy: {},
        normal: {},
        hard: {},
        custom: {},
      },
      setSolvedPuzzles: (solvedPuzzles) => set({ solvedPuzzles }),
    }),
    {
      name: "solved-puzzles",
    },
  ),
);

export default useSolvedPuzzlesStore;
