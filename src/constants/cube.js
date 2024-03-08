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
};

export default CUBE_CONSTANT;
