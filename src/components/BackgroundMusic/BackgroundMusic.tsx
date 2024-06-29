import { useEffect, useRef } from "react";

import { useSoundStore } from "../../store/store.tsx";
import bgm from "../../assets/music/backgroundMusic.mp3";

function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null!);
  const { sound } = useSoundStore();

  useEffect(() => {
    if (!sound.isMuted) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    audioRef.current.volume = sound.bgmSound;
  }, [sound.isMuted, sound.bgmSound]);

  return (
    <audio ref={audioRef} loop>
      <source src={bgm} type="audio/mp3"></source>
      <track kind="captions" />
    </audio>
  );
}

export default BackgroundMusic;
