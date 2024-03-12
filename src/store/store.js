import { create } from "zustand";

const puzzlesStore = (set) => ({
  puzzles: {
    tutorial: {
      1: {
        title: "bamboo",
        size: [2, 5, 1],
        positions: [
          [0, 0, 0],
          [0, 1, 0],
          [0, 2, 0],
          [0, 3, 0],
          [0, 4, 0],
        ],
        numbersList: [
          [0, 4, 0],
          [1, 4, 0],
        ],
      },
      2: {
        title: "laptop",
        size: [5, 4, 4],
        positions: [[0, 0, 0]],
        numbersList: [
          [0, 0, 0],
          [1, 0, 0],
        ],
      },
      3: {
        title: "chair",
        size: [3, 6, 3],
        positions: [
          [0, 5, 0],
          [1, 5, 0],
          [2, 5, 0],

          [0, 4, 0],
          [1, 4, 0],
          [2, 4, 0],

          [0, 3, 0],
          [1, 3, 0],
          [2, 3, 0],

          [0, 2, 0],
          [1, 2, 0],
          [2, 2, 0],
          [0, 2, 1],
          [1, 2, 1],
          [2, 2, 1],
          [0, 2, 2],
          [1, 2, 2],
          [2, 2, 2],

          [0, 1, 0],
          [2, 1, 0],
          [0, 1, 2],
          [2, 1, 2],

          [0, 0, 0],
          [2, 0, 0],
          [0, 0, 2],
          [2, 0, 2],
        ],
        numbersList: [
          [0, 5, 0],
          [1, 5, 0],
          [2, 5, 0],

          [0, 4, 0],
          [1, 4, 0],
          [2, 4, 0],

          [0, 3, 0],
          [1, 3, 0],
          [2, 3, 0],

          [0, 2, 0],
          [1, 2, 0],
          [2, 2, 0],
          [0, 2, 1],
          [1, 2, 1],
          [2, 2, 1],
          [0, 2, 2],
          [1, 2, 2],
          [2, 2, 2],

          [0, 1, 0],
          [2, 1, 0],
          [0, 1, 2],
          [2, 1, 2],

          [0, 0, 0],
          [2, 0, 0],
          [0, 0, 2],
          [2, 0, 2],
        ],
      },
    },
    normal: {},
    hard: {},
  },
  setPuzzles: (puzzles) => set({ puzzles }),
});

const markingNumbersStore = (set) => ({
  markingNumbers: {},
  setMarkingNumbers: (markingNumbers) => set({ markingNumbers }),
});

const answerStore = (set) => ({
  answer: {},
  setAnswer: (newAnswer) => set({ newAnswer }),
});

const cubeStatesStore = (set) => ({
  cubeStates: {},
  cubeStatesHistory: [],
  historyIndex: 0,
  setCubeStates: (cubeStates) => set({ cubeStates }),
  setCubeStatesHistory: (cubeStatesHistory) => set({ cubeStatesHistory }),
  setHistoryIndex: (historyIndex) => set({ historyIndex }),
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

const cameraPositionStore = (set) => ({
  cameraPosition: [0, 1, 1],
  setCameraPosition: (cameraPosition) => set({ cameraPosition }),
});

const layerStore = (set) => ({
  layerDirection: "FRONT", // FRONT, BACK, LEFT, RIGHT
  currentLayer: 0,
  layers: [],
  setCurrentLayer: (currentLayer) => set({ currentLayer }),
  setLayers: (layers) => set({ layers }),
  setLayerDirection: (layerDirection) => set({ layerDirection }),
});

const soundStore = (set) => ({
  isMuted: true,
  changeMuteState: () => set((state) => ({ isMuted: !state.isMuted })),
});

const usePuzzlesStore = create(puzzlesStore);
const useMarkingNumbersStore = create(markingNumbersStore);
const useAnswerStore = create(answerStore);
const useCubeStatesStore = create(cubeStatesStore);
const useClickModeStore = create(clickModeStore);
const useOrbitControlStore = create(orbitControlStore);
const useRightClickStore = create(rightClickStore);
const useDragPositionStore = create(dragPositionStore);
const useCameraPositionStore = create(cameraPositionStore);
const useLayerStore = create(layerStore);
const useSoundStore = create(soundStore);

export {
  usePuzzlesStore,
  useMarkingNumbersStore,
  useAnswerStore,
  useCubeStatesStore,
  useClickModeStore,
  useOrbitControlStore,
  useRightClickStore,
  useDragPositionStore,
  useCameraPositionStore,
  useLayerStore,
  useSoundStore,
};
