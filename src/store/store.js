import { create } from "zustand";

const puzzlesStore = (set) => ({
  puzzles: {
    tutorial: {
      1: {
        title: "bamboo",
        size: [1, 5, 2],
        positions: [
          [-1, -4, 0],
          [-1, -2, 0],
          [-1, 0, 0],
          [-1, 2, 0],
          [-1, 4, 0],
          [1, -4, 0],
          [1, -2, 0],
          [1, -0, 0],
          [1, 2, 0],
          [1, 4, 0],
        ],
        numbersList: [
          [5, null, null],
          [5, null, null],
          [5, null, null],
          [5, null, null],
          [5, null, null],
          [0, null, null],
          [0, null, null],
          [0, null, null],
          [0, null, null],
          [0, null, null],
        ],
      },
      2: {
        title: "macbook",
        size: [5, 4, 4],
      },
      3: {
        title: "chair",
        size: [3, 6, 3],
      },
    },
    normal: {},
    hard: {},
  },
  setPuzzles: (puzzles) => set({ puzzles }),
});

const clickModeStore = (set) => ({
  clickMode: "color", // color, block
  setClickMode: (mode) => set({ mode }),
});

const layerStore = (set) => ({
  layerMode: "all", // all, one
  setLayerMode: (mode) => set({ mode }),
});

const soundStore = (set) => ({
  isMuted: true,
  changeMuteState: () => set((state) => ({ isMuted: !state.isMuted })),
});

const usePuzzlesStore = create(puzzlesStore);
const useClickModeStore = create(clickModeStore);
const useLayerStore = create(layerStore);
const useSoundStore = create(soundStore);

export { usePuzzlesStore, useClickModeStore, useLayerStore, useSoundStore };
