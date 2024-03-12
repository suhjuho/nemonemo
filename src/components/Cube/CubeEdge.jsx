import { useRef, useMemo } from "react";
import * as THREE from "three";

const LAYER_CORNER_POSITIONS = {
  UP: [
    [-1, 1, -1],
    [-1, 1, 1],
    [1, 1, 1],
    [1, 1, -1],
  ],
  DOWN: [
    [-1, -1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, -1, -1],
  ],
  LEFT: [
    [-1, -1, -1],
    [-1, -1, 1],
    [-1, 1, 1],
    [-1, 1, -1],
  ],
  RIGHT: [
    [1, -1, -1],
    [1, -1, 1],
    [1, 1, 1],
    [1, 1, -1],
  ],
  FORWARD: [
    [-1, -1, 1],
    [-1, 1, 1],
    [1, 1, 1],
    [1, -1, 1],
  ],
  BACK: [
    [-1, -1, -1],
    [-1, 1, -1],
    [1, 1, -1],
    [1, -1, -1],
  ],
};

function ThickLine({ start, end, thickness, color }) {
  const line = useRef();

  const direction = new THREE.Vector3().subVectors(end, start).normalize();
  const length = start.distanceTo(end);
  const cylinderGeometry = new THREE.CylinderGeometry(
    thickness,
    thickness,
    length,
    8,
  );
  const cylinderMaterial = new THREE.MeshBasicMaterial({ color });
  const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

  const center = new THREE.Vector3(
    (start.x + end.x) / 2,
    (start.y + end.y) / 2,
    (start.z + end.z) / 2,
  );
  cylinder.position.copy(center);
  cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

  return <primitive object={cylinder} ref={line} />;
}

function CubeEdge({ layerPosition }) {
  const layerCornerPositions = useMemo(
    () => LAYER_CORNER_POSITIONS[layerPosition],
    [layerPosition],
  );

  const lines = useMemo(
    () =>
      layerCornerPositions.map((startPos, index) => {
        const endPos =
          layerCornerPositions[(index + 1) % layerCornerPositions.length];
        return (
          <ThickLine
            key={layerPosition + startPos + endPos}
            start={new THREE.Vector3(...startPos)}
            end={new THREE.Vector3(...endPos)}
            thickness={0.015}
            color="#000000"
          />
        );
      }),
    [layerCornerPositions],
  );

  return lines;
}

export default CubeEdge;
