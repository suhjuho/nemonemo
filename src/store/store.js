import { create } from "zustand";

const puzzlesStore = (set) => ({
  puzzles: {
    tutorial: {
      1: {
        title: "bamboo",
        size: [2, 5, 1],
        answers: {
          "000": true,
          "010": true,
          "020": true,
          "030": true,
          "040": true,
        },
        showingNumbers: {
          layerX: [[0, 0]],
          layerY: [
            [0, 0],
            [1, 0],
          ],
          layerZ: [[0, 0]],
        },
      },
      2: {
        title: "laptop",
        size: [5, 4, 4],
        answers: { "000": true, "001": true },
        showingNumbers: {
          layerX: [[0, 0]],
          layerY: [[0, 0]],
          layerZ: [[0, 0]],
        },
      },
      3: {
        title: "chair",
        size: [3, 6, 3],
        answers: {
          "050": true,
          150: true,
          250: true,
          "040": true,
          140: true,
          240: true,

          "030": true,
          130: true,
          230: true,

          "020": true,
          120: true,
          220: true,
          "021": true,
          121: true,
          221: true,
          "022": true,
          122: true,
          222: true,

          "010": true,
          210: true,
          "012": true,
          212: true,

          "000": true,
          200: true,
          "002": true,
          202: true,
        },
        showingNumbers: {
          layerX: [
            [0, 0],
            [0, 1],
            [0, 2],

            [1, 1],

            [4, 1],
            [3, 1],

            [5, 0],
          ],
          layerY: [
            [0, 0],
            [1, 0],
            [2, 0],

            [0, 1],

            [0, 2],
            [1, 2],
            [2, 2],
          ],
          layerZ: [
            [0, 2],
            [1, 2],
            [2, 2],

            [1, 5],
            [2, 5],
          ],
        },
      },
    },
    normal: {
      1: {
        title: "boat",
        size: [10, 4, 10],
        answers: [
          [0, 0, 0],
          [0, 1, 0],
          [0, 2, 0],
          [0, 3, 0],
          [0, 4, 0],
        ],
        showingNumbers: {
          layerX: [[0, 0]],
          layerY: [
            [0, 0],
            [1, 0],
          ],
          layerZ: [[0, 0]],
        },
      },
    },
    hard: {
      1: {
        title: "Jordan",
        size: [10, 10, 10],
        answers: [
          [0, 0, 0],
          [0, 1, 0],
          [0, 2, 0],
          [0, 3, 0],
          [0, 4, 0],
        ],
        showingNumbers: {
          layerX: [[0, 0]],
          layerY: [
            [0, 0],
            [1, 0],
          ],
          layerZ: [[0, 0]],
        },
      },
    },
  },
  setPuzzles: (puzzles) => set({ puzzles }),
});

const markingNumbersStore = (set) => ({
  markingNumbers: {},
  setMarkingNumbers: (markingNumbers) => set({ markingNumbers }),
});

const answerStore = (set) => ({
  answer: {},
  isComplete: false,
  setAnswer: (answer) => set({ answer }),
  setIsComplete: (isComplete) => set({ isComplete }),
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
