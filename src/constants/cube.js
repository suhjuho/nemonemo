const UP_LAYER = [0, 1.01, 0];
const LEFT_LAYER = [-1.01, 0, 0];
const RIGHT_LAYER = [0, 0, 1.01];

const CUBE_CONSTANT = {
  LAYERS: [UP_LAYER, LEFT_LAYER, RIGHT_LAYER],
  ROTATIONS: [
    [-Math.PI / 2, 0, 0],
    [0, -Math.PI / 2, 0],
    [0, 0, 0],
  ],
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
};

export default CUBE_CONSTANT;
