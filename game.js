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

let game = new Phaser.Game(config);

function preload() {
	this.load.image('gem', 'game/assets/art/Blue.png');
	this.load.tilemapTiledJSON('map', 'game/assets/maps/exports/samplemap.json'); // 'map' is the key used in preload
	this.load.image('tilesImage', 'game/assets/art/tilesImage.jpg');
}

function create() {

	let player = this.physics.add.sprite(100, 64, 'gem');
	this.cameras.main.startFollow(player);
	this.physics.world.enable(player);
	player.setBounce(0.32);

	let movement = new PlayerMovement();
	movement.input = this.input;
	movement.player = player;
	movement.cursors = this.input.keyboard.createCursorKeys();

	let map = this.make.tilemap({ key: 'map' }); // 'map' is the key used in preload
	// this.map.setCollision([ 1, ]);
	map.setCollisionBetween(1, 2000);

	let tileset = map.addTilesetImage('allMyTiles', 'tilesImage'); // 'yourTilesetName' is the name of the tileset in the JSON file

	// Create layers
	let groundLayer = map.createLayer('groundLayer', tileset, 0, 0);


	this.physics.add.collider(player, groundLayer);

	debugText(this, player);
}

function update() {
	const movement = new PlayerMovement();
	movement.movement();
}

trackMovement = function (scene, player) {

}

debugText = function (scene, player) {
	const fps = 1000 / 60;
	let debugInfo = scene.add.text(0, 0, 'FooBar', { font: '24px Courier', fill: '#FFFFFF', backgroundColor: '#001122', padding: { x: 16, y: 16 }});
	setInterval(function () {
		let now = new Date();
		debugInfo.x = player.x - debugInfo.width / 2;
		debugInfo.y = player.y - debugInfo.height  - 40;
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
		]);
	}, fps);
}