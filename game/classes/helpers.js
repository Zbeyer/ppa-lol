class Helpers
{
	constructor () { return this; }
	createButton (scene, text, callback)
	{
		scene.buttons = scene.buttons || [];
		text = text || null;
		const numButtons = scene.buttons.length;
		const buttonHeight = 64;
		const buttonWidth = 320;

		let offsetY = (Dims.padding + buttonHeight) * (numButtons + 1);

		let button = scene.add.rectangle(buttonWidth, offsetY, buttonWidth, buttonHeight, 0x000000);
		button.setInteractive();
		button.setOrigin(0, 0);
		scene.buttons.push(button);
		button.alpha = 0.5;
		button.on('pointerdown', callback, scene);

		offsetY = offsetY + Dims.padding;
		if (!text) return button;

		let buttonText = scene.add.text(buttonWidth + Dims.padding, offsetY, text, { fontFamily: 'Verdana', fontSize: 24, color: '#ffffff'});
		buttonText.setOrigin(0, 0);
		return button;
	}
}