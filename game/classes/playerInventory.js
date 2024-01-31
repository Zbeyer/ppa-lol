class PlayerInventory
{
	constructor()
	{
		if (!PlayerInventory.instance)
		{
			PlayerInventory.instance = this;
		}
		return PlayerInventory.instance;
	}

	main(scene, player)
	{
		console.log('main called');
		let showHideInventory = function (scene, player) {
			if (scene.inventory.visible) {
				scene.inventory.visible = false;
				player.body.enable = true;
			} else {
				scene.inventory.visible = true;
				player.body.enable = false;
			}
		}

		player.visualSlots = player.visualSlots || [];

		let makeSlot = function (scene, player) {
			/*
			let inventory = new PlayerInventory();
			const numSlots = inventory.getSize();
			const slotsPerColumn = 5; // const slotsPerColumn = parseInt((numSlots * 0.25).toFixed(0)); */
			// let inventory = new PlayerInventory();
			const numSlots = player.visualSlots.length;
			let column = 0;
			for (let i = numSlots; i > 0; i--) {
				if (i % 5 === 0) {
					column = column + 1;
				}
			}
			const slotWidth = Dims.gridSize;
			const slotHeight = Dims.gridSize;
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
				const inventory = new PlayerInventory();
				const invLength = inventory.getInventory().length;
				for (let i = 0; i < invLength; i++) {
					let slot = makeSlot(scene, player);
					inventoryGroup.add(slot);
					player.visualSlots.push(slot);
					let item = inventory.getInventory()[i];
					if (item && item.artKey) {
						let sprite = scene.add.image(slot.x + Dims.padding * 0.5, slot.y + Dims.padding * 0.5, item.artKey);
						sprite.setOrigin(0, 0);
						sprite.setScale( (Dims.gridSize - Dims.padding) / Math.max(sprite.width, sprite.height));
						sprite.setInteractive();
						sprite.on('pointerdown', function (pointer, x, y, event) {
							console.log('clicked %o', pointer);
							player.itemSelected = sprite;
						});
						scene.input.on('gameobjectdown', function (pointer, gameObject)
						{
							console.log('clicked %o', gameObject);
						});

						inventoryGroup.add(sprite);
					}
					if (item && item.name) {
						const bgHeight = Dims.padding * 1.5;
						let textBG = scene.add.rectangle(slot.x, slot.y + slot.height - bgHeight, slot.width, bgHeight, 0x000000, 0.75);
						textBG.setOrigin(0, 0);
						let text = scene.add.text(textBG.x + Dims.padding * 0.5, textBG.y + Dims.padding * 0.5, item.name, {fontSize: '16px', fill: '#FFFFFF'});
						text.setOrigin(0, 0);
						inventoryGroup.add(textBG);
						inventoryGroup.add(text);
					}
				}
				inventoryGroup.add(bg);
				scene.inventoryGroup = inventoryGroup;
			}
			else
			{
				scene.inventoryGroup = null;
				inventoryGroup.clear(true, true);
				inventoryGroup.destroy();
				player.visualSlots.forEach(function (slot) {
					slot.destroy();
					scene.input.removeAllListeners('gameobjectdown');
				});
				player.visualSlots = [];
			}

		}, scene);
	}

	getSize()
	{
		this.maxSize = this.maxSize || 9;
		return this.maxSize;
	}

	swapItems(item1, item2)
	{
		// instantiate the inventory if it doesn't exist
		this.player.inventory = this.player.inventory || [];
		const index1 = this.player.inventory.indexOf(item1);
		const index2 = this.player.inventory.indexOf(item2);
		if (index1 === -1 || index2 === -1)
		{
			return false;
		}
		this.player.inventory[index1] = item2;
		this.player.inventory[index2] = item1;
		return this.getInventory();

	}

	getInventory()
	{
		this.player.inventory = this.player.inventory || [];
		return this.player.inventory;
	}

	addItem(item)
	{
		// instantiate the inventory if it doesn't exist
		this.player.inventory = this.player.inventory || [];
		this.player.inventory.push(item);
		return this.getInventory();
	}

	removeItem(item)
	{
		// instantiate the inventory if it doesn't exist
		this.player.inventory = this.player.inventory || [];
		this.player.inventory = this.player.inventory.filter(function (i) {
			return i !== item;
		});
		return this.getInventory();
	}
}