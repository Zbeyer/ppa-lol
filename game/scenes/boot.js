class Boot extends Phaser.Scene
{
	create ()
	{
		this.scene.start('MainMenu');
		this.scene.stop('Boot');
	}
}
