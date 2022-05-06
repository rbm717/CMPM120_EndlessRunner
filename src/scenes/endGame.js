class endGame extends Phaser.Scene{
    constructor() {
        super("endGameScene");
    }

    preload(){
        this.load.image('background', './assets/background.png');
    }

    create(){
        this.endScreen = this.add.sprite(0,0, 'background').setOrigin(0,0);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.text(game.config.width/2, game.config.height/2-200, 'Score: ' + score, {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
        this.add.text(game.config.width/2, game.config.height/2-100, 'Credits: ', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
        this.add.text(game.config.width/2, game.config.height/2-50, 'Programming: Raymond Metzger, Justin Hu', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
        this.add.text(game.config.width/2, game.config.height/2, 'Art Assets: Devin Wear, Vinicius Sanchez', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
        this.add.text(game.config.width/2, game.config.height/2+50, 'Sound Design: Vinicius Sanchez', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
        this.add.text(game.config.width/2, game.config.height/2+100, 'Playtesting/Advising: Thomas Price', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
        this.add.text(game.config.width/2, game.config.height/2+150, 'Press space to restart', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace) ){
            this.scene.start('menuScene');
        }
    }
}