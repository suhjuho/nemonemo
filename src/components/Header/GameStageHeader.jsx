import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import Speaker from "../../assets/icon/icon-speaker.png";
import MutedSpeaker from "../../assets/icon/icon-mute.png";
import Setting from "../../assets/icon/icon-setting.png";
import Out from "../../assets/icon/icon-out.png";

import { useAnswerStore, useSoundStore } from "../../store/store";

import Timer from "../Timer/Timer";

const Icon = styled.img`
  width: 60px;
  margin: 0px 10px;
`;

const Header = styled.header`
  position: fixed;
  top: 20px;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 10;

  .content {
    font-size: 80px;
    font-weight: 700;
    color: Black;
    text-align: center;
  }

  .timer {
    font-size: 80px;
  }

  .header-left-icons {
    width: 20%;
  }

  .header-right-icons {
    width: 20%;
    position: relative;
    display: flex;
    justify-content: end;
  }

  .header-middle {
    width: 60%;
  }

  .game-status {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

function GameStageHeader({ type, difficulty, puzzleTitle }) {
  const navigate = useNavigate();
  const { isMuted, changeMuteState } = useSoundStore();
  const { isComplete } = useAnswerStore();

  const handleSound = () => {
    changeMuteState();
  };

  return (
    <Header>
      <div className="header-left-icons">
        {type === "select" && <Icon src={Out} onClick={() => navigate("/")} />}
        {type === "game" && (
          <Icon src={Out} onClick={() => navigate(`/puzzles/${difficulty}`)} />
        )}
      </div>
      <div className="header-middle">
        {type === "main" && <div className="content">NEMO NEMO</div>}
        {type === "select" && <div className="content">{difficulty}</div>}
        {type === "game" && (
          <div className="game-status">
            {isComplete && <div className="content">{puzzleTitle} </div>}
            <div className="timer">
              <Timer />
            </div>
          </div>
        )}
      </div>
      <div className="header-right-icons">
        {isMuted ? (
          <Icon src={MutedSpeaker} onClick={handleSound} />
        ) : (
          <Icon src={Speaker} onClick={handleSound} />
        )}
        <Icon src={Setting} />
      </div>
    </Header>
  );
}

export default GameStageHeader;
