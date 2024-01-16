class MainMenu extends Phaser.Scene
{
	create ()
	{
		let scene = this;
		let text = this.add.text(Dims.padding, Dims.padding, 'Main Menu', { fontFamily: 'Verdana', fontSize: 32, color: '#ffffff'});
		scene.buttons = [];
		let helper = new Helpers();

		helper.createButton(this, 'Debug Level', function () {
			scene.scene.start('DebugLevel');

			scene.scene.stop('MainMenu');
		});
		helper.createButton(this, 'Credits', function () {
			scene.scene.start('Credits');
			scene.scene.stop('MainMenu');
		});
		//
		helper.createButton(this, 'Quit', function () {
			scene.scene.start('Quit');
		});

		scene.sound.add('backgroundMenuMusic', {loop: true, volume: Settings.musicVolume}).play();

		// let audioContext = scene.sound.context;
		// let gainNode = audioContext.createGain();
		// let music = audioContext.createBufferSource();
		// music.connect(gainNode);
		// gainNode.connect(audioContext.destination);
		//
		// scene.sound.decodeAudio('backgroundMenuMusic', function (buffer) {
		// 	music.buffer = buffer;
		// 	music.loop = true;
		// 	gainNode.gain.value = 0.5;
		// 	music.start();
		// });
	}
}
