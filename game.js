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

// var player;
var platforms;
var cursors;
var game = new Phaser.Game(config);
function preload() {
	// this.load.image('sky', 'path/to/your/sky.png');
	this.load.image('ground', 'path/to/your/platform.png');
	this.load.image('gem', 'game/assets/art/Blue.png');

	this.load.tilemapTiledJSON('map', 'game/assets/tilemaps/exports/samplemap.json'); // 'map' is the key used in preload
	this.load.image('tilemap', 'game/assets/art/tilemap.jpg');
}

function create() {
	const fps = 1000 / 60;

	let player = this.physics.add.sprite(100, 64, 'gem');
	let movement = new PlayerMovement();
	movement.input = this.input;
	movement.player = player;
	movement.cursors = this.input.keyboard.createCursorKeys();

	platforms = this.physics.add.staticGroup();
	platforms.create(300, 568, 'ground').setScale(2).refreshBody();


	player.setBounce(0.32);
	player.setCollideWorldBounds(true);

	let cursors = this.input.keyboard.createCursorKeys();

	let debugInfo = this.add.text(10, 10, 'Hello World', { font: '24px Courier', fill: '#FFFFFF', backgroundColor: '#001122', padding: { x: 16, y: 16 }});
	setInterval(function () {
		let now = new Date();
		// tObj.push('foo');
		debugInfo.setText([
			now.getTime(),
			now,
			'x: ' + player.x.toFixed(2),
			'y: ' + player.y.toFixed(2),
			'vx: '+ player.body.velocity.x.toFixed(1),
			'vy: '+ player.body.velocity.y.toFixed(1),
			'touching: ' + player.body.touching.down,
			'onFloor: ' + player.body.onFloor(),
			'blocked: ' + player.body.blocked.down,
			'space: ' + cursors.space.isDown,
		]);
	}, fps);

	// setTimeout(function () {
	// 	movement.defaultDownVelocity = player.body.velocity.y;
	// }, 200);

	// let map = this.make.tilemap({ key: 'map' });
	// const tileset = map.addTilesetImage('tilemap');
	// const layer = map.createLayer('layer', tileset, 64, 64);
	// layer.setScale(8);

	this.physics.add.collider(player, platforms);
}

function update() {
	const movement = new PlayerMovement();
	movement.movement();
}
