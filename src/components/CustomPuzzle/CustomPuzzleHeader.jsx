import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Speaker from "../../assets/icon/icon-speaker.png";
import MutedSpeaker from "../../assets/icon/icon-mute.png";
import Setting from "../../assets/icon/icon-setting.png";
import Out from "../../assets/icon/icon-out.png";

import { useSoundStore } from "../../store/store";

import GameSetting from "../GameSetting/GameSetting";
import usePuzzleMakingStore from "../../store/making";

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
  }

  .header-middle {
    display: flex;
    justify-content: center;
    width: 60%;
    gap: 5px;
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
  }

  .size-input {
    font-size: 36px;
    border: 3px solid white;
    border-radius: 20px;
    box-shadow: 2px 4px 8px;
    width: 100px;
  }
`;

function CustomPuzzleHeader() {
  const navigate = useNavigate();
  const { sound, changeSoundState } = useSoundStore();
  const { puzzleMaking, setPuzzleMaking } = usePuzzleMakingStore();
  const [isSetting, setIsSetting] = useState(false);

  const handleSound = () => {
    sound.isMuted = !sound.isMuted;
    changeSoundState(sound);
  };

  useEffect(() => {
    puzzleMaking.size = [1, 1, 1];
    setPuzzleMaking(puzzleMaking);
  }, []);

  return (
    <>
      <Header>
        <div className="header-left-icons">
          <Icon src={Out} onClick={() => navigate("/")} />
        </div>
        <div className="header-middle">
          <div className="content">가로</div>
          <input
            className="size-input"
            type="number"
            min="1"
            max="10"
            value={puzzleMaking.size[0]}
            onChange={(event) => {
              puzzleMaking.size[0] = Number(event.target.value);

              setPuzzleMaking(puzzleMaking);
            }}
          />
          <div className="content">높이</div>
          <input
            className="size-input"
            type="number"
            min="1"
            max="10"
            value={puzzleMaking.size[1]}
            onChange={(event) => {
              puzzleMaking.size[1] = Number(event.target.value);

              setPuzzleMaking(puzzleMaking);
            }}
          />
          <div className="content">세로</div>
          <input
            className="size-input"
            type="number"
            min="1"
            max="10"
            value={puzzleMaking.size[2]}
            onChange={(event) => {
              puzzleMaking.size[2] = Number(event.target.value);

              setPuzzleMaking(puzzleMaking);
            }}
          />
        </div>
        <div className="header-right-icons">
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

export default CustomPuzzleHeader;
