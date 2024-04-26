import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Speaker from "../../../assets/icon/icon-speaker.png";
import MutedSpeaker from "../../../assets/icon/icon-mute.png";
import Setting from "../../../assets/icon/icon-setting.png";
import Out from "../../../assets/icon/icon-out.png";

import {
  useAnswerStore,
  useLanguageStore,
  useSoundStore,
} from "../../../store/store";

import breakpoints from "../../../styles/media";
import Timer from "../Timer/Timer";
import GameSetting from "../../GameSettingModal/GameSettingModal";

const Icon = styled.img`
  width: 60px;
  margin: 0px 10px;
  border-radius: 10px;
  box-shadow: 2px 4px 8px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    color: #007302;
  }

  @media screen and (max-width: ${breakpoints.md}) {
    width: 30px;
    border-radius: 5px;
    margin: 0px 5px;
  }

  @media screen and (max-height: ${breakpoints.md}) {
    width: 30px;
    border-radius: 5px;
  }
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

  @media screen and (max-height: ${breakpoints.md}) {
    top: 5px;
  }

  .timer {
    font-size: 48px;
    font-weight: 900;
    padding: 0px 20px;
    background-color: rgba(255, 255, 255, 0.1);
    border: 3px solid white;
    border-radius: 20px;
    box-shadow: 2px 4px 8px;
  }

  .puzzleSize {
    font-size: 48px;
    font-weight: 900;
    padding: 0px 20px;
    background-color: rgba(255, 255, 255, 0.1);
    border: 3px solid white;
    border-radius: 20px;
    box-shadow: 2px 4px 8px;
  }

  .header-left-icons {
    width: 20%;
  }

  .header-right-icons {
    width: 20%;
    position: relative;
    display: flex;
    justify-content: end;
    visibility: hidden;
  }

  .header-middle {
    width: 50%;
  }

  .game-status {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .content {
    font-size: 48px;
    font-weight: 900;
    padding: 0px 10px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.1);
    border: 3px solid white;
    border-radius: 20px;
    box-shadow: 2px 4px 8px;

    @media screen and (max-width: ${breakpoints.md}) {
      font-size: 24px;
      border-radius: 15px;
    }

    @media screen and (max-height: ${breakpoints.md}) {
      font-size: 24px;
      border-radius: 15px;
    }
  }
`;

const languages = {
  tutorial: "튜토리얼",
  easy: "쉬움",
  normal: "보통",
  hard: "어려움",
  custom: "커스텀",
};

function GameStageHeader({ type, difficulty, puzzleTitle, puzzleSize }) {
  const navigate = useNavigate();
  const { sound, changeSoundState } = useSoundStore();
  const { isComplete } = useAnswerStore();
  const [isSetting, setIsSetting] = useState(false);
  const { language } = useLanguageStore();

  const handleSound = () => {
    sound.isMuted = !sound.isMuted;
    changeSoundState(sound);
  };

  return (
    <>
      <Header>
        <div
          className="header-left-icons"
          style={{ visibility: `${isComplete ? "hidden" : "visible"}` }}
        >
          {type === "setting" && (
            <Icon src={Out} onClick={() => window.history.go(-1)} />
          )}
          {type === "select" && (
            <Icon src={Out} onClick={() => navigate("/")} />
          )}
          {type === "game" && (
            <Icon
              src={Out}
              onClick={() => navigate(`/puzzles/${difficulty}`)}
            />
          )}
        </div>
        <div className="header-middle">
          {(type === "main" || type === "setting") && (
            <div className="content">
              {language === "English" ? "NEMO NEMO" : "네모 네모"}
            </div>
          )}
          {type === "select" && (
            <div className="content">
              {language === "English" ? difficulty : languages[difficulty]}
            </div>
          )}
          {type === "game" && (
            <div
              className="game-status"
              style={{ visibility: `${isComplete ? "visible" : "hidden"}` }}
            >
              <div className="puzzleSize">{puzzleSize.join("x")}</div>
              <div className="content">{puzzleTitle}</div>
              <div className="timer">
                <Timer />
              </div>
            </div>
          )}
        </div>
        <div
          className="header-right-icons"
          style={{ visibility: `${isComplete ? "hidden" : "visible"}` }}
        >
          {sound.isMuted ? (
            <Icon src={MutedSpeaker} onClick={handleSound} />
          ) : (
            <Icon src={Speaker} onClick={handleSound} />
          )}
          <Icon src={Setting} onClick={() => setIsSetting((prev) => !prev)} />
        </div>
      </Header>
      {isSetting && <GameSetting handleIsSetting={setIsSetting} />}
    </>
  );
}

export default GameStageHeader;
