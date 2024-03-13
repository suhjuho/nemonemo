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
    blank: { color: "#ffffff" },
    marked: { color: "#55cd55" },
    invisible: {},
    haze: { opacity: 0.2, color: "#96c1f0" },
  },
  HOVER_MATERIAL_ARGS: {
    hover: { emissive: "#5bea5b" },
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
  },
  INSIDE_CUBE_KEYS: ["q", "Q", "ㅂ"],
  OUTSIDE_CUBE_KEYS: ["w", "W", "ㅈ"],
  UNDO_KEYS: ["z", "Z", "ㅋ"],
  REDO_KEYS: ["x", "X", "ㅌ"],
  INSIDE_DIRECTIONS: ["FRONT", "RIGHT"],
  OUTSIDE_DIRECTIONS: ["BACK", "LEFT"],
};

export default CUBE_CONSTANT;
