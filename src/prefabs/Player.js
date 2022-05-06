class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        this.moveSpeed = 200;
        this.moveSpeedBackup = this.moveSpeed;
        this.standSpeed = this.moveSpeed;
        this.crouchSpeed = this.moveSpeed/2;
        this.jumpForce = -600;
        this.isCrouching = false;
        this.rightLimit = 350; //limits the player from going too far to the right, higher value = higher limit
    }


    update() {
        // Left & right movement
        if (keyLEFT.isDown && this.x >= borderUISize){//} + this.width) {
            this.body.setVelocityX(0-this.moveSpeed);
        }else if(keyRIGHT.isDown && this.x <= game.config.width - this.rightLimit){
            this.body.setVelocityX(this.moveSpeed);
        }else{
            this.body.setVelocityX(0);
        }

        // Controls jumping
        if (this.body.touching.down && Phaser.Input.Keyboard.JustDown(keyUp) && !this.isCrouching) {
            this.body.setVelocityY(this.jumpForce);
        }

        // Sliding
        if (Phaser.Input.Keyboard.JustDown(keyDown) && !this.isCrouching && this.y > game.config.height - 45) {
            this.isCrouching = true;
            this.moveSpeed = this.crouchSpeed;
            this.anims.pause();
            this.setTexture('monster_slide', 0);
            this.y = game.config.height - 30;
            this.body.width = 110;//this.width/4;
            this.body.height = this.height/2;
        }
        // Stands player back up from crouching
        if (Phaser.Input.Keyboard.JustUp(keyDown) && this.isCrouching) {
            this.isCrouching = false;
            this.moveSpeed = this.standSpeed;
            this.anims.play('walk');
            this.body.width = this.width/2;
            this.body.height = this.height/2;
            this.y = game.config.height - 30;
            this.x -= 20;
        }

    }

    reset() {
        this.isCrouching = false;
        this.x = 0; 
    }
}

/** Notes for other devs:
 * 
 *  Ensure arcade physics is enabled on this object.
 *  Find correct value for this.rightLimit
 *  Ensure keys are defined
 *  Find correct this.x and this.y reset() values
 */
