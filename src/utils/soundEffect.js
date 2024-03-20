import * as THREE from "three";

import cubeSound from "../assets/music/cubeSound.wav";
import colorSound from "../assets/music/colorSound.wav";

const listener = new THREE.AudioListener();
const audioLoader = new THREE.AudioLoader();

const clickCubeSound = () => {
  audioLoader.load(cubeSound, (buffer) => {
    const sound = new THREE.Audio(listener);
    sound.setBuffer(buffer);
    sound.setVolume(0.3);
    sound.play();
  });
};

const clickColorSound = () => {
  audioLoader.load(colorSound, (buffer) => {
    const sound = new THREE.Audio(listener);
    sound.setBuffer(buffer);
    sound.setVolume(0.3);
    sound.play();
  });
};

export { clickCubeSound, clickColorSound };
