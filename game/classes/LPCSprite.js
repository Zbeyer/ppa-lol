class LPCSprite extends Phaser.Physics.Arcade.Sprite {
	static fWidth = 64;
	static fHeight = 64;

	static framesWidthDefault = 13;
	static framesHeightDefault = 21;
	static endFrameDefault = LPCSprite.framesWidthDefault * LPCSprite.framesHeightDefault;

	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		scene.add.existing(this);
	}
	static make(scene, x, y, texture) {

		x = x || 0;
		y = y || 0;
		texture = texture || 'witch';
		let sprite = new LPCSprite(scene, x, y, texture);
		sprite.texureKey = texture;
		sprite.sceneObj = scene;
		addAnimations(sprite);
		sprite.setScale(2.0);
		return sprite;
	}
	wLeft() {
		this.play('walkLeft' + this.texureKey, true);
	}
	wRight() {
		this.play('walkRight' + this.texureKey, true);
	}
	wUp() {
		this.play('walkUp' + this.texureKey, true);
	}
	wDown() {
		this.play('walkDown' + this.texureKey, true);
	}
	fall() {
		this.play('fall' + this.texureKey, true);
	}
	dead() {
		this.play('dead' + this.texureKey, true);
	}

	idle() {
		// this.stop();
	}
}



let addAnimations = function (sprite) {
	if (!sprite) return;
	let scene = sprite.sceneObj;
	if (!scene) return;
	let texture = sprite.texureKey;
	if (!texture) return;

	if (scene.anims.exists('walkLeft' + texture)) return;

	let fWidth = 0;
	switch (texture) {
		case 'witch':
			fWidth = 1536;
			break;
		case 'fighter':
			fWidth = 1152;
			break;
		default:
			fWidth = 832;
			break;
	}
	fWidth = fWidth / LPCSprite.fWidth;
	// const fHeight = sprite.endFrameDefault / LPCSprite.fHeight;

	const walkUpFrame		= 8 * fWidth;
	const walkLeftFrame 	= 9 * fWidth;
	const walkDownFrame 	= 10 * fWidth;
	const walkRightFrame 	= 11 * fWidth;

	const fallFrame 		= 20 * fWidth;
	const deadFrame 		= 20 * fWidth + 5;

	scene.anims.create({
		key: 'walkLeft' + texture,
		frames: scene.anims.generateFrameNumbers(texture, { start: walkLeftFrame, end: walkLeftFrame + 8, first: walkLeftFrame }),
		frameRate: 8,
		repeat: -1
	});
	scene.anims.create({
		key: 'walkRight' + texture,
		frames: scene.anims.generateFrameNumbers(texture, { start: walkRightFrame, end: walkRightFrame + 8, first: walkRightFrame }),
		frameRate: 8,
		repeat: -1
	});
	scene.anims.create({
		key: 'walkUp' + texture,
		frames: scene.anims.generateFrameNumbers(texture, { start: walkUpFrame, end: walkUpFrame + 8, first: walkUpFrame }),
		frameRate: 8,
		repeat: -1
	});
	scene.anims.create({
		key: 'walkDown' + texture,
		frames: scene.anims.generateFrameNumbers(texture, { start: walkDownFrame, end: walkDownFrame + 8, first: walkDownFrame }),
		frameRate: 8,
		repeat: -1
	});
	scene.anims.create({
		key: 'fall' + texture,
		frames: scene.anims.generateFrameNumbers(texture, { start: fallFrame, end: fallFrame + 5, first: fallFrame }),
		frameRate: 8,
		repeat: -1
	});
	scene.anims.create({
		key: 'dead' + texture,
		frames: scene.anims.generateFrameNumbers(texture, { start: deadFrame, end: deadFrame, first: deadFrame }),
		frameRate: 1,
		repeat: -1
	});
	// console.log('addAnimations\t%o\t%o', scene, texture);
	// console.log('exists\t%o', scene.anims.exists('waldo'));
	// console.log('exists\t%o', scene
}