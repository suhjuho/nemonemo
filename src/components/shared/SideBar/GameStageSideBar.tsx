import styled from "styled-components";
import LayerIn from "../../../assets/icon/layer-in.png";
import LayerOut from "../../../assets/icon/layer-out.png";
import RightClick from "../../../assets/icon/right-click.png";
import LeftClick from "../../../assets/icon/left-click.png";
import CubeColor from "../../../assets/icon/cube-color.png";
import CubeRemove from "../../../assets/icon/cube-remove.png";
import CubeAdd from "../../../assets/icon/cube-add.png";
import Undo from "../../../assets/icon/undo.png";
import Redo from "../../../assets/icon/redo.png";

import {
  useClickModeStore,
  useAnswerStore,
  useDeviceStore,
  useCubeStatesStore,
  useLayerStore,
} from "../../../store/store.tsx";
import StyledIcon from "../StyledIcon/StyledIcon.tsx";
import { CUBE_CONSTANT } from "../../../constants/cube.ts";

const SideBar = styled.section`
  position: fixed;
  left: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  z-index: 5;

  .history {
    display: flex;
    position: fixed;
    bottom: 10px;
  }
`;

function GameStageSideBar() {
  const { clickMode, setClickMode } = useClickModeStore();
  const { isComplete } = useAnswerStore();
  const { isMobile } = useDeviceStore();
  const { cubeStatesHistory, historyIndex, setHistoryIndex } =
    useCubeStatesStore();
  const { layerDirection, layers, currentLayer, setCurrentLayer } =
    useLayerStore();

  const handleClickMode = () => {
    if (clickMode === "color") {
      setClickMode("cube");
    } else {
      setClickMode("color");
    }
  };

  const handleHistory = (key: string): void => {
    if (key === "Z" && historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }

    if (key === "X" && historyIndex < cubeStatesHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleLayer = (key: string): void => {
    const layer =
      layerDirection === "FRONT" || layerDirection === "BACK"
        ? layers.z
        : layers.x;

    if (key === "Q") {
      if (CUBE_CONSTANT.INSIDE_DIRECTIONS[layerDirection]) {
        if (currentLayer > 1) {
          setCurrentLayer(currentLayer - 1);
        }
      } else if (CUBE_CONSTANT.OUTSIDE_DIRECTIONS[layerDirection]) {
        if (currentLayer < layer.length) {
          setCurrentLayer(currentLayer + 1);
        }
      }
    }

    if (key === "W") {
      if (CUBE_CONSTANT.INSIDE_DIRECTIONS[layerDirection]) {
        if (currentLayer < layer.length) {
          setCurrentLayer(currentLayer + 1);
        }
      } else if (CUBE_CONSTANT.OUTSIDE_DIRECTIONS[layerDirection]) {
        if (currentLayer > 1) {
          setCurrentLayer(currentLayer - 1);
        }
      }
    }
  };

  return (
    <SideBar style={{ visibility: `${isComplete ? "hidden" : "visible"}` }}>
      {clickMode === "color" && (
        <StyledIcon src={CubeColor} command="C" handleClick={handleClickMode} />
      )}

      {clickMode === "cube" && (
        <div style={{ display: "flex" }}>
          <StyledIcon
            src={CubeRemove}
            command="C"
            handleClick={handleClickMode}
          />
          <StyledIcon src={CubeAdd} command="C" handleClick={handleClickMode} />
        </div>
      )}

      {!isMobile && (
        <>
          <StyledIcon
            src={LeftClick}
            description={clickMode === "color" ? "표시" : "제거"}
          />
          <StyledIcon
            src={RightClick}
            description={clickMode === "color" ? "제거" : "복원"}
          />
        </>
      )}

      <StyledIcon
        src={LayerIn}
        command="Q"
        handleClick={() => {
          handleLayer("Q");
        }}
      />
      <StyledIcon
        src={LayerOut}
        command="W"
        handleClick={() => {
          handleLayer("W");
        }}
      />

      <div className="history">
        <StyledIcon
          src={Undo}
          command="Z"
          handleClick={() => handleHistory("Z")}
        />
        <StyledIcon
          src={Redo}
          command="X"
          handleClick={() => handleHistory("X")}
        />
      </div>
    </SideBar>
  );
}

export default GameStageSideBar;
