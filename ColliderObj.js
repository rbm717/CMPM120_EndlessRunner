class ColliderObj extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.moveSpeed = speed;
      this.onScreen = false; //Keeps track of when the object is on the screen
      this.yReset = y;
    }

    update(){
      //move object left
      if(this.onScreen){
        this.x -= this.moveSpeed;
      }
      //wraps object back around to right side
      if(this.x <= 0 - this.width){
          this.onScreen = false;
          /*this.x = game.config.width;
          this.y = this.yReset;
          this.body.setVelocityY(0);*/
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