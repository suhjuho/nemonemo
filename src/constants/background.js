const BACKGROUND_CONSTANT = {
  MATERIAL_ARGS: { color: "#577D6D" },
  GEOMETRY_ARGS: [200, 200],
  DIRECTIONS: [
    { rotation: [-Math.PI / 2, 0, 0], position: [0, -100, 0] },
    { rotation: [Math.PI / 2, 0, 0], position: [0, 100, 0] },
    { rotation: [0, -Math.PI / 2, -Math.PI / 2], position: [100, 0, 0] },
    { rotation: [0, Math.PI / 2, -Math.PI / 2], position: [-100, 0, 0] },
    { rotation: [0, 0, -Math.PI / 2], position: [0, 0, -100] },
    { rotation: [0, Math.PI, -Math.PI / 2], position: [0, 0, 100] },
  ],
};

export default BACKGROUND_CONSTANT;
