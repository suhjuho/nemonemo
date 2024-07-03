export type HeaderType = "main" | "game" | "setting" | "select";

export type UserNameState = {
  userName: string;
  setUserName: (userName: string) => void;
};

export type ClickModeState = {
  clickMode: "color" | "cube";
  setClickMode: (clickMode: "color" | "cube") => void;
};

export type OrbitControlState = {
  isOrbitEnable: boolean;
  setOrbitEnableState: (isOrbitEnable: boolean) => void;
};

export type RightClickState = {
  isRightClick: boolean;
  setIsRightClick: (isRightClick: boolean) => void;
};

export type DragPositionState = {
  dragPosition: number[];
  setDragPosition: (dragPosition: number[]) => void;
};

export type CameraPositionState = {
  cameraPosition: [number, number, number];
  setCameraPosition: (cameraPosition: [number, number, number]) => void;
};

type Sound = {
  isMuted: boolean;
  bgmSound: number;
  effectSound: number;
};

export type SoundState = {
  sound: Sound;
  changeSoundState: (sound: Sound) => void;
};

export type GameTimeState = {
  gameTime: number;
  changeGameTimeState: (gameTime: number) => void;
};

export type TutorialStepState = {
  tutorialStep: Record<string, number>;
  nextTutorialStep: (tutorialStep: Record<string, number>) => void;
};

export type LanguageState = {
  language: "English" | "한국어";
  changeLanguage: (language: "English" | "한국어") => void;
};

export type DeviceState = {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
};
