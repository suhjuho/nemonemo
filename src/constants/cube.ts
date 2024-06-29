import * as THREE from "three";

type LayerPosition = "UP" | "DOWN" | "FORTH" | "BACK" | "RIGHT" | "LEFT";
type Coordinate = [number, number, number];
type Rotation = [number, number, number];
type CornerCoordinate = {
  FRONT: Coordinate;
  BACK: Coordinate;
  LEFT: Coordinate;
  RIGHT: Coordinate;
};
type VerticalLayer = {
  center: Coordinate;
  corner: CornerCoordinate;
};
type Layer = {
  center: Coordinate;
  corner: Coordinate;
};
type Rotations = {
  FRONT: Rotation;
  BACK: Rotation;
  LEFT: Rotation;
  RIGHT: Rotation;
};
type MaterialArgs = {
  opacity?: number;
  color?: string;
};
type HoverMaterialArgs = {
  emissive?: string;
};
type Scaffold = {
  [key: string]: LayerPosition[];
};
type Keys = {
  [key: string]: boolean;
};

interface CubeConstant {
  LAYERS: {
    UP_LAYER: VerticalLayer;
    DOWN_LAYER: VerticalLayer;
    RIGHT_LAYER: Layer;
    LEFT_LAYER: Layer;
    FRONT_LAYER: Layer;
    BACK_LAYER: Layer;
  };
  ROTATIONS: {
    UP_LAYER: Rotations;
    DOWN_LAYER: Rotations;
    FRONT_LAYER: Rotation;
    BACK_LAYER: Rotation;
    LEFT_LAYER: Rotation;
    RIGHT_LAYER: Rotation;
  };
  MATERIAL_ARGS: {
    blank: MaterialArgs;
    marked: MaterialArgs;
    invisible: MaterialArgs;
    haze: MaterialArgs;
  };
  HOVER_MATERIAL_ARGS: {
    hover: HoverMaterialArgs;
    default: HoverMaterialArgs;
  };
  BACK_SCAFFOLD: Scaffold;
  INSIDE_CUBE_KEYS: Keys;
  OUTSIDE_CUBE_KEYS: Keys;
  UNDO_KEYS: Keys;
  REDO_KEYS: Keys;
  MODE_CHANGE_KEYS: Keys;
  INSIDE_DIRECTIONS: Keys;
  OUTSIDE_DIRECTIONS: Keys;
}

const UP_LAYER: VerticalLayer = {
  center: [0, 1.01, 0],
  corner: {
    FRONT: [0.5, 1.01, -0.5],
    BACK: [-0.5, 1.01, 0.5],
    LEFT: [0.5, 1.01, 0.5],
    RIGHT: [-0.5, 1.01, -0.5],
  },
};
const DOWN_LAYER: VerticalLayer = {
  center: [0, -1.01, 0],
  corner: {
    FRONT: [0.5, -1.01, 0.5],
    BACK: [-0.5, -1.01, -0.5],
    LEFT: [-0.5, -1.01, 0.5],
    RIGHT: [0.5, -1.01, -0.5],
  },
};
const RIGHT_LAYER: Layer = { center: [1.01, 0, 0], corner: [1.01, 0.5, -0.5] };
const LEFT_LAYER: Layer = { center: [-1.01, 0, 0], corner: [-1.01, 0.5, 0.5] };
const FRONT_LAYER: Layer = { center: [0, 0, 1.01], corner: [0.5, 0.5, 1.01] };
const BACK_LAYER: Layer = { center: [0, 0, -1.01], corner: [-0.5, 0.5, -1.01] };

export const CUBE_CONSTANT: CubeConstant = {
  LAYERS: {
    UP_LAYER,
    LEFT_LAYER,
    FRONT_LAYER,
    DOWN_LAYER,
    RIGHT_LAYER,
    BACK_LAYER,
  },
  ROTATIONS: {
    UP_LAYER: {
      FRONT: [-Math.PI / 2, 0, 0],
      BACK: [-Math.PI / 2, 0, Math.PI],
      LEFT: [-Math.PI / 2, 0, -Math.PI / 2],
      RIGHT: [-Math.PI / 2, 0, Math.PI / 2],
    },
    DOWN_LAYER: {
      FRONT: [Math.PI / 2, 0, 0],
      BACK: [Math.PI / 2, 0, Math.PI],
      LEFT: [Math.PI / 2, 0, Math.PI / 2],
      RIGHT: [Math.PI / 2, 0, -Math.PI / 2],
    },

    FRONT_LAYER: [0, 0, 0],
    BACK_LAYER: [0, Math.PI, 0],
    LEFT_LAYER: [0, -Math.PI / 2, 0],
    RIGHT_LAYER: [0, Math.PI / 2, 0],
  },
  MATERIAL_ARGS: {
    blank: { opacity: 1, color: "#ffffff" },
    marked: { opacity: 1, color: "#55cd55" },
    invisible: { color: "#ffffff" },
    haze: { opacity: 0.5, color: "#96c1f0" },
  },
  HOVER_MATERIAL_ARGS: {
    hover: { emissive: "#ffffff" },
    default: {},
  },
  BACK_SCAFFOLD: {
    "011": ["BACK", "RIGHT", "DOWN"],
    111: ["BACK", "LEFT", "DOWN"],
    110: ["FORTH", "LEFT", "DOWN"],
    "010": ["FORTH", "RIGHT", "DOWN"],
    "001": ["BACK", "RIGHT", "UP"],
    101: ["BACK", "LEFT", "UP"],
    100: ["FORTH", "LEFT", "UP"],
    "000": ["FORTH", "RIGHT", "UP"],
    moving: [],
  },
  INSIDE_CUBE_KEYS: { q: true, Q: true, ㅂ: true },
  OUTSIDE_CUBE_KEYS: { w: true, W: true, ㅈ: true },
  UNDO_KEYS: { z: true, Z: true, ㅋ: true },
  REDO_KEYS: { x: true, X: true, ㅌ: true },
  MODE_CHANGE_KEYS: { c: true, C: true, ㅊ: true },
  INSIDE_DIRECTIONS: { FRONT: true, RIGHT: true },
  OUTSIDE_DIRECTIONS: { BACK: true, LEFT: true },
};

export const CubeGeometry = new THREE.BoxGeometry(2, 2, 2);
export const CubeLineGeometry = new THREE.CylinderGeometry(0.03, 0.03, 2, 8);
