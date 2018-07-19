import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'preload'
    });
  }

  preload() {
    this.load.image('bomb', 'assets/bomb2.png');
    this.load.image('levelUp', 'assets/Level_Up_Logo.png');
    this.load.image('gameOver', 'assets/textGameOver.png');
    this.load.image('gameWon', 'assets/flat_medal4.png');

    this.load.image('A', 'assets/fonts/letter_A.png');
    this.load.image('B', 'assets/fonts/letter_B.png');
    this.load.image('C', 'assets/fonts/letter_C.png');
    this.load.image('D', 'assets/fonts/letter_D.png');
    this.load.image('E', 'assets/fonts/letter_E.png');
    this.load.image('F', 'assets/fonts/letter_F.png');
    this.load.image('G', 'assets/fonts/letter_G.png');
    this.load.image('H', 'assets/fonts/letter_H.png');
    this.load.image('I', 'assets/fonts/letter_I.png');
    this.load.image('J', 'assets/fonts/letter_J.png');
    this.load.image('K', 'assets/fonts/letter_K.png');
    this.load.image('L', 'assets/fonts/letter_L.png');
    this.load.image('M', 'assets/fonts/letter_M.png');
    this.load.image('N', 'assets/fonts/letter_N.png');
    this.load.image('O', 'assets/fonts/letter_O.png');
    this.load.image('P', 'assets/fonts/letter_P.png');
    this.load.image('Q', 'assets/fonts/letter_Q.png');
    this.load.image('R', 'assets/fonts/letter_R.png');
    this.load.image('S', 'assets/fonts/letter_S.png');
    this.load.image('T', 'assets/fonts/letter_T.png');
    this.load.image('U', 'assets/fonts/letter_U.png');
    this.load.image('V', 'assets/fonts/letter_V.png');
    this.load.image('W', 'assets/fonts/letter_W.png');
    this.load.image('X', 'assets/fonts/letter_X.png');
    this.load.image('Y', 'assets/fonts/letter_Y.png');
    this.load.image('Z', 'assets/fonts/letter_Z.png');

    this.load.spritesheet('player', 'assets/dogSprite.png', {
      frameWidth: 105,
      frameHeight: 158
    });
    this.load.spritesheet('playerDead', 'assets/dogDeadSprite.png', {
      frameWidth: 190,
      frameHeight: 167
    });

    this.load.tilemapTiledJSON('candyMap', 'assets/candyBrown.json');
    this.load.image('tiles', 'assets/candySprite.png');
    // this.load.audio('puzzle', 'assets/sounds/puzzle.mp3');

    this.load.image('chalkboard', 'assets/black-chalkboard.png');
  }

  create() {
    this.scene.start('start');
  }
}
