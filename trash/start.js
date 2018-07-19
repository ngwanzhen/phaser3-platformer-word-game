import Phaser from 'phaser';
// import Bubble from '../objects/bubble';
import Star from '../objects/container';

export class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'start'
    });
    this.word = 'APPLE';
    this.alphaArr;
    this.starNo = 15;
    this.playerCollect = []
    this.score = 0;
    this.scoreText;
  }

  preload() {}
// 1600
// 866
  create() {
    this.bg = this.add.image(this.sys.game.config.width/2 , this.sys.game.config.height/2, 'bg');
    // this.bg.setOrigin(0.5);
    console.log(this.sys.game.config.width);
    console.log(this.sys.game.config.height);
    this.map = this.make.tilemap({
      key: 'map'
    });
    var tiles = this.map.addTilesetImage('snowSmall', 'tiles');
    this.groundLayer = this.map.createStaticLayer(0, tiles, 0, 0);

    // making player that bounces and doesn't go out of map
    this.player = this.physics.add.sprite(50, 0, 'player');
    // sprite.frame = 3;
    this.player.setBounce(0.2); // our player will bounce from items
    this.player.setCollideWorldBounds(true); // don't go out of the map

    // make player and ground layer collide
    this.groundLayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.groundLayer, this.player);

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
      key: 'turn',
      frames: [{
        key: 'player',
        frame: 1
      }],
      frameRate: 20
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

    this.makeStars(this.word, this.starNo)

    // score
    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: 'white'
    });
    this.scoreText.setText('Score: ' + this.score);
    // this.initEvents();
  }

  // initEvents() {
  //   this.input.on('pointerdown', () => {
  //     this.scene.start('main');
  //   });
  // }

  makeStars(word, starNo) {
    // make array
    let starArr = new Array(starNo).fill('')
    this.alphaArr = word.split('')

    let pos = 0
    this.alphaArr.forEach((e) => {
      pos += 3 // starNo / alphaArr.length rounded down
      starArr[pos] = e
    })
    console.log(starArr);
    // making containers:
    let x = 100
    starArr.forEach((e) => {
      x += 100 //scene width / starNo
      this.star = new Star(this, null, x, 10, e, this.score)
    })
  }

  update() {
    if (this.cursors.left.isDown) {
      // if the left arrow key is down
      this.player.body.setVelocityX(-160); // move left
      this.player.anims.play('left', true);
      this.player.flipX = true; // flip
    } else if (this.cursors.right.isDown) {
      // if the right arrow key is down
      this.player.body.setVelocityX(160); // move right
      this.player.flipX = false; // flip
      this.player.anims.play('right', true);
    }
    // else {
    //   this.player.body.velocity.x = 0;
    //   this.player.anims.stop();
    // }
    if (
      (this.cursors.space.isDown || this.cursors.up.isDown) &&
      this.player.body.onFloor()
    ) {
      this.player.body.setVelocityY(-330); // jump up
    }
    console.log('here', this.playerCollect)
    this.openDoor()
  }

  openDoor() {
    if (JSON.stringify(this.playerCollect.filter(Boolean)) == JSON.stringify(this.alphaArr.filter(Boolean))) {
      console.log('open sesame');
    }
  }
}
