import { useRef, useMemo } from "react";
import * as THREE from "three";

const getLayersGridPositions = (layerPosition, size) => {
  const centerPosition = [0, 0, 0];
  let [fixedIndex, indexOne, indexTwo] = [0, 0, 0];
  const layersGridPositions = [];

  switch (layerPosition) {
    case "UP":
      [fixedIndex, indexOne, indexTwo] = [1, 0, 2];
      centerPosition[fixedIndex] = size[fixedIndex];
      break;
    case "DOWN":
      [fixedIndex, indexOne, indexTwo] = [1, 0, 2];
      centerPosition[fixedIndex] = size[fixedIndex];
      centerPosition[fixedIndex] *= -1;
      break;
    case "LEFT":
      [fixedIndex, indexOne, indexTwo] = [0, 1, 2];
      centerPosition[fixedIndex] = size[fixedIndex];
      centerPosition[fixedIndex] *= -1;
      break;
    case "RIGHT":
      [fixedIndex, indexOne, indexTwo] = [0, 1, 2];
      centerPosition[fixedIndex] = size[fixedIndex];
      break;
    case "BACK":
      [fixedIndex, indexOne, indexTwo] = [2, 0, 1];
      centerPosition[fixedIndex] = size[fixedIndex];
      centerPosition[fixedIndex] *= -1;
      break;
    case "FORTH":
      [fixedIndex, indexOne, indexTwo] = [2, 0, 1];
      centerPosition[fixedIndex] = size[fixedIndex];
      break;
    default:
      break;
  }

  const layerCornerPosition = [
    centerPosition.slice(),
    centerPosition.slice(),
    centerPosition.slice(),
    centerPosition.slice(),
  ];

  layerCornerPosition[0][indexOne] = -1 * size[indexOne];
  layerCornerPosition[0][indexTwo] = -1 * size[indexTwo];

  layerCornerPosition[1][indexOne] = -1 * size[indexOne];
  layerCornerPosition[1][indexTwo] = size[indexTwo];

  layerCornerPosition[2][indexOne] = size[indexOne];
  layerCornerPosition[2][indexTwo] = -1 * size[indexTwo];

  layerCornerPosition[3][indexOne] = size[indexOne];
  layerCornerPosition[3][indexTwo] = size[indexTwo];

  const test1 = layerCornerPosition[0].slice();
  const test2 = layerCornerPosition[1].slice();

  for (
    let i = layerCornerPosition[0][indexOne];
    i <= -1 * layerCornerPosition[0][indexOne];
    i += 2
  ) {
    test1[indexOne] = i;
    test2[indexOne] = i;
    layersGridPositions.push([test1.slice(), test2.slice()]);
  }

  const test3 = layerCornerPosition[0].slice();
  const test4 = layerCornerPosition[2].slice();

  for (
    let i = layerCornerPosition[0][indexTwo];
    i <= -1 * layerCornerPosition[0][indexTwo];
    i += 2
  ) {
    test3[indexTwo] = i;
    test4[indexTwo] = i;
    layersGridPositions.push([test3.slice(), test4.slice()]);
  }

  return layersGridPositions;
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

function LayerEdge({ layerPosition, puzzle }) {
  const layersGridPositions = useMemo(
    () => getLayersGridPositions(layerPosition, puzzle.size),
    [layerPosition, puzzle],
  );

  const lines = useMemo(
    () =>
      layersGridPositions.map((positions, index) => (
        <ThickLine
          key={layerPosition + positions}
          start={new THREE.Vector3(...positions[0])}
          end={new THREE.Vector3(...positions[1])}
          thickness={0.01}
          color="#ffffff"
        />
      )),
    [layersGridPositions],
  );

  return lines;
}

export default LayerEdge;
