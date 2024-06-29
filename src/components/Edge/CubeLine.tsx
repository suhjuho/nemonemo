import { useRef } from "react";
import * as THREE from "three";

interface CubeLineProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  cubeLineGeometry: THREE.CylinderGeometry;
  cubeLineMaterial: THREE.MeshBasicMaterial;
}

function CubeLine({
  start,
  end,
  cubeLineGeometry,
  cubeLineMaterial,
}: CubeLineProps) {
  const line = useRef();

  const direction = new THREE.Vector3().subVectors(end, start).normalize();
  const cylinder = new THREE.Mesh(cubeLineGeometry, cubeLineMaterial);

  const center = new THREE.Vector3(
    (start.x + end.x) / 2,
    (start.y + end.y) / 2,
    (start.z + end.z) / 2,
  );
  cylinder.position.copy(center);
  cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

  return <primitive object={cylinder} ref={line} />;
}

export default CubeLine;
