import styled from "styled-components";
import LayerIn from "../../assets/icon/layer-in.png";
import LayerOut from "../../assets/icon/layer-out.png";
import RightClick from "../../assets/icon/right-click.png";
import LeftClick from "../../assets/icon/left-click.png";
import CubeColor from "../../assets/icon/cube-color.png";
import CubeRemove from "../../assets/icon/cube-remove.png";
import CubeAdd from "../../assets/icon/cube-add.png";
import Undo from "../../assets/icon/undo.png";
import Redo from "../../assets/icon/redo.png";

import { useClickModeStore, useAnswerStore } from "../../store/store";
import StyledIcon from "../StyledIcon/StyledIcon";

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
  const { clickMode } = useClickModeStore();
  const { isComplete } = useAnswerStore();

  return (
    <SideBar style={{ visibility: `${isComplete ? "hidden" : "visible"}` }}>
      {clickMode === "color" && <StyledIcon src={CubeColor} command="C" />}

      {clickMode === "cube" && (
        <div style={{ display: "flex" }}>
          <StyledIcon src={CubeRemove} command="C" />
          <StyledIcon src={CubeAdd} command="C" />
        </div>
      )}

      <StyledIcon
        src={LeftClick}
        description={clickMode === "color" ? "표시" : "제거"}
      />
      <StyledIcon
        src={RightClick}
        description={clickMode === "color" ? "제거" : "복원"}
      />

      <StyledIcon src={LayerIn} command="Q" />
      <StyledIcon src={LayerOut} command="W" />

      <div className="history">
        <StyledIcon src={Undo} command="Z" />
        <StyledIcon src={Redo} command="X" />
      </div>
    </SideBar>
  );
}

export default GameStageSideBar;
