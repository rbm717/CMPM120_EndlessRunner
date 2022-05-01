class CollisionTest extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.image('Box', 'Box.PNG');
        this.load.image('playerChar', 'Monster.PNG');
        this.load.image('bottle', 'bottle_1.png');
    }

    create(){
        // Establishes keyboard input
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        maxNumObjs = 3;
        numObjs = 0;

        // Adds physic world bounds
        this.physics.world.setBounds(0, 0, game.config.width, game.config.height);
        this.gravity = 1000;

        function contact(char){
            char.x -= 5;
        }

        // Creates a player object, and enables physics for them
        this.playerChar = new Player(this, 100, 100, 'playerChar').setOrigin(0.5, 0, 'Box');
        this.physics.world.enable(this.playerChar);
        this.playerChar.body.setCollideWorldBounds(true);
        this.playerChar.body.setGravityY(this.gravity);

        // Tweaks player character scale
        this.playerChar.setScale(.5);
        this.playerChar.width /= 10;
        this.playerChar.height /= 10;
        
        // Creates a box (collider) object, and enables physics for them
        this.box1 = new ColliderObj(this, 500, 350, 'Box', 0, 2).setOrigin(0.5, 0);
        this.physics.world.enable(this.box1);

        // Disables gravity, since we want object to fly across the screen
        this.box1.body.setAllowGravity(false);
        this.box1.body.immovable = true;

        // Sets the scale of the box object correctly
        this.box1.setScale(.05);
        this.box1.width /= 20;
        this.box1.height /= 20;

        // Creates a bottle (collider) object, and enables physics for them
        this.bottle1 = new ColliderObj(this, 500, 250, 'bottle', 0, 2).setOrigin(0.5, 0);
        this.physics.world.enable(this.bottle1);

        // Disables gravity, since we want object to fly across the screen
        this.bottle1.body.setAllowGravity(false);
        this.bottle1.body.immovable = true;

        this.colliders = this.add.group();
        this.colliders.add(this.box1);
        this.colliders.add(this.bottle1);

        this.colliderArr = [this.box1, this.bottle1];

        // Adds a floor to the game screen
        this.floor = this.add.rectangle(game.config.width/2, game.config.height - 30, game.config.width, 30, 0x6666ff);
        this.physics.world.enable(this.floor);
        this.floor.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.playerChar, this.floor, function (playerChar, floor){
            //console.log('touching floor');
        });

        // Test function for collision, currently only makes a console log
        this.physics.add.collider(this.playerChar, this.colliders, function (playerChar, box){
            console.log('Collision');
            playerChar.moveSpeed = 0;
            contact(playerChar);
        });

        
    }

    update(){
        this.playerChar.update();
        //this.box1.update();
        this.bottle1.update();
        if(this.playerChar.moveSpeed <= 0 && !this.playerChar.body.touching.right){
            this.playerChar.moveSpeed = this.playerChar.moveSpeedBackup;
        }

        /*if(numObjs < maxNumObjs){ //Can add timer req, so not too many spawned at once
            this.spawnCollider();
        }*/
    }

    spawnCollider(){
        this.spawned = false;
            while(this.spawned == false){
                this.ranNum = Math.floor(Math.random() * maxNumObjs);
                
                /*switch(ranNum){
                    case 1:

                }*/
                console.log('can spawn');
            }
    }
}