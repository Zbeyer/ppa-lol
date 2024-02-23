class Preload extends Phaser.Scene
{
	preload ()
	{
		this.load.baseURL = 'game/assets/';
		// IMAGES
		this.load.image('gem', 'art/Blue.png');
		this.load.image('gemG', 'art/Green.png');
		this.load.image('bg', 'art/bg_suset.jpg');
		this.load.image('tree', 'art/cherry_blossom_trees.png');

		// SPRITESHEETS
		this.load.spritesheet('witch', 'art/spritesheets/Universal_LPC_Spritesheet_Generator/witch.png', { frameWidth: LPCSprite.fWidth, frameHeight: LPCSprite.fHeight, endFrame: 792 });
		this.load.spritesheet('fighter', 'art/spritesheets/Universal_LPC_Spritesheet_Generator/fighter.png', { frameWidth: LPCSprite.fWidth, frameHeight: LPCSprite.fHeight, endFrame: 594 });
		this.load.spritesheet('monk', 'art/spritesheets/Universal_LPC_Spritesheet_Generator/monk.png', { frameWidth: LPCSprite.fWidth, frameHeight: LPCSprite.fHeight, endFrame: 273 });

		this.load.spritesheet('villager_1', 'art/spritesheets/Universal_LPC_Spritesheet_Generator/villager_1.png', { frameWidth: LPCSprite.fWidth, frameHeight: LPCSprite.fHeight, endFrame: 273 });
		this.load.spritesheet('villager_2', 'art/spritesheets/Universal_LPC_Spritesheet_Generator/villager_2.png', { frameWidth: LPCSprite.fWidth, frameHeight: LPCSprite.fHeight, endFrame: 273 });
		this.load.spritesheet('villager_3', 'art/spritesheets/Universal_LPC_Spritesheet_Generator/villager_3.png', { frameWidth: LPCSprite.fWidth, frameHeight: LPCSprite.fHeight, endFrame: 273 });

		this.load.spritesheet('zombie', 'art/spritesheets/Universal_LPC_Spritesheet_Generator/zombie.png', { frameWidth: LPCSprite.fWidth, frameHeight: LPCSprite.fHeight, endFrame: 273 });
		this.load.spritesheet('skeleton', 'art/spritesheets/Universal_LPC_Spritesheet_Generator/skeleton.png', { frameWidth: LPCSprite.fWidth, frameHeight: LPCSprite.fHeight, endFrame: 273 });
		this.load.spritesheet('skelly_arch', 'art/spritesheets/Universal_LPC_Spritesheet_Generator/skelly_arch.png', { frameWidth: LPCSprite.fWidth, frameHeight: LPCSprite.fHeight, endFrame: 464 });
		this.load.spritesheet('skelly_spear', 'art/spritesheets/Universal_LPC_Spritesheet_Generator/skelly_spear.png', { frameWidth: LPCSprite.fWidth, frameHeight: LPCSprite.fHeight, endFrame: 273 });

		// MAPS
		this.load.tilemapTiledJSON('TestMap1', 'maps/exports/samplemap.json'); // 'map' is the key used in preload
		this.load.tilemapTiledJSON('TestMap2', 'maps/exports/test_map_two.json'); // 'map' is the key used in preload
		this.load.image('tilesImage', 'art/tilesImage.jpg');

		// MUSIC
		this.load.audio('backgroundMenuMusic', 'music/techtheist - The Mirror of Sound.mp3');

	}
	create ()
	{
		this.scene.start('Boot');
		this.scene.stop('Preload');
	}
}
