import { Component, OnInit } from '@angular/core';

import Phaser from 'phaser';

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  create() {
    console.log('create method');
  }
  preload() {
    console.log('preload method');
  }
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  // initialize phaserGame
  phaserGame!: Phaser.Game;

  config: Phaser.Types.Core.GameConfig;
  constructor() {;
    this.config = {
      type: Phaser.AUTO,
      height: 400,
      width: 800,
      scene: [MainScene],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 100 }
        }
      }
    };
  }

  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }
}



