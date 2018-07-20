import Phaser from 'phaser';
import Alpha from '../objects/alpha';

Number.prototype.between = function (min, max) {
  return this > min && this < max;
};

export class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'start'
    });
    this.word = 'APPLE';
    this.alphaArr = this.word.split('')
    this.playerCollect = []
    this.score = 0;
    this.scoreText;
    this.bombs;
    this.bombMade = 0;
    this.bombLevel = 3;
    this.gameOver;
    this.instructions;
  }

  preload() {}

  create() {
    this.map = this.make.tilemap({
      key: 'candyMap'
    });
    var tiles = this.map.addTilesetImage('candySprite', 'tiles');
    // this.groundLayer = this.map.createStaticLayer(0, tiles, 0, 0);
    this.groundLayer = this.map.createDynamicLayer(0, tiles, 0, 0);
    this.candyLayer = this.map.createStaticLayer(1, tiles, 0, 0);

    // this.map.setCollision([69, 68, 66, 20, 21, 22, 23, 24, 25, 27, 28, 29, 33, 39, 40]);

    // making player that bounces and doesn't go out of map
    this.player = this.physics.add.sprite(50, 0, 'player');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.groundLayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.groundLayer, this.player);
    // this.player.body.gravity.y = 600;

    // give player animation when walking
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', {
        start: 1,
        end: 6
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'died',
      frames: this.anims.generateFrameNumbers('playerDead', {
        start: 0,
        end: 8
      }),
      frameRate: 8
      // repeat: -1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', {
        start: 1,
        end: 6
      }),
      frameRate: 10,
      repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.makeAlpha(this.word)

    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: 'white'
    });
    this.instructions = this.add.text(this.sys.game.config.width / 2 - 250, this.sys.game.config.height / 2, 'Use cursor keys to move Hero.', {
      fontSize: '32px',
      fill: 'black'
    });
    this.instructionsNext = this.add.text(this.sys.game.config.width / 2 - 400, this.sys.game.config.height / 2 + 40, 'Collect the alphabets and avoid the bomb!', {
      fontSize: '32px',
      fill: 'black'
    });
    this.instructionsBk = this.add.graphics()
    this.instructionsBk.fillStyle(255, 233, 233, 1);
    this.instructionsBk.fillRect(this.sys.game.config.width / 2 - 400, this.sys.game.config.height / 2 - 40, 800, 250)
    this.scoreText.setText('Score: ' + this.score);
    this.collectedText = this.add.text(16, 80, 'Letters:', {
      fontSize: '32px',
      fill: 'white'
    });

    this.bombs = this.physics.add.group();
    this.physics.add.collider(this.bombs, this.groundLayer);
    this.physics.add.collider(this.player, this.bombs, this.gameLost, null, this);
  }
  startGame() {
    this.player.body.gravity.y = 600;
    this.instructions.destroy()
    this.instructionsNext.destroy()
    this.instructionsBk.destroy()
  }
  update() {
    // this.input.on('pointerdown', () => {
    //   this.gameOver = true
    //   this.sys.game.playerCollect = this.playerCollect.filter(Boolean)
    //   this.sys.game.score = this.score
    //   this.scene.start('scramble');
    // });
    // this.input.on('pointerdown', () => {
    //   this.startGame()
    // });

    if (!this.gameOver) {
      if (this.cursors.left.isDown) {
        // if the left arrow key is down
        this.startGame()
        this.player.body.setVelocityX(-250); // move left
        this.player.anims.play('left', true);
        this.player.flipX = true; // flip
      } else if (this.cursors.right.isDown) {
        // if the right arrow key is down
        this.startGame()
        this.player.body.setVelocityX(250); // move right
        this.player.flipX = false; // flip
        this.player.anims.play('right', true);
      } else {
        this.player.body.velocity.x = 0;
        this.player.anims.stop();
      }
      if (
        (this.cursors.space.isDown || this.cursors.up.isDown) &&
        this.player.body.onFloor()
      ) {
        this.player.body.setVelocityY(-630); // jump up
      }
      if (this.bomb) {
        if (this.bomb.body.velocity.x < 0) {
          this.bomb.rotation -= 0.02;
        } else {
          this.bomb.rotation += 0.02;
        }
      }
    }
  }

  chkSequence() {
    let playerCollectLength = this.playerCollect.filter(Boolean).length
    // check alpha collected in sequence
    // let chkArr = this.alphaArr.slice(0, playerCollectLength)
    // if (JSON.stringify(this.playerCollect.filter(Boolean)) == JSON.stringify(chkArr.filter(Boolean))) {
    //   this.collectedText.setText('Letters: ' + this.playerCollect.filter(Boolean).join('-'))
    // } else {
    //   this.gameLost()
    // }

    // doesn't matter sequence
    this.collectedText.setText('Letters: ' + this.playerCollect.filter(Boolean).join('-'))

    //check win
    if (playerCollectLength == this.alphaArr.length) {
      this.gameWon()
    }

    // make bomb
    if (!this.gameOver) {
      if (this.bombMade < this.bombLevel) {
        this.makeBomb()
      }
    }
  }

  gameLost() {
    this.gameOver = true;
    this.player.body.velocity.x = 0;
    this.player.anims.play('died', true);
    this.physics.pause();
    this.bombs.children.iterate(function (child) {
      child.disableBody(true, true);
    });
    this.add.image(770, 410, 'gameOver')
  }

  gameWon() {
    this.player.body.velocity.x = 0;
    this.physics.pause();
    this.bombs.children.iterate(function (child) {
      child.disableBody(true, true);
    });
    this.add.image(770, 410, 'levelUp')
    this.initEvents();
  }

  initEvents() {
    this.input.on('pointerdown', () => {
      this.gameOver = true
      this.sys.game.playerCollect = this.playerCollect.filter(Boolean)
      this.sys.game.score = this.score
      this.scene.start('scramble');
    });
  }


  makeAlpha(word) {
    // hard coded positions
    // let pos = [{
    //   x: 410,
    //   y: 740
    // }, {
    //   x: 640,
    //   y: 460
    // }, {
    //   x: 1240,
    //   y: 530
    // }, {
    //   x: 1050,
    //   y: 168
    // }]

    // for (let i = 0; i < this.alphaArr.length; i++) {
    //   new Alpha(this, null, pos[i].x, pos[i].y, this.alphaArr[i], this.score)
    // }
    // this.alphaArr = word.split('')

    let alphaPosXArr = []
    this.sys.game.score = 100
    console.log(this.sys.game.score);

    this.alphaArr.forEach((e) => {
      let found = false
      while (!found) {
        let overlap = true
        let x = Phaser.Math.Between(0, this.sys.game.config.width)
        let y = Phaser.Math.Between(0, this.sys.game.config.height)
        let tile = this.groundLayer.getTileAtWorldXY(x, y)
        overlap = this.chkOverlap(x, y, alphaPosXArr)
        console.log('overlap', overlap);
        if (tile && !overlap) {
          y = tile.getTop()
          found = true
          this.createdAlpha = new Alpha(this, null, x, y - 50, e, true)
          alphaPosXArr.push(x)
        }
      }
    })
  }

  chkOverlap(x, y, alphaPosXArr) {
    let lengthAlphaTile = 80 / 2
    let minX = x - lengthAlphaTile
    let maxX = x + lengthAlphaTile
    // good stuff! some breaks the loop whenever one returns true. note need to return the loop as well else chkOverlap returns undefined!
    return alphaPosXArr.some((e) => {
      let clash = (minX).between(e - lengthAlphaTile, e + lengthAlphaTile) || (maxX).between(e - lengthAlphaTile, e + lengthAlphaTile)
      console.log('clash', clash)
      return clash
    })
  }

  makeBomb() {
    let x = Phaser.Math.Between(0, this.sys.game.config.width)
    let y = Phaser.Math.Between(0, this.sys.game.config.height)

    this.bomb = this.bombs.create(x, y, 'bomb').setScale(0.15);
    this.bomb.setBounce(1, 1);
    this.bomb.setCollideWorldBounds(true);
    // this.bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    this.bomb.setVelocity(250, 250);
    // this.bomb.body.gravity.y = 400;
    this.bomb.allowGravity = false;
    this.bombMade += 1;
  }

}
