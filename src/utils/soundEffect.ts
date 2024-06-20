import * as THREE from "three";

import cubeSound from "../assets/music/cubeSound.wav";
import colorSound from "../assets/music/click.mp3";
import endingSound from "../assets/music/endingSound.wav";

const soundCube = (effectSound: number) => {
  const listener = new THREE.AudioListener();
  const audioLoader = new THREE.AudioLoader();

  audioLoader.load(cubeSound, (buffer) => {
    const sound = new THREE.Audio(listener);
    sound.setBuffer(buffer);
    sound.setVolume(effectSound);
    sound.play();
  });
};

const soundEnding = (effectSound: number) => {
  const listener = new THREE.AudioListener();
  const audioLoader = new THREE.AudioLoader();

  audioLoader.load(endingSound, (buffer) => {
    const sound = new THREE.Audio(listener);
    sound.setBuffer(buffer);
    sound.setVolume(effectSound);
    sound.play();
  });
};

const soundClick = (effectSound: number) => {
  const listener = new THREE.AudioListener();
  const audioLoader = new THREE.AudioLoader();

  audioLoader.load(colorSound, (buffer) => {
    const sound = new THREE.Audio(listener);
    sound.setBuffer(buffer);
    sound.setVolume(effectSound);
    sound.play();
  });
};

export { soundCube, soundEnding, soundClick };
