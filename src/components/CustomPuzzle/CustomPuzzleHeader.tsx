import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import GameSetting from "../GameSettingModal/GameSettingModal.tsx";

import Speaker from "../../assets/icon/icon-speaker.png";
import MutedSpeaker from "../../assets/icon/icon-mute.png";
import Setting from "../../assets/icon/icon-setting.png";
import Out from "../../assets/icon/icon-out.png";

import { useSoundStore } from "../../store/store.tsx";
import usePuzzleMakingStore from "../../store/making.tsx";

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
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    min-width: 100px;
  }

  .number-input {
    position: relative;
    box-sizing: border-box;
  }

  .size-input {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    top: 0;
    left: 0;
    height: 75px;
    font-size: 36px;
    font-weight: 900;
    border: 3px solid white;
    border-radius: 20px;
    box-shadow: 2px 4px 8px;
    width: 100px;
    text-align: center;
    box-sizing: border-box;
  }

  .size-input-button-up {
    position: absolute;
    top: 15%;
    right: 0;
    font-size: 14px;
    font-weight: 900;
    border: 1px solid white;
    background-color: #ffffff;
    border-radius: 20px;
    text-align: center;
  }

  .size-input-button-down {
    position: absolute;
    bottom: 15%;
    right: 0;
    font-size: 14px;
    font-weight: 900;
    border: 1px solid white;
    background-color: #ffffff;
    border-radius: 20px;
    text-align: center;
  }

  .size-input-button-up:hover,
  .size-input-button-down:hover {
    background-color: #d5d5d5;
  }

  .size-input-button-up:active,
  .size-input-button-down:active {
    color: #114012;
    background-color: #8e8e8e;
  }
`;

const SizeInput = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: space-between;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
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

  const handleSizeUp = (direction) => {
    if (puzzleMaking.size[direction] < 10) {
      puzzleMaking.size[direction] += 1;
    }

    setPuzzleMaking(puzzleMaking);
  };

  const handleSizeDown = (direction) => {
    if (puzzleMaking.size[direction] > 1) {
      puzzleMaking.size[direction] -= 1;
    }
    setPuzzleMaking(puzzleMaking);
  };

  return (
    <>
      <Header>
        <div className="header-left-icons">
          <Icon src={Out} onClick={() => navigate("/")} />
        </div>
        <div className="header-middle">
          <SizeInput>
            <div className="content">가로</div>
            <div className="number-input">
              <input
                readOnly
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
              <button
                className="size-input-button-up"
                onClick={() => handleSizeUp(0)}
              >
                ▲
              </button>
              <button
                className="size-input-button-down"
                onClick={() => handleSizeDown(0)}
              >
                ▼
              </button>
            </div>
          </SizeInput>
          <SizeInput>
            <div className="content">높이</div>
            <div className="number-input">
              <input
                readOnly
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
              <button
                className="size-input-button-up"
                onClick={() => handleSizeUp(1)}
              >
                ▲
              </button>
              <button
                className="size-input-button-down"
                onClick={() => handleSizeDown(1)}
              >
                ▼
              </button>
            </div>
          </SizeInput>
          <SizeInput>
            <div className="content">세로</div>
            <div className="number-input">
              <input
                readOnly
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
              <button
                className="size-input-button-up"
                onClick={() => handleSizeUp(2)}
              >
                ▲
              </button>
              <button
                className="size-input-button-down"
                onClick={() => handleSizeDown(2)}
              >
                ▼
              </button>
            </div>
          </SizeInput>
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
