import { useMemo } from "react";
import * as THREE from "three";

import CubeLine from "../Edge/CubeLine";
import GRID_CONSTANT from "../../constants/Grid";

function CubeEdge({ cubeLineGeometry }) {
  const cylinderMaterial = new THREE.MeshBasicMaterial({ color: "#454545" });

  const lines = useMemo(
    () =>
      GRID_CONSTANT.LAYER_CORNER_POSITIONS.ALL.map((LAYER_CORNER_POSITION) => (
        <CubeLine
          key={LAYER_CORNER_POSITION.start + LAYER_CORNER_POSITION.end}
          start={new THREE.Vector3(...LAYER_CORNER_POSITION.start)}
          end={new THREE.Vector3(...LAYER_CORNER_POSITION.end)}
          cubeLineGeometry={cubeLineGeometry}
          cubeLineMaterial={cylinderMaterial}
        />
      )),
    [],
  );

  return lines;
}

export default CubeEdge;
