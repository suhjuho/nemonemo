import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";
import { useLanguageStore, useSoundStore } from "../../store/store.tsx";
import breakpoints from "../../styles/media.tsx";

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-size: 36px;
  z-index: 50;

  @media screen and (max-height: ${breakpoints.md}) {
    font-size: 18px;
  }

  @media screen and (max-width: ${breakpoints.md}) {
    font-size: 18px;
  }

  .settings {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 50vw;
    height: 50vh;
    padding: 20px;
    background-color: rgba(255, 255, 255);
    border-radius: 20px;
  }

  .setting {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 50vw;
    gap: 10px;
  }

  .setting-title {
    width: 30vw;
    height: 5vh;
    background-color: #c7dde1;
    border-radius: 20px;
    text-align: center;
    line-height: 5vh;
    margin: 10px 0px;
  }

  .setting-language {
    width: 30vw;
    height: 5vh;
    background-color: #c7dde1;
    border-radius: 20px;
    text-align: center;
    line-height: 5vh;
    margin: 10px 0px;
  }

  .select-language {
    width: 20vw;
    height: 5vh;
    background-color: #071534;
    color: white;
    border-radius: 20px;
    text-align: center;
    line-height: 5vh;
    margin: 10px 0px;
  }

  .setting-ratio {
    width: 20vw;
    height: 5vh;
    background-color: #c7dde1;
    border-radius: 20px;
    text-align: center;
    line-height: 5vh;
    margin: 10px 0px;
  }
`;

interface Props {
  handleIsSetting: Dispatch<SetStateAction<boolean>>;
}

function GameSettingModal({ handleIsSetting }: Props) {
  const { sound, changeSoundState } = useSoundStore();
  const { language, changeLanguage } = useLanguageStore();

  const handleLanguage = () => {
    if (language === "English") {
      changeLanguage("한국어");
    } else {
      changeLanguage("English");
    }
  };

  return (
    <Modal>
      <div className="settings">
        <div className="setting">
          <div className="setting-title">BGM</div>
          <input
            className="setting-ratio"
            type="range"
            id="bgm-volume"
            name="volume"
            min={0}
            max={1}
            step={0.1}
            value={sound.bgmSound}
            onChange={(event) => {
              sound.bgmSound = Number(event.target.value);
              changeSoundState(sound);
            }}
          />
        </div>
        <div className="setting">
          <div className="setting-title">Sound</div>
          <input
            className="setting-ratio"
            type="range"
            id="volume"
            name="volume"
            min={0}
            max={1}
            step={0.1}
            value={sound.effectSound}
            onChange={(event) => {
              sound.effectSound = Number(event.target.value);
              changeSoundState(sound);
            }}
          />
        </div>
        <div className="setting">
          <div className="setting-language">Language</div>
          <div className="select-language" onClick={handleLanguage}>
            {language}
          </div>
        </div>

        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            borderRadius: "2px",
            color: "#ffffff",
            backgroundColor: "#000000",
          }}
          onClick={() => handleIsSetting(false)}
        >
          X
        </button>
      </div>
    </Modal>
  );
}

export default GameSettingModal;
