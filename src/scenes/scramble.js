import Phaser from 'phaser';
import Alpha from '../objects/alpha';

export class ScrambleScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'scramble'
    });
    this.word = 'APPLE';
    this.alphaArr = this.word.split('')
    this.playerCollect;
    this.life = 3;
    this.typedString = '';
  }

  preload() {}

  create() {
    this.playerCollect = this.sys.game.playerCollect
    let centerX = this.sys.game.config.width / 2
    let centerY = this.sys.game.config.height / 2

    // add back tilesets and player in static positions
    this.add.image(centerX, centerY, 'chalkboard').setScale(0.5)

    // add back alpha collected by player
    let x = centerX - this.playerCollect.length / 2 * 80
    this.playerCollect.forEach((e) => {
      new Alpha(this, null, x, centerY - 100, e, false)
      x += 120
    })

    // add life
    let group = this.add.group({
      key: 'player',
      repeat: this.life - 1,
      setXY: {
        x: 50,
        y: this.sys.game.config.height - 100,
        stepX: 100
      }
    });
    this.dogs = group.getChildren();

    // instructions & show text typed
    this.add.text(305, 93, 'Type the letters in the right order to form a word', {
      fontSize: '32px',
      fill: 'white'
    });
    this.playerTyped = this.add.text(centerX - this.playerCollect.length / 2 * 80, centerY + 50, '', {
      fontSize: '64px',
      fill: 'white'
    });

    // adding keyboard input
    let uniquePlayerCollect = this.uniq(this.playerCollect)
    uniquePlayerCollect.forEach((e) => {
      this.input.keyboard.on(`keydown_${e}`, () => {
        console.log(`key ${e} is pressed`);
        this.typedString += e
        this.checkSequence()
      })
    })
  }

  uniq(a) {
    return a.sort().filter(function (item, pos, ary) {
      return !pos || item != ary[pos - 1];
    })
  }

  update() {
    // if length of player input is = length of word, check for win this.checkSequence
    if (this.life === 0) {
      console.log('gameOver');
      this.add.image(770, 410, 'gameOver')
    }
  }

  checkSequence() {
    let chkArr = this.alphaArr.slice(0, this.typedString.length)
    if (chkArr.join('') == this.typedString) {
      this.checkWin()
    } else {
      this.life -= 1
      console.log(this.life);
      this.typedString = ''
      let dog = Phaser.Utils.Array.GetFirst(this.dogs);
      console.log(this.dogs.length);
      if (dog) {
        dog.destroy();
      } else {
        console.log('no dog');
      }
    }
    this.playerTyped.setText(this.typedString)
  }

  checkWin() {
    if (this.typedString == this.word) {
      this.playerCollect = null
      this.add.image(680, 210, 'gameWon').setScale(2)
      this.add.image(800, 210, 'gameWon').setScale(2)
      this.add.image(920, 210, 'gameWon').setScale(2)
    }
  }

}
