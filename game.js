// game.js
var config = {
	backgroundColor: '#112233',
	render: {
		antialiasGL: false,
		pixelArt: true,
	},
	scale: {
		mode: Phaser.Scale.FIT,
		height: 576,
		width: 1024,
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			debug: false
		}
	},
	canvasStyle: `display: block; width: 100%; height: 100%;`,
	autoFocus: true,
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

var player;
var platforms;
var cursors;

var game = new Phaser.Game(config);

function preload() {
	// this.load.image('sky', 'path/to/your/sky.png');
	this.load.image('ground', 'path/to/your/platform.png');
	this.load.image('dude', 'game/assets/art/Blue.png');
}

function create() {
	platforms = this.physics.add.staticGroup();

	platforms.create(400, 568, 'ground').setScale(2).refreshBody();

	player = this.physics.add.sprite(100, 450, 'dude');

	player.setBounce(0.2);
	player.setCollideWorldBounds(true);

	// StateEngine.saveData("testFile", "testKey", "foo");
	// let t = StateEngine.loadData("testFile", "testKey");
	// text = this.add.text(10, 10, t, { font: '16px Courier', fill: '#00ff00' });

	this.physics.add.collider(player, platforms);

	cursors = this.input.keyboard.createCursorKeys();
}

function update() {
	if (cursors.left.isDown) {
		player.setVelocityX(-160);
	} else if (cursors.right.isDown) {
		player.setVelocityX(160);
	} else {
		player.setVelocityX(0);
	}

	if (cursors.up.isDown && player.body.touching.down) {
		player.setVelocityY(-330);
	}
}
