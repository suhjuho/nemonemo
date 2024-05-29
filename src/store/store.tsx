import { create } from "zustand";

type MarkingNumber = {
  total: number;
  piece: number;
};

type MarkingNumbers = {
  layerX: Record<string, MarkingNumber>;
  layerY: Record<string, MarkingNumber>;
  layerZ: Record<string, MarkingNumber>;
};

type MarkingNumbersState = {
  markingNumbers: MarkingNumbers;
  setMarkingNumbers: (markingNumbers: MarkingNumbers) => void;
};

const useMarkingNumbersStore = create<MarkingNumbersState>()((set) => ({
  markingNumbers: {
    layerX: {},
    layerY: {},
    layerZ: {},
  },
  setMarkingNumbers: (markingNumbers) => set({ markingNumbers }),
}));

type AnswerState = {
  answer: Record<string, boolean>;
  isComplete: boolean;
  setAnswer: (answer: Record<string, boolean>) => void;
  setIsComplete: (isComplete: boolean) => void;
};

const useAnswerStore = create<AnswerState>()((set) => ({
  answer: {},
  isComplete: false,
  setAnswer: (answer) => set({ answer }),
  setIsComplete: (isComplete) => set({ isComplete }),
}));

type CubeState = {
  isClicked: boolean;
  isRemoved: boolean;
  isHidden: boolean;
};

type CubeStatesState = {
  cubeStates: Record<string, CubeState>;
  cubeStatesHistory: Record<string, CubeState>[];
  historyIndex: number;
  setCubeStates: (cubeStates: Record<string, CubeState>) => void;
  setCubeStatesHistory: (
    cubeStatesHistory: Record<string, CubeState>[],
  ) => void;
  setHistoryIndex: (historyIndex: number) => void;
};

const useCubeStatesStore = create<CubeStatesState>()((set) => ({
  cubeStates: {},
  cubeStatesHistory: [],
  historyIndex: 0,
  setCubeStates: (cubeStates) => set({ cubeStates }),
  setCubeStatesHistory: (cubeStatesHistory) => set({ cubeStatesHistory }),
  setHistoryIndex: (historyIndex) => set({ historyIndex }),
}));

type ClickModeState = {
  clickMode: string;
  setClickMode: (clickMode: string) => void;
};

const useClickModeStore = create<ClickModeState>()((set) => ({
  clickMode: "color", // color, cube
  setClickMode: (clickMode) => set({ clickMode }),
}));

type OrbitControlState = {
  isOrbitEnable: boolean;
  setOrbitEnableState: (isOrbitEnable: boolean) => void;
};

const useOrbitControlStore = create<OrbitControlState>()((set) => ({
  isOrbitEnable: true,
  setOrbitEnableState: (isOrbitEnable) => set({ isOrbitEnable }),
}));

type RightClickState = {
  isRightClick: boolean;
  setIsRightClick: (isRightClick: boolean) => void;
};

const useRightClickStore = create<RightClickState>()((set) => ({
  isRightClick: false,
  setIsRightClick: (isRightClick) => set({ isRightClick }),
}));

type DragPositionState = {
  dragPosition: number[];
  setDragPosition: (dragPosition: number[]) => void;
};

const useDragPositionStore = create<DragPositionState>()((set) => ({
  dragPosition: [],
  setDragPosition: (dragPosition) => set({ dragPosition }),
}));

type CameraPositionState = {
  cameraPosition: [number, number, number];
  setCameraPosition: (cameraPosition: [number, number, number]) => void;
};

const useCameraPositionStore = create<CameraPositionState>()((set) => ({
  cameraPosition: [0, 1, 1],
  setCameraPosition: (cameraPosition) => set({ cameraPosition }),
}));

type LayerState = {
  layerDirection: "FRONT" | "BACK" | "LEFT" | "RIGHT";
  currentLayer: number;
  layers: { x: number[]; z: number[] };
  setLayerDirection: (
    layerDirection: "FRONT" | "BACK" | "LEFT" | "RIGHT",
  ) => void;
  setCurrentLayer: (currentLayer: number) => void;
  setLayers: (layers: { x: number[]; z: number[] }) => void;
};

const useLayerStore = create<LayerState>()((set) => ({
  layerDirection: "FRONT", // FRONT, BACK, LEFT, RIGHT
  currentLayer: 6,
  layers: { x: [], z: [] },
  setLayerDirection: (layerDirection) => set({ layerDirection }),
  setCurrentLayer: (currentLayer) => set({ currentLayer }),
  setLayers: (layers) => set({ layers }),
}));

type Sound = {
  isMuted: boolean;
  bgmSound: number;
  effectSound: number;
};

type SoundState = {
  sound: Sound;
  changeSoundState: (sound: Sound) => void;
};

const useSoundStore = create<SoundState>()((set) => ({
  sound: {
    isMuted: true,
    bgmSound: 0.3,
    effectSound: 0.3,
  },
  changeSoundState: (sound) => set({ sound }),
}));

type GameTimeState = {
  gameTime: number;
  changeGameTimeState: (gameTime: number) => void;
};

const useGameTimeStore = create<GameTimeState>()((set) => ({
  gameTime: 0,
  changeGameTimeState: (gameTime) => set({ gameTime }),
}));

type TutorialStepState = {
  tutorialStep: Record<string, number>;
  nextTutorialStep: (tutorialStep: Record<string, number>) => void;
};

const useTutorialStepStore = create<TutorialStepState>()((set) => ({
  tutorialStep: {},
  nextTutorialStep: (tutorialStep) => set({ tutorialStep }),
}));

type LanguageState = {
  language: "English" | "한국어";
  changeLanguage: (language: "English" | "한국어") => void;
};

const useLanguageStore = create<LanguageState>()((set) => ({
  language: "English", // "한국어"
  changeLanguage: (language) => set({ language }),
}));

type DeviceState = {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
};

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
