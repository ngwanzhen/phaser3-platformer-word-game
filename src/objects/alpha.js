export default class {
  constructor(scene, size = 50, x, y, alpha = '', physics) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.alphaKey = alpha;

    this.alpha = scene.physics.add.sprite(x, y, this.alphaKey).setScale(0.3);

    if (physics === true) {
      this.alpha.enableBody(true, x, y, true, true);
      this.alpha.setCollideWorldBounds(true);
      scene.physics.add.overlap(scene.player, this.alpha, () => {
        this.collectAlpha(scene)
      }, null, this);
    }
  }

  collectAlpha(scene) {
    // destroy alpha
    console.log('collided', this.alpha.texture.key);
    this.alpha.disableBody(true, true);

    // update score
    scene.score += 10
    scene.scoreText.setText('Score: ' + scene.score);
    scene.playerCollect.push(this.alpha.text)

    // psuh collected alpha
    scene.playerCollect.push(this.alpha.texture.key)

    // check logic
    scene.chkSequence()
  }

  // set playerCollect (alpha) {
  //   this.playerCollect.push(alpha)
  // }

  // get playerCollect () {
  //   return this.playerCollect
  // }
}
