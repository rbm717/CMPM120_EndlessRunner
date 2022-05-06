/* Group Members: Raymond Metzger, Devin Wear, Vinicius Vella Sarlo Sanchez, Justin Hu
 * Date Completed: 5/6/22
 * Creative tilt:
 *  Technical:
 *      We used the physics engine in ways we hadn't before, while making modular collider elements
 *      that could be switched up in both functionallity and appearance with relative ease. One thing
 *      in particular that took quite a bit of work was the manipulation of the hitboxes when sprites
 *      changed orientation, but in the end it worked out.
 *  Visual:
 *      As you can probably tell, we took a lot of inspiration from Scooby Doo, particularly from
 *      the classic cartoon made around the 70's.
 */

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    // Sets the screen to automatically fit the display
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug:true, // Used to observe hitboxes when testing
            useTree: false,
            gravity: { y: 100 }
        }
    },
    scene: [Menu, DoobyScoo, endGame]
}

let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
// Reserve key tags
let keySpace, keyLEFT, keyRIGHT, keyUp, keyDown;
// Keep track of object spawning
let maxNumObjs;         // Total number of objects (used to calculate randomness)
let maxNumObjsOnScreen; // Maximum number of objects allowed on the screen at a given time
let numObjs;            // Current number of objects on the screen
let spawnTime;          // Sets time for spawns (In milliseconds)
let spawnTimeDec;       // Decrements collider spawn time by this (milliseconds)
let colliderSpeed;      // Movement speed of collider objects
let difTime;            // Sets timer to increase difficulty (in milliseconds)
let moveSpdInc;         // Increases collider speed by this amount every [difTime] milliseconds
// Score that persists across scenes
let score;
// Allows music to be accessed across all scenes
let music;