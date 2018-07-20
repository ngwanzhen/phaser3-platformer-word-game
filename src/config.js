// import { gameScene } from './scenes';
// import { MainScene } from './scenes/main';
import {PreloadScene} from './scenes/preload';
import {StartScene} from './scenes/startV2';
import {ScrambleScene} from './scenes/scramble';

export const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#A8E6CF',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: [PreloadScene, StartScene, ScrambleScene]
};
