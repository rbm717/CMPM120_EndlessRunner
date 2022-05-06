class ColliderObj extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed, type) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.moveSpeed = speed;
      this.onScreen = false; // Keeps track of when the object is on the screen
      this.yReset = y;
      this.type = type;
    }

    update(){
      // move object left
      if(this.onScreen){
        this.body.setVelocityX(0-this.moveSpeed);
      }
      // Detects when object moves offscreen
      if(this.x <= 0 - this.width){
          this.onScreen = false;
      }
    }

    spawn(){
      this.x = game.config.width;
      this.y = this.yReset;
      this.body.setVelocityY(0);
      this.onScreen = true;
    }

    isOnScreen(){
      return this.onScreen;
    }
}