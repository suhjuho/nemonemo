import { useNavigate } from "react-router-dom";

import BACKGROUND_CONSTANT from "../../constants/background";

function MainBackGround() {
  const navigate = useNavigate();

  return (
    <>
      {/* y-wall bottom ceil */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -100, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial {...BACKGROUND_CONSTANT.MATERIAL_ARGS} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 100, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial {...BACKGROUND_CONSTANT.MATERIAL_ARGS} />
      </mesh>

      {/* x-wall */}
      <mesh rotation={[0, -Math.PI / 2, -Math.PI / 2]} position={[100, 0, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial {...BACKGROUND_CONSTANT.MATERIAL_ARGS} />
      </mesh>

      <mesh rotation={[0, Math.PI / 2, -Math.PI / 2]} position={[-100, 0, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial {...BACKGROUND_CONSTANT.MATERIAL_ARGS} />
      </mesh>

      {/* z-wall */}
      <mesh rotation={[0, 0, -Math.PI / 2]} position={[0, 0, -100]}>
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial {...BACKGROUND_CONSTANT.MATERIAL_ARGS} />
      </mesh>

      <mesh rotation={[0, Math.PI, -Math.PI / 2]} position={[0, 0, 100]}>
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial {...BACKGROUND_CONSTANT.MATERIAL_ARGS} />
      </mesh>
    </>
  );
}

export default MainBackGround;
