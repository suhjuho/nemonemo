const UP_LAYER = {
  center: [0, 1.01, 0],
  corner: {
    FRONT: [0.5, 1.01, -0.5],
    BACK: [-0.5, 1.01, 0.5],
    LEFT: [0.5, 1.01, 0.5],
    RIGHT: [-0.5, 1.01, -0.5],
  },
};
const DOWN_LAYER = {
  center: [0, -1.01, 0],
  corner: {
    FRONT: [0.5, -1.01, 0.5],
    BACK: [-0.5, -1.01, -0.5],
    LEFT: [-0.5, -1.01, 0.5],
    RIGHT: [0.5, -1.01, -0.5],
  },
};
const RIGHT_LAYER = { center: [1.01, 0, 0], corner: [1.01, 0.5, -0.5] };
const LEFT_LAYER = { center: [-1.01, 0, 0], corner: [-1.01, 0.5, 0.5] };
const FRONT_LAYER = { center: [0, 0, 1.01], corner: [0.5, 0.5, 1.01] };
const BACK_LAYER = { center: [0, 0, -1.01], corner: [-0.5, 0.5, -1.01] };

const CUBE_CONSTANT = {
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

export default CUBE_CONSTANT;
