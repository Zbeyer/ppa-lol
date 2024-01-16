// game.js
class PPAGame {
	// static fps = 1000 / 60;
	newGame() {
		let game = new Phaser.Game({
				backgroundColor: '#112233',
				render: { pixelArt: true },
				scale: { mode: Phaser.Scale.FIT, height: Dims.height, width: Dims.width, },
				physics: { default: 'arcade', arcade: { gravity: {y: 700}, } },
				autoFocus: true,
			});
		game.scene.add('Preloader', Preload);
		game.scene.add('Boot', Boot);
		game.scene.add('MainMenu', MainMenu);
		// game.scene.add('MainGame', MainGame);
		// game.scene.add('GameOver', GameOver);
		game.scene.add('DebugLevel', DebugLevel);
		game.scene.add('Credits', Credit);
		game.scene.add('Quit', Quit);
		game.scene.start('Preloader');
		return game;
	}


}
(new PPAGame).newGame();