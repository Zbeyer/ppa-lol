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

		this.escapeMenu(this);
		this.inventory(this, player);
		// this.debugText(this, player);
		this.movement(this, player);
	}

	escapeMenu = function (scene) {
		scene.input.keyboard.on('keydown-ESC', function (event) {
			scene.scene.start('MainMenu');
			scene.scene.stop('DebugLevel')
		}, scene);
	}
	inventory = function (scene, player) {
		let showHideInventory = function (scene, player) {
			if (scene.inventory.visible) {
				scene.inventory.visible = false;
				player.body.enable = true;
			} else {
				scene.inventory.visible = true;
				player.body.enable = false;
			}
		}

		let makeSlot = function (scene, player) {
			player.slots = player.slots || [];
			const numSlots = player.slots.length;

			let column = 0;
 			for (let i = numSlots; i > 0; i--) {
				if (i % 5 === 0) {
					column = column + 1;
				}
			}
			const slotWidth = 64;
			const slotHeight = 64;
			const x = (numSlots % 5) * (Dims.padding * 0.5 + slotWidth) + player.x - Dims.padding * 11;
			const y = column * (Dims.padding * 0.5 + slotHeight) + player.y - Dims.padding * 6.5;

			let slot = scene.add.rectangle(x, y, slotWidth, slotHeight, 0xFFFFFF, 0.75);
			slot.setOrigin(0, 0);
			// let slotText = scene.add.text(slot.x, slot.y, 'S ' + numSlots, {fontSize: '16px', fill: '#000'});
			return slot;
		}
		scene.input.keyboard.on('keydown-E', function (event) {
			let inventoryGroup = scene.inventoryGroup || scene.add.group();
			showHideInventory(scene, player);
			if (scene.inventory.visible)
			{
				let alpha = 0.80;
				let bg = scene.add.rectangle(player.x, player.y, 384, 240, 0x000000, alpha);
				for (let i = 0; i < 15; i++) {
					let slot = makeSlot(scene, player);
					player.slots.push(slot);
				}
				inventoryGroup.add(bg);
				scene.inventoryGroup = inventoryGroup;
			}
			else
			{
				scene.inventoryGroup = null;
				inventoryGroup.clear(true, true);
				inventoryGroup.destroy();
				player.slots.forEach(function (slot) {
					slot.destroy();
				});
				player.slots = [];
			}

		}, scene);
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