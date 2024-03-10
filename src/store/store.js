import { create } from "zustand";

const puzzlesStore = (set) => ({
  puzzles: {
    tutorial: {
      1: {
        title: "bamboo",
        size: [2, 5, 1],
        positions: [
          [-1, -4, 0],
          [-1, -2, 0],
          [-1, 0, 0],
          [-1, 2, 0],
          [-1, 4, 0],
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
        positions: [
          [-4, 3, -3],
          [-2, 3, -3],
          [0, 3, -3],
          [2, 3, -3],
          [4, 3, -3],
          [-4, 1, -3],
          [-2, 1, -3],
          [0, 1, -3],
          [2, 1, -3],
          [4, 1, -3],
          [-4, -1, -3],
          [-2, -1, -3],
          [0, -1, -3],
          [2, -1, -3],
          [4, -1, -3],
          [-4, -3, -3],
          [-2, -3, -3],
          [0, -3, -3],
          [2, -3, -3],
          [4, -3, -3],

          [-4, -3, -1],
          [-2, -3, -1],
          [0, -3, -1],
          [2, -3, -1],
          [4, -3, -1],

          [-4, -3, 1],
          [-2, -3, 1],
          [0, -3, 1],
          [2, -3, 1],
          [4, -3, 1],

          [-4, -3, 3],
          [-2, -3, 3],
          [0, -3, 3],
          [2, -3, 3],
          [4, -3, 3],
        ],
        numbersList: [
          [null, 5, null],
          [null, 5, null],
          [null, 5, null],
          [null, 5, null],
          [null, 5, null],
          [null, null, null],
          [null, null, null],
          [null, null, null],
          [null, 5, null],
          [null, null, null],
          [null, null, null],
          [null, null, null],
          [null, 5, null],
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      3: {
        title: "chair",
        size: [3, 6, 3],
        positions: [
          [-2, 5, -2],
          [0, 5, -2],
          [2, 5, -2],

          [-2, 3, -2],
          [0, 3, -2],
          [2, 3, -2],

          [-2, 1, -2],
          [0, 1, -2],
          [2, 1, -2],

          [-2, -1, -2],
          [0, -1, -2],
          [2, -1, -2],
          [-2, -1, 0],
          [0, -1, 0],
          [2, -1, 0],
          [-2, -1, 2],
          [0, -1, 2],
          [2, -1, 2],

          [-2, -3, -2],
          [2, -3, -2],
          [-2, -3, 2],
          [2, -3, 2],

          [-2, -5, -2],
          [2, -5, -2],
          [-2, -5, 2],
          [2, -5, 2],
        ],
        numbersList: [
          [null, 2, null],
          [null, 0, null],
          [null, 2, null],
          [null, 2, null],
          [null, 0, null],
          [null, 2, null],
          [null, 3, null],
          [null, 3, null],
          [null, 3, null],
          [null, 3, null],
          [null, null, null],
          [null, null, null],
          [null, 3, null],
          [null, null, null],
          [null, null, null],
          [null, 3, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    },
    normal: {},
    hard: {},
  },
  setPuzzles: (puzzles) => set({ puzzles }),
});

const answerStore = (set) => ({
  answer: {},
  setAnswer: (newAnswer) => set({ newAnswer }),
});

const defaultPositionsStore = (set) => ({
  defaultPositions: {},
  setDefaultPositions: (defaultPositions) => set({ defaultPositions }),
});

const clickModeStore = (set) => ({
  clickMode: "color", // color, cube
  setClickMode: (clickMode) => set({ clickMode }),
});

const orbitControlStore = (set) => ({
  isOrbitEnable: true,
  setOrbitEnableState: (isOrbitEnable) => set({ isOrbitEnable }),
});

const rightClickStore = (set) => ({
  isRightClick: false,
  setIsRightClick: (isRightClick) => set({ isRightClick }),
});

const dragPositionStore = (set) => ({
  dragPosition: [],
  setDragPosition: (dragPosition) => set({ dragPosition }),
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
const useAnswerStore = create(answerStore);
const useDefaultPositionsStore = create(defaultPositionsStore);
const useClickModeStore = create(clickModeStore);
const useOrbitControlStore = create(orbitControlStore);
const useRightClickStore = create(rightClickStore);
const useDragPositionStore = create(dragPositionStore);
const useLayerStore = create(layerStore);
const useSoundStore = create(soundStore);

export {
  usePuzzlesStore,
  useAnswerStore,
  useDefaultPositionsStore,
  useClickModeStore,
  useOrbitControlStore,
  useRightClickStore,
  useDragPositionStore,
  useLayerStore,
  useSoundStore,
};
