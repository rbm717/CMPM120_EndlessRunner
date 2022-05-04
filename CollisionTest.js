class CollisionTest extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload(){
        // Loads images
        this.load.image('Box', 'Box.PNG');
        this.load.image('Books', 'Bigger_Books.png');
        this.load.image('playerChar', 'Monster.PNG');
        this.load.image('monster_slide', 'MonsterSlide.png');
        this.load.image('runner', 'Runner.png');
        this.load.image('bottle', 'bottle_1.png');
        this.load.image('background', 'background.png');
        // Loads spritesheets for animations
        this.load.spritesheet('runner_sheet', 'Runnersheet.png', {frameWidth: 320, frameHeight: 320, startFrame: 0, endFrame: 3});
        //OLD: this.load.spritesheet('monster_sheet', 'Monster1-sheet.png', {frameWidth: 320, frameHeight: 320, startFrame: 0, endFrame: 3});
        this.load.spritesheet('monster_sheet', 'Monster1-sheet.png', {frameWidth: 220, frameHeight: 305, startFrame: 0, endFrame: 3});
        this.load.spritesheet('bottle_sheet', 'bottle-Sheet.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 4});
    
        this.load.atlas('monster_walk', 'Monster1-sheet.png', 'monster_walk.json');
        this.load.atlas('slide', 'MonsterSlide.png', 'slide.json');
    }

    create(){
        // Creates animations for the monster, runner, and bottles
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('monster_sheet', { start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('runner_sheet', { start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'spin',
            frames: this.anims.generateFrameNumbers('bottle_sheet', { start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'monster_walk',
            frames: this.anims.generateFrameNames('monster_walk', {
                prefix: 'walk_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: -1,
        });
        this.anims.create({
            key: 'monster_slide',
            frames: this.anims.generateFrameNames('slide', {
                prefix: 'MonsterSlide_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: -1,
        });

        // Animates the runner
        let baggy = this.add.sprite(game.config.width - 200, 225, 'runner').setOrigin(0,0);
        baggy.setScale(0.75);
        baggy.anims.play('run');

        // Establishes keyboard input
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Sets variables for collider spawning
        maxNumObjs = 6;
        maxNumObjsOnScreen = 3;
        numObjs = 0;
        spawnTime = 1000; // Sets time for spawns (In milliseconds)
        colliderSpeed = 2;

        // Adds physic world bounds
        this.physics.world.setBounds(0, 0, game.config.width, game.config.height);
        this.gravity = 1000;

        function contact(char){
            char.x -= 5;
        }

        // Creates a player object, and enables physics for them
        this.playerChar = new Player(this, 100, 100, 'playerChar').setOrigin(0.5, 0, 'monster_slide');
        this.physics.world.enable(this.playerChar);
        this.playerChar.body.setGravityY(this.gravity);
        this.playerChar.anims.play('walk');

        // Tweaks player character scale
        this.playerChar.setScale(.5);
        this.playerChar.width /= 10;
        this.playerChar.height /= 10;
        
        // Creates a book (collider) object, and enables physics for them
        this.book1 = new ColliderObj(this, 500, 335, 'Books', 0, colliderSpeed).setOrigin(0.5, 0);
        this.physics.world.enable(this.book1);
        this.book2 = new ColliderObj(this, 500, 335, 'Books', 0, colliderSpeed).setOrigin(0.5, 0);
        this.physics.world.enable(this.book2);
        this.book3 = new ColliderObj(this, 500, 335, 'Books', 0, colliderSpeed).setOrigin(0.5, 0);
        this.physics.world.enable(this.book3);

        // Disables gravity, since we want object to fly across the screen
        //this.book1.body.setAllowGravity(false);
        this.book1.body.immovable = true;
        //this.book2.body.setAllowGravity(false);
        this.book2.body.immovable = true;
        //this.book3.body.setAllowGravity(false);
        this.book3.body.immovable = true;

        // Sets the scale of the box object correctly
        this.book1.setScale(.85);
        this.book2.setScale(.85);
        this.book3.setScale(.85);

        // Creates a bottle (collider) object, and enables physics for them
        this.bottle1 = new ColliderObj(this, 500, 250, 'bottle', 0, colliderSpeed).setOrigin(0.5, 0);
        this.physics.world.enable(this.bottle1);
        this.bottle2 = new ColliderObj(this, 500, 250, 'bottle', 0, colliderSpeed).setOrigin(0.5, 0);
        this.physics.world.enable(this.bottle2);
        this.bottle3 = new ColliderObj(this, 500, 250, 'bottle', 0, colliderSpeed).setOrigin(0.5, 0);
        this.physics.world.enable(this.bottle3);

        // Animates the bottles
        this.bottle1.anims.play('spin');
        this.bottle2.anims.play('spin');
        this.bottle3.anims.play('spin');

        // Disables gravity, since we want object to fly across the screen
        this.bottle1.body.setAllowGravity(false);
        this.bottle1.body.immovable = true;
        this.bottle2.body.setAllowGravity(false);
        this.bottle2.body.immovable = true;
        this.bottle3.body.setAllowGravity(false);
        this.bottle3.body.immovable = true;

        // Makes a group of colliders for easier physics handling
        this.colliders = this.add.group();
        this.colliders.add(this.book1);
        this.colliders.add(this.book2);
        this.colliders.add(this.book3);
        this.colliders.add(this.bottle1);
        this.colliders.add(this.bottle2);
        this.colliders.add(this.bottle3);

        // Makes an array of collider objects for easy access, and sends them off screen until they are needed
        //  Book objects are even index, bottles are odd
        this.colliderArr = [this.book1, this.bottle1, this.book2, this.bottle2, this.book3, this.bottle3];
        this.colliderArr.forEach(element => {
            element.y = 2000;
        });

        // Adds a floor to the game screen
        this.floor = this.add.rectangle(game.config.width/2, game.config.height - 30, game.config.width, 30, 0x6666ff);
        this.physics.world.enable(this.floor);
        this.floor.body.setCollideWorldBounds(true);
        //this.floor.body.immovable = true;
        this.physics.add.collider(this.playerChar, this.floor, function (playerChar, floor){
            //console.log('touching floor');
        });

        this.physics.add.collider(this.colliders, this.floor);

        // Test function for collision, currently only makes a console log
        this.physics.add.collider(this.playerChar, this.colliders, function (playerChar, box){
            console.log('Collision');
            playerChar.moveSpeed = 0;
            contact(playerChar);
        });

        this.timeElapsed = 0;
        this.timer = 0;
    }

    update(time, delta){
        // Determines how many objects are currently on the screen
        this.colliderArr.forEach(element => {
            numObjs = 0;
            if(element.isOnScreen()){
                numObjs++;
            }
        });
        
        // Spawns a new object every [spawnTime] seconds
        this.timer += delta;
        while (this.timer > spawnTime) {
            this.timeElapsed += 1;
            this.timer -= spawnTime;
            //console.log('Time: ', this.timeElapsed);
            if(numObjs < maxNumObjsOnScreen){
                this.spawnCollider();
            }
        }

        // Updates player and collider objects
        this.playerChar.update();
        this.colliderArr.forEach(element => {
            element.update();
        });

        // Resets movement speed after player collides with an object
        if(this.playerChar.moveSpeed <= 0 && !this.playerChar.body.touching.right){
            this.playerChar.moveSpeed = this.playerChar.moveSpeedBackup;
        }

        if(this.playerChar.y > game.config.height - 100){
            this.playerChar.y = 275;
        }

        if(!Phaser.Input.Keyboard.JustDown(keyUp) || !Phaser.Input.Keyboard.JustDown(keyDown)){
            //this.playerChar.anims.play('monster_walk', true);
        }

        if(Phaser.Input.Keyboard.JustDown(keyDown) ){
            this.playerChar.anims.play('monster_slide', true);
        }

        if(Phaser.Input.Keyboard.JustDown(keyUp) ){
            //this.playerChar.anims.paused = false;
        }
    }

    spawnCollider(){
        //console.log('numObjs: ', numObjs);
        this.spawned = false;
        while(this.spawned == false){
            this.ranNum = Math.floor(Math.random() * (maxNumObjs-1));
            //console.log(this.ranNum);
            this.newObj = this.colliderArr[this.ranNum];
            if(this.newObj.isOnScreen() == false){
                this.newObj.spawn();
                this.spawned = true;
                numObjs++;
                //console.log('can spawn');
            }
        }
    }
}