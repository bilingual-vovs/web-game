
let cursors;
let player;
let backgroud;

class Sprite {

    x = 0
    y = 0

    constructor (sprite){
        this.control = sprite
    }
}


class School extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload (){
        
    }

    create ()
    {
        
        

        cursors = this.input.keyboard.createCursorKeys();
    }
    update(){
        
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    physics: {
        default: 'arcade'
    },
    scene: School 
};


const game = new Phaser.Game(config);