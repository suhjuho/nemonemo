import { create } from "zustand";
import { persist } from "zustand/middleware";

type Puzzle = {
  title: string;
  size: [number, number, number];
};

type TotalPuzzle = {
  tutorial: Record<string, Puzzle>;
  easy: Record<string, Puzzle>;
  normal: Record<string, Puzzle>;
  hard: Record<string, Puzzle>;
  custom: Record<string, Puzzle>;
};

interface State {
  puzzles: TotalPuzzle;
  setPuzzles: (puzzles: TotalPuzzle) => void;
}

const usePuzzlesStore = create<State>()(
  persist(
    (set) => ({
      puzzles: {
        tutorial: {},
        easy: {},
        normal: {},
        hard: {},
        custom: {},
      },
      setPuzzles: (puzzles: TotalPuzzle) => set({ puzzles }),
    }),
    { name: "puzzles" },
  ),
);

export default usePuzzlesStore;
