class PlayerMovement
{
	constructor(player)
	{
		if (!PlayerMovement.instance)
		{
			this.speed = 64 * 8;
			this.jumpStrength = 64 * 3;
			PlayerMovement.instance = this;
		}
		return PlayerMovement.instance;
	}
	movement ()
	{
		const cursors = this.cursors;
		const input = this.input;

		const shouldMoveLeft = cursors.left.isDown || input.keyboard.addKey('A').isDown;
		const shouldMoveRight = cursors.right.isDown || input.keyboard.addKey('D').isDown;
		const shouldDecelerate = !shouldMoveLeft && !shouldMoveRight;
		const shouldMoveDown = cursors.down.isDown || input.keyboard.addKey('S').isDown;
		const shouldJump =  (cursors.up.isDown && this.player.body.onFloor())
			|| (input.keyboard.addKey('W').isDown && this.player.body.onFloor())
			|| (cursors.space.isDown && this.player.body.onFloor());
		// this.player.setVelocityX(0);
		if (shouldMoveLeft) {
			this.moveLeft();
		}
		if (shouldMoveRight) {
			this.moveRight();
		}
		if (shouldDecelerate) {
			this.player.setVelocityX(0);
		}
		if (shouldJump) {
			this.moveUp();
		} else if (shouldMoveDown) {
			this.moveDown();
		}
	}
	moveLeft ()
	{
		this.player.setVelocityX(-1 * this.speed);
	}
	moveRight ()
	{
		this.player.setVelocityX(this.speed);
	}
	moveUp ()
	{
		this.player.setVelocityY(-1 * this.jumpStrength);
	}
	moveDown ()
	{
		this.player.setVelocityY(this.speed);
		this.player.setVelocityY(0);
	}
}