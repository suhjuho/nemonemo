import React, { useEffect, useRef } from "react";
import bgm from "../../assets/music/backgroundMusic.mp3";

import { useSoundStore } from "../../store/store";

function BackgroundMusic() {
  const audioRef = useRef();
  const { isMuted } = useSoundStore();

  useEffect(() => {
    if (!isMuted) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isMuted]);

  return (
    <audio ref={audioRef} loop>
      <source src={bgm} type="audio/mp3"></source>
      <track kind="captions" />
    </audio>
  );
}

export default BackgroundMusic;
