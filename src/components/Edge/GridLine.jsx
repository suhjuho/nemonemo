import { useRef } from "react";
import * as THREE from "three";

function GridLine({ start, end, thickness, color }) {
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

export default GridLine;
