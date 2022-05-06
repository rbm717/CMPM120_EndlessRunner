class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    preload(){
        this.load.image('background', './assets/background.png');
    }

    create(){
        this.menuScreen = this.add.sprite(0,0, 'background').setOrigin(0,0);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.text(game.config.width/2, game.config.height/2-200, 'DOOBY SCOO', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
        this.add.text(game.config.width/2, game.config.height/2-100, 'Press space to start', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
        this.add.text(game.config.width/2, game.config.height/2-50, 'Avoid obstacles for as long as possible', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
        this.add.text(game.config.width/2, game.config.height/2, 'Left <- and right -> arrows for lateral movement', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
        this.add.text(game.config.width/2, game.config.height/2+50, 'Up arrow ^ to jump', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
        this.add.text(game.config.width/2, game.config.height/2+100, 'Down arrow v to slide', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace) ){
            this.scene.start('playScene');
        }
    }
}