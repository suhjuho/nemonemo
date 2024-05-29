import { create } from "zustand";
import { persist } from "zustand/middleware";

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

interface PuzzlesData {
  custom: Puzzle[];
  tutorial: Puzzle[];
  easy: Puzzle[];
  normal: Puzzle[];
  hard: Puzzle[];
}

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
      setPuzzles: (puzzles: PuzzlesData) => set({ puzzles }),
    }),
    { name: "puzzles" },
  ),
);

export default usePuzzlesStore;
