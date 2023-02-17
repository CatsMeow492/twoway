import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import * as Phaser from 'phaser';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  private ball!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private score: number = 0;
  private scoreText!: Phaser.GameObjects.Text;

  constructor() {
    super(sceneConfig);
    super({ key: 'GameScene' });
  }

  public preload() {
    this.load.setBaseURL('http://labs.phaser.io');
    this.load.image('ball', 'assets/sprites/pangball.png');
  }

  public create() {
    this.ball = this.physics.add.sprite(400, 300, 'ball');
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', color: '#fff' });

  }

  public override update() {
    if (this.cursors.left.isDown) {
      this.ball.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.ball.setVelocityX(200);
    } else {
      this.ball.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.ball.body.touching.down) {
      this.ball.setVelocityY(-500);
    }

    if (this.ball.body.touching.down) {
      this.score += 10;
      this.scoreText.setText('Score: ' + this.score);
    }
  }
}

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Sample',
  scene: GameScene,
  type: Phaser.AUTO,
  scale: {
    width: 800,
    height: 600,
  },

  parent: 'game',
  backgroundColor: '#000000',
};

export const game = new Phaser.Game(gameConfig);
