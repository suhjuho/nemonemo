import { useMemo } from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";

function verifyCornerDots(cornerDots) {
  const xPositions = [
    ...new Set(cornerDots.map((cornerDot) => cornerDot[0])),
  ].sort();
  const yPositions = [
    ...new Set(cornerDots.map((cornerDot) => cornerDot[1])),
  ].sort();
  const zPositions = [
    ...new Set(cornerDots.map((cornerDot) => cornerDot[2])),
  ].sort();

  if (xPositions.length + yPositions.length + zPositions.length !== 5) {
    return { xPositions, yPositions, zPositions, result: "ng" };
  }

  return { xPositions, yPositions, zPositions, result: "ok" };
}

function RectangleGrid({ cornerDots, color, thickness }) {
  const gridDots = [];

  const { xPositions, yPositions, zPositions, result } =
    verifyCornerDots(cornerDots);

  if (result === "ng") {
    return null;
  }

  // y축 고정
  if (yPositions.length === 1) {
    for (let x = xPositions[0]; x <= xPositions[1]; x += 2) {
      const start = [x, yPositions[0], zPositions[0]];
      const end = [x, yPositions[0], zPositions[1]];

      gridDots.push({ start, end });
    }

    for (let z = zPositions[0]; z <= zPositions[1]; z += 2) {
      const start = [xPositions[0], yPositions[0], z];
      const end = [xPositions[1], yPositions[0], z];

      gridDots.push({ start, end });
    }
  }

  // x축 고정
  if (xPositions.length === 1) {
    for (let y = yPositions[0]; y <= yPositions[1]; y += 2) {
      const start = [xPositions[0], y, zPositions[0]];
      const end = [xPositions[0], y, zPositions[1]];

      gridDots.push({ start, end });
    }

    for (let z = zPositions[0]; z <= zPositions[1]; z += 2) {
      const start = [xPositions[0], yPositions[0], z];
      const end = [xPositions[0], yPositions[1], z];

      gridDots.push({ start, end });
    }
  }

  // z 축 고정
  if (zPositions.length === 1) {
    for (let x = xPositions[0]; x <= xPositions[1]; x += 2) {
      const start = [x, yPositions[0], zPositions[0]];
      const end = [x, yPositions[1], zPositions[0]];

      gridDots.push({ start, end });
    }

    for (let y = yPositions[0]; y <= yPositions[1]; y += 2) {
      const start = [xPositions[0], y, zPositions[0]];
      const end = [xPositions[1], y, zPositions[0]];

      gridDots.push({ start, end });
    }
  }

  const lines = useMemo(
    () =>
      gridDots.map((gridDot) => (
        <Line
          key={`${gridDot.start.join("")}${gridDot.end.join("")}`}
          points={[
            new THREE.Vector3(...gridDot.start),
            new THREE.Vector3(...gridDot.end),
          ]}
          color={color}
          lineWidth={thickness}
        />
      )),
    [cornerDots],
  );

  return lines;
}

export default RectangleGrid;
