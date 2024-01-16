class Credit extends Phaser.Scene
{
	create ()
	{
		let scene = this;
		let credit = scene.add.text(Dims.padding, Dims.padding, 'Credits', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });
		let helper = new Helpers();
		credit.setText([
			'credit to: ',
			'Main Menu Music - The Mirror of Sound ' + 'by techtheist - Free Music Archive (CC BY)',
		]);
		const buttons = [
			helper.createButton(this, null, function () {
				scene.game.scene.start('MainMenu');
				scene.game.scene.stop('Credits');
			})];

		buttons.forEach( function (button) {
			button.setOrigin(0, 0);
			button.scale = scene.cameras.main.width
			button.setOrigin(0, 0);
			button.x = 0;
			button.y = scene.cameras.main.height - button.height;
			scene.add.text(button.x + Dims.padding, button.y + Dims.padding, '< Back To Menu', {fontSize: '32px', fill: '#FFF'});

		});

	}
}
