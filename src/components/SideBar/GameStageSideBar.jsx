import { BiLayerMinus, BiLayerPlus, BiUndo, BiMouseAlt } from "react-icons/bi";
import { TbCubePlus, TbClick, TbCube, TbCubeOff } from "react-icons/tb";
import { TfiLayersAlt, TfiLayoutWidthFull } from "react-icons/tfi";
import { PiEyedropperSampleFill } from "react-icons/pi";
import { CgScrollV } from "react-icons/cg";

import styled from "styled-components";

import { useClickModeStore, useLayerStore } from "../../store/store";

const SideBar = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 100vh;
  z-index: 10;

  .icon {
    width: 3rem;
    height: 3rem;
    margin: 1rem;
  }
`;

const Icon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const MainIcon = styled.div`
  position: relative;
  margin-right: 5px;

  .event-icon {
    position: absolute;

    width: 1.5rem;
    height: 1.5rem;
  }

  .left-click-icon {
    top: 15%;
    left: 0%;
  }

  .right-click-icon {
    top: 15%;
    left: 70%;
  }

  .scroll-icon {
    top: 30%;
    left: 70%;

    width: 2rem;
    height: 2rem;
  }

  .color-dropper-icon {
    left: 70%;
  }
`;

const Command = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;

  font-size: 1.8rem;
`;

function GameStageSideBar() {
  const { clickMode } = useClickModeStore();
  const { layerMode } = useLayerStore();

  return (
    <SideBar>
      {clickMode === "color" && (
        <Icon>
          <MainIcon>
            <TbCube className="icon" />
            <PiEyedropperSampleFill className="event-icon color-dropper-icon" />
          </MainIcon>
          <Command>C</Command>
        </Icon>
      )}

      {/* 추후 블록 생성, 제거의 경우는 마우스 커서 호버 이벤트로 파악. 두 가지 경우 나누어서 렌더링 */}
      {clickMode === "block" && (
        <>
          <TbCubePlus className="icon " />
          <TbCubeOff className="icon" />
        </>
      )}

      <Icon>
        <MainIcon>
          <BiMouseAlt className="icon" />
          <TbClick
            className="event-icon left-click-icon"
            style={{ transform: "scaleX(-1)" }}
          />
        </MainIcon>
        <h3>Mark</h3>
      </Icon>
      <Icon>
        <MainIcon>
          <BiMouseAlt className="icon" />
          <TbClick className="event-icon right-click-icon" />
        </MainIcon>
        <h3>Remove</h3>
      </Icon>
      <Icon>
        <MainIcon>
          <BiMouseAlt className="icon" />
          <CgScrollV className="event-icon scroll-icon" />
        </MainIcon>
        <h3>Layer Change</h3>
      </Icon>

      <Icon>
        {layerMode === "all" && (
          <TfiLayersAlt
            className="icon"
            style={{ transform: "scaleY(-1)", strokeWidth: "0.3px" }}
          />
        )}
        {layerMode === "one" && (
          <TfiLayoutWidthFull className="icon" style={{ strokeWidth: "1px" }} />
        )}
        <h3>Space</h3>
      </Icon>

      <Icon>
        <BiLayerMinus className="icon" />
        <Command>Q</Command>
      </Icon>
      <Icon>
        <BiLayerPlus className="icon" />
        <Command>W</Command>
      </Icon>
      <Icon>
        <BiUndo className="icon" />
        <Command>Z</Command>
      </Icon>
      <Icon>
        <BiUndo className="icon" style={{ transform: "scaleX(-1)" }} />
        <Command>X</Command>
      </Icon>
    </SideBar>
  );
}

export default GameStageSideBar;
