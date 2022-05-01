class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, backupTexture) {
        super(scene, x, y, texture, frame, backupTexture);

        // add object to existing scene
        scene.add.existing(this);
        this.moveSpeed = 2;
        this.moveSpeedBackup = this.moveSpeed;
        this.standSpeed = 2;
        this.crouchSpeed = 1;
        this.jumpForce = -600;
        this.isCrouching = false;
        this.rightLimit = 20; //limits the player from going too far to the right, higher value = higher limit
        this.pushFactor = 2;
        this.backupTexture = backupTexture;
    }


    update() {
        if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
        }
        else if (keyRIGHT.isDown && this.x <= game.config.width -
            borderUISize - this.width - this.rightLimit) {
            this.x += this.moveSpeed;
        }

        if (this.body.touching.down && Phaser.Input.Keyboard.JustDown(keyUp)) {
            //this.applyForce(new Vector2(0, this.jumpForce));
            this.body.setVelocityY(this.jumpForce);
        }

        if (Phaser.Input.Keyboard.JustDown(keyDown) && !this.isCrouching) {
            this.isCrouching = true;
            this.moveSpeed = this.crouchSpeed;
            this.height /= 2;
            this.setScale(0.25);
            //this.setTexture(this.backupTexture, 0);
        }
        if (Phaser.Input.Keyboard.JustUp(keyDown) && this.isCrouching) {
            this.isCrouching = false;
            this.moveSpeed = this.standSpeed;
            this.height *= 2;
            this.setScale(0.5);
        }

    }

    reset() {
        this.isCrouching = false;
        this.x = 0; 
    }

    contact(){
        this.x -= this.pushFactor;
    }

}

/** Notes for other devs:
 * 
 *  Ensure arcade physics is enabled on this object.
 *  Find correct value for this.rightLimit
 *  Ensure keys are defined
 *  Find correct this.x and this.y reset() values
 */
