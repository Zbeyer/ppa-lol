class Preload extends Phaser.Scene
{
	preload ()
	{
		this.load.baseURL = 'game/assets/';
		// IMAGES
		this.load.image('gem', 'art/Blue.png');
		this.load.image('bg', 'art/bg_suset.jpg');
		this.load.image('tree', 'art/cherry_blossom_trees.png');


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
