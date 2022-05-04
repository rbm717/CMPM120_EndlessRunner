let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            useTree: false,
            gravity: { y: 100 }
        }
    },
    scene: [ CollisionTest]
}

let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
// Reserve key tags
let keySpace, keyLEFT, keyRIGHT, keyUp, keyDown;
// Keep track of object spawning
let maxNumObjs;
let maxNumObjsOnScreen;
let numObjs;
let spawnTime;
let colliderSpeed;