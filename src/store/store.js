import { create } from "zustand";

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
  currentLayer: 6,
  layers: { x: [], z: [] },
  setCurrentLayer: (currentLayer) => set({ currentLayer }),
  setLayers: (layers) => set({ layers }),
  setLayerDirection: (layerDirection) => set({ layerDirection }),
});

const soundStore = (set) => ({
  sound: {
    isMuted: true,
    bgmSound: 0.3,
    effectSound: 0.3,
  },
  changeSoundState: (sound) => set({ sound }),
});

const gameTimeStore = (set) => ({
  gameTime: 0,
  changeGameTimeState: (gameTime) => set({ gameTime }),
});

const tutorialStep = (set) => ({
  tutorialStep: {
    1: 1,
    2: 1,
    3: 1,
  },
  nextTutorialStep: (step) => set({ step }),
});

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
const useGameTimeStore = create(gameTimeStore);
const useTutorialStepStore = create(tutorialStep);

export {
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
  useGameTimeStore,
  useTutorialStepStore,
};
