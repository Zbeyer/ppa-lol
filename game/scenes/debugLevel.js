class DebugLevel extends Phaser.Scene {

	create() {
		let text = this.add.text(Dims.padding, Dims.padding, 'Debug Level', { fontFamily: 'Verdana', fontSize: 24, color: '#ffffff'});


		let player = this.physics.add.sprite(256, 512, 'gem');
		this.cameras.main.startFollow(player);
		this.physics.world.enable(player);
		player.setScale(player.scale / 1.334);
		player.setBounce(0.16);

		let map = this.make.tilemap({key: 'TestMap2'}); // 'map' is the key used in preload
		// this.map.setCollision([ 1, ]);
		map.setCollisionBetween(1, 2000);
		// return;
		let tileset = map.addTilesetImage('allMyTiles', 'tilesImage'); // 'yourTilesetName' is the name of the tileset in the JSON file

		// Create layers
		let groundLayer = map.createLayer('groundLayer', tileset, 0, 0);
		this.physics.add.collider(player, groundLayer);

		this.debugText(this, player);
		this.movement(this, player);
	}

	movement = function (scene, player) {
		const movement = new PlayerMovement();
		movement.input = scene.input;
		movement.player = player;
		movement.cursors = scene.input.keyboard.createCursorKeys();
		setInterval(function () {
			movement.movement();
		}, Dims.fps);
	}

	debugText = function (scene, player) {
		let debugInfo = scene.add.text(0, 0, 'FooBar', {
			font: '24px Courier',
			fill: '#FFFFFF',
			backgroundColor: '#001122',
			padding: {x: 16, y: 16}
		});
		setInterval(function () {
			let now = new Date();
			debugInfo.x = player.x - debugInfo.width / 2;
			debugInfo.y = player.y - debugInfo.height - 64;
			debugInfo.setText([
				now.getTime() + '\t\t' + now.toLocaleTimeString(),
				'x: ' + player.x.toFixed(1) + '\t\t\t\ty: ' + player.y.toFixed(1),
				'vx: ' + player.body.velocity.x.toFixed(1) + '\t\t\t\tvy: ' + player.body.velocity.y.toFixed(1),
				'jumps: ' + player.jumps,
				'onFloor: ' + player.body.onFloor()
			]);
		}, Dims.fps);
	}
}