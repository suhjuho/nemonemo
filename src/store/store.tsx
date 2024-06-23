import { create } from "zustand";
import { MarkingNumbersState, CubeStatesState } from "../../types/cube.ts";
import { AnswerState, LayerState } from "../../types/puzzle.ts";
import {
  ClickModeState,
  OrbitControlState,
  RightClickState,
  DragPositionState,
  CameraPositionState,
  SoundState,
  GameTimeState,
  TutorialStepState,
  LanguageState,
  DeviceState,
} from "../../types/setting.ts";

const useMarkingNumbersStore = create<MarkingNumbersState>()((set) => ({
  markingNumbers: {
    layerX: {},
    layerY: {},
    layerZ: {},
  },
  setMarkingNumbers: (markingNumbers) => set({ markingNumbers }),
}));

const useAnswerStore = create<AnswerState>()((set) => ({
  answer: {},
  isComplete: false,
  setAnswer: (answer) => set({ answer }),
  setIsComplete: (isComplete) => set({ isComplete }),
}));

const useCubeStatesStore = create<CubeStatesState>()((set) => ({
  cubeStates: {},
  cubeStatesHistory: [],
  historyIndex: 0,
  setCubeStates: (cubeStates) => set({ cubeStates }),
  setCubeStatesHistory: (cubeStatesHistory) => set({ cubeStatesHistory }),
  setHistoryIndex: (historyIndex) => set({ historyIndex }),
}));

const useClickModeStore = create<ClickModeState>()((set) => ({
  clickMode: "color", // color, cube
  setClickMode: (clickMode) => set({ clickMode }),
}));

const useOrbitControlStore = create<OrbitControlState>()((set) => ({
  isOrbitEnable: true,
  setOrbitEnableState: (isOrbitEnable) => set({ isOrbitEnable }),
}));

const useRightClickStore = create<RightClickState>()((set) => ({
  isRightClick: false,
  setIsRightClick: (isRightClick) => set({ isRightClick }),
}));

const useDragPositionStore = create<DragPositionState>()((set) => ({
  dragPosition: [],
  setDragPosition: (dragPosition) => set({ dragPosition }),
}));

const useCameraPositionStore = create<CameraPositionState>()((set) => ({
  cameraPosition: [0, 1, 1],
  setCameraPosition: (cameraPosition) => set({ cameraPosition }),
}));

const useLayerStore = create<LayerState>()((set) => ({
  layerDirection: "FRONT", // FRONT, BACK, LEFT, RIGHT
  currentLayer: 6,
  layers: { x: [], z: [] },
  setLayerDirection: (layerDirection) => set({ layerDirection }),
  setCurrentLayer: (currentLayer) => set({ currentLayer }),
  setLayers: (layers) => set({ layers }),
}));

const useSoundStore = create<SoundState>()((set) => ({
  sound: {
    isMuted: true,
    bgmSound: 0.3,
    effectSound: 0.3,
  },
  changeSoundState: (sound) => set({ sound }),
}));

const useGameTimeStore = create<GameTimeState>()((set) => ({
  gameTime: 0,
  changeGameTimeState: (gameTime) => set({ gameTime }),
}));

const useTutorialStepStore = create<TutorialStepState>()((set) => ({
  tutorialStep: {},
  nextTutorialStep: (tutorialStep) => set({ tutorialStep }),
}));

const useLanguageStore = create<LanguageState>()((set) => ({
  language: "English", // "한국어"
  changeLanguage: (language) => set({ language }),
}));

const useDeviceStore = create<DeviceState>()((set) => ({
  isMobile: false,
  setIsMobile: (isMobile) => set({ isMobile }),
}));

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
  useLanguageStore,
  useDeviceStore,
};
