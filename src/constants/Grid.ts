const GRID_CONSTANT = {
  POSITION: {
    LAYER: {
      UP: [1, 0, 2],
      DOWN: [1, 0, 2],
      LEFT: [0, 1, 2],
      RIGHT: [0, 1, 2],
      BACK: [2, 0, 1],
      FORTH: [2, 0, 1],
    },
  },
  LAYER_CORNER_POSITIONS: {
    ALL: [
      { start: [-1, -1, -1], end: [-1, -1, 1] },
      { start: [-1, -1, 1], end: [1, -1, 1] },
      { start: [1, -1, 1], end: [1, -1, -1] },
      { start: [1, -1, -1], end: [-1, -1, -1] },

      { start: [-1, 1, -1], end: [-1, 1, 1] },
      { start: [-1, 1, 1], end: [1, 1, 1] },
      { start: [1, 1, 1], end: [1, 1, -1] },
      { start: [1, 1, -1], end: [-1, 1, -1] },

      { start: [-1, -1, -1], end: [-1, 1, -1] },
      { start: [1, -1, 1], end: [1, 1, 1] },
      { start: [1, -1, -1], end: [1, 1, -1] },
      { start: [-1, -1, 1], end: [-1, 1, 1] },
    ],
  },
};

export default GRID_CONSTANT;
