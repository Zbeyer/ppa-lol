class DebugLevel extends Phaser.Scene {

	create() {
		let text = this.add.text(Dims.padding, Dims.padding, 'Debug Level', { fontFamily: 'Verdana', fontSize: 24, color: '#ffffff'});
		let bg = this.add.image(0, 0, 'bg');
		bg.setScale(this.cameras.main.width / bg.width);
		let trunk_1 = this.add.image(0, 0, 'tree');
		trunk_1.setOrigin(0.5, 1.0);
		let trunk_2 = this.add.image(0, 0, 'tree');
		trunk_2.setOrigin(0.5, 1.0);
		let trunk_3 = this.add.image(0, 0, 'tree');
		trunk_3.setOrigin(0.5, 1.0);

		trunk_1.setScale(this.cameras.main.height / trunk_1.height * 1.5);
		trunk_2.setScale(trunk_1.scale);
		trunk_3.setScale(trunk_1.scale);

		trunk_1.setScale(trunk_1.scale * 1.5);
		trunk_2.setScale(trunk_1.scale * 1.25)

		let player = LPCSprite.make(this, 256, 512, 'fighter');
		player.sceneObj = this;

		this.cameras.main.startFollow(player);
		this.physics.world.enable(player);
		player.setScale(player.scale / 1.334);

		let inventory = new PlayerInventory();
		inventory.player = inventory.player || player;
		inventory.addItem(new Item("Green Gem", "A green gem", "gemG"));
		inventory.addItem(null);
		inventory.addItem(null);
		inventory.addItem(null);
		inventory.addItem(new Item("Blue Gem", "A blue gem", "gem"));
		inventory.addItem(null);
		inventory.addItem(null);
		inventory.addItem(new Item("Green Gem", "A green gem", "gemG"));
		inventory.addItem(new Item("Green Gem", "A green gem", "gemG"));
		inventory.addItem(new Item("Blue Gem", "A blue gem", "gem"));

		let map = this.make.tilemap({key: 'TestMap2'}); // 'map' is the key used in preload
		// this.map.setCollision([ 1, ]);
		map.setCollisionBetween(1, 2000);
		// return;
		let tileset = map.addTilesetImage('allMyTiles', 'tilesImage'); // 'yourTilesetName' is the name of the tileset in the JSON file

		// Create layers
		let groundLayer = map.createLayer('groundLayer', tileset, 0, 0);
		this.physics.add.collider(player, groundLayer);

		this.escapeMenu(this);
		this.inventory(this, player);
		this.debugText(this, player);
		this.movement(this, player);
		this.moveBG(bg, [trunk_1, trunk_2, trunk_3], player);

		let dSpriteX = -4;
		const sWidth = LPCSprite.fWidth + Dims.padding;
		let dSpriteY = 4;
		const sHeight = LPCSprite.fHeight + Dims.padding * 2.0;
		LPCSprite.make(this, dSpriteX * sWidth, dSpriteY * sHeight, 'fighter').wUp();
		dSpriteX += 1;
		LPCSprite.make(this, dSpriteX * sWidth, dSpriteY * sHeight, 'fighter').wRight();
		dSpriteX += 1;
		LPCSprite.make(this, dSpriteX * sWidth, dSpriteY * sHeight, 'fighter').wDown();
		dSpriteX += 1;
		LPCSprite.make(this, dSpriteX * sWidth, dSpriteY * sHeight, 'fighter').wLeft();

		dSpriteX = -4;
		dSpriteY += 1;
		LPCSprite.make(this, dSpriteX * sWidth, dSpriteY * sHeight, 'fighter').fall();
		dSpriteX += 1;
		LPCSprite.make(this, dSpriteX * sWidth, dSpriteY * sHeight, 'fighter').dead();

		dSpriteY += 3;
		dSpriteX = -4;
		LPCSprite.make(this, dSpriteX * sWidth, dSpriteY * sHeight, 'skeleton').wDown();
		dSpriteX += 1;
		LPCSprite.make(this, dSpriteX * sWidth, dSpriteY * sHeight, 'zombie').wDown();
		dSpriteX += 1;
		LPCSprite.make(this, dSpriteX * sWidth, dSpriteY * sHeight, 'witch').wDown();
		dSpriteX += 1;
		LPCSprite.make(this, dSpriteX * sWidth, dSpriteY * sHeight, 'fighter').wDown();
		dSpriteX += 1;
		LPCSprite.make(this, dSpriteX * sWidth, dSpriteY * sHeight, 'monk').wDown();
		dSpriteX += 1;
		LPCSprite.make(this, dSpriteX * sWidth, dSpriteY * sHeight, 'villager_1').wDown();
		dSpriteX += 1;
		LPCSprite.make(this, dSpriteX * sWidth, dSpriteY * sHeight, 'villager_2').wDown();
		dSpriteX += 1;
		LPCSprite.make(this, dSpriteX * sWidth, dSpriteY * sHeight, 'villager_3').wDown();

		dSpriteY += 2;
		dSpriteX = 0;
		let witch = LPCSprite.make(this, dSpriteX * sWidth, dSpriteY * sHeight, 'witch')
		witch.wRight();
		addAnimations(this, 'witch');

		// witch.flipX = true;
		let walkLeft = false;
		let speed = 4.0;
		setInterval(function () {
			// if (witch.flipX) {
			// if (witch.play('walkRight')) {
			if (walkLeft)
			{
				witch.x -= speed;
			}
			else
			{
				witch.x += speed;
			}
			if (witch.x > 840)
			{
				// witch.flipX = true;
				walkLeft = true;
				witch.wLeft();
			} else if (witch.x < -280) {
				walkLeft = false;
				witch.wRight();
			}
		}, Dims.fps);
	}

	moveBG = function (bg, trunks, player) {
		setInterval(function () {
			const paralax_1 = player.x;
			const paralax_2 = paralax_1 * 0.75;
			const paralax_3 = paralax_2 * 0.75;
			const paralax_4 = paralax_3 * 0.75;
			bg.x = paralax_1; //( - bg.width) / 2;
			bg.y = player.y; //( - bg.height) / 2;
			trunks[0].x = paralax_2;
			trunks[1].x = paralax_3;
			trunks[2].x = paralax_4;
			trunks[0].y = bg.y + Dims.padding * 30;
			trunks[1].y = bg.y + Dims.padding * 50;
			trunks[2].y = bg.y + Dims.padding * 80;
		}, Dims.fps);
	}

	escapeMenu = function (scene) {
		scene.input.keyboard.on('keydown-ESC', function (event) {
			scene.scene.start('MainMenu');
			scene.scene.stop('DebugLevel')
		}, scene);
	}
	inventory = function (scene, player)
	{
		const inventory = new PlayerInventory();
		inventory.player = player;
		inventory.startTracking(scene, player);
		console.log('inventory %o', inventory);
	}

	movement = function (scene, player) {
		const movement = new PlayerMovement();
		movement.input = scene.input;
		movement.player = player;
		player.onLeft = function ()
		{
			player.wLeft();
		}
		player.onRight = function ()
		{
			player.wRight();
		}
		player.onIdle = function ()
		{
			player.idle();
		}

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
		let item = new Item("Blue Gem", "A blue gem", "gem");
		setInterval(function () {
			let slots = (new PlayerInventory()).getInventory();
			let now = new Date();
			debugInfo.x = player.x - debugInfo.width / 2;
			debugInfo.y = player.y - debugInfo.height - 64;
			debugInfo.setText([
				now.getTime() + '\t\t' + now.toLocaleTimeString(),
				'x: ' + player.x.toFixed(1) + '\t\t\t\ty: ' + player.y.toFixed(1),
				'vx: ' + player.body.velocity.x.toFixed(1) + '\t\t\t\tvy: ' + player.body.velocity.y.toFixed(1),
				'jumps: ' + player.jumps,
				'onFloor: ' + player.body.onFloor(),
			]);
		}, Dims.fps);
	}
}