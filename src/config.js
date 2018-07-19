// import { gameScene } from './scenes';
// import { MainScene } from './scenes/main';
import {PreloadScene} from './scenes/preload';
import {StartScene} from './scenes/startV2';
import {ScrambleScene} from './scenes/scramble';

export const config = {
  type: Phaser.AUTO, // Let phaser determine how to render the game
  width: window.innerWidth,
  height: window.innerHeight,
  // backgroundColor: '#CDDDFF',
  backgroundColor: '#A8E6CF',
  // pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: {
      //   y: 300
      // },
      debug: false
    }
  },
  scene: [PreloadScene, StartScene, ScrambleScene]
};
