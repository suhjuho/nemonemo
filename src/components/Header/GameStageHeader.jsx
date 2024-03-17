import styled from "styled-components";
import { FcSettings, FcSpeaker } from "react-icons/fc";
import { IoIosBackspace } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";

import { useSoundStore } from "../../store/store";

import Timer from "../Timer/Timer";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 10;

  .title {
    font-size: 3rem;
    width: 40%;
    color: orange;
    text-align: center;
  }

  .timer {
    font-size: 3rem;
  }

  .header-left-icons {
    width: 200px;
  }

  .header-right-icons {
    width: 200px;
    position: relative;
    display: flex;
    justify-content: end;
  }

  .settingButton {
    width: 3rem;
    height: 3rem;
    background-color: #ffffff;
    border-radius: 10px;
    margin: 1rem;
  }

  .soundButton {
    width: 3rem;
    height: 3rem;
    background-color: #ffffff;
    border-radius: 10px;
    margin: 1rem;
  }

  .crossSign {
    position: absolute;
    top: 0;
    left: 0;
    width: 3rem;
    height: 3rem;
    color: #d84444;
    border-radius: 10px;
    margin: 1rem;
  }

  .backButton {
    width: 3rem;
    height: 3rem;
    background-color: #ffffff;
    border-radius: 10px;
    margin: 1rem;
  }
`;

function GameStageHeader({ title }) {
  const [isHintOpen, setIsHintOpen] = useState(false);
  const { isMuted, changeMuteState } = useSoundStore();

  const handleClick = () => {
    setIsHintOpen((prev) => !prev);
  };

  const handleSound = () => {
    changeMuteState();
  };

  return (
    <Header>
      <div className="header-left-icons">
        <IoIosBackspace
          className="backButton"
          onClick={() => window.history.go(-1)}
        />
      </div>
      {title === "main" ? (
        <div className="title">NEMO NEMO</div>
      ) : (
        <>
          <div className="title" onClick={handleClick}>
            {isHintOpen ? title : "Hint"}
          </div>
          <div className="timer">
            <Timer />
          </div>
        </>
      )}
      <div className="header-right-icons">
        <FcSpeaker onClick={handleSound} className="soundButton" />
        {!isMuted && <RxCross1 onClick={handleSound} className="crossSign" />}
        <FcSettings className="settingButton" />
      </div>
    </Header>
  );
}

export default GameStageHeader;
