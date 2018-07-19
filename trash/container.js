export default class {
  constructor(scene, size = 50, x, y, alpha = '', score) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.alpha = alpha;
    // this.star = scene.add.image(0, 0, 'star').setScale(`${alpha?2:1}`);
    this.star = scene.add.image(0, 0, 'star').setScale(2);
    this.alpha = scene.add.bitmapText(0, 0, 'yellowFont', alpha, 20);
    this.alpha.tint = 0x223344;

    // make container with star and alpha
    this.container = scene.add.container(x, y, [this.star, this.alpha]);
    this.container.setSize(32, 32);
    Phaser.Display.Align.In.Center(this.star, this.alpha);


    // add collison ground, player
    scene.physics.world.enable(this.container);
    this.container.body
      .setBounce(0.2)
      .setCollideWorldBounds(true);
    scene.physics.add.collider(scene.groundLayer, this.container);
    scene.physics.add.overlap(
      scene.player,
      this.container,
      () => {
        this.collectStar(scene)
      },
      null,
      this
    );
  }

  collectStar(scene) {
    // this.playerCollect.push(this.alpha.text)
    // playerCollect(this.alpha.text);
    // console.log(this.playerCollect);
    scene.score += 10
    scene.scoreText.setText('Score: ' + scene.score);
    scene.playerCollect.push(this.alpha.text)
    // console.log(scene.playerCollect);
    delete this.container.data;
    this.container.destroy();
  }

  // set playerCollect (alpha) {
  //   this.playerCollect.push(alpha)
  // }

  // get playerCollect () {
  //   return this.playerCollect
  // }
}
