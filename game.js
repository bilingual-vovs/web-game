
let cursors;
let player;

class School extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('school', './assets/School-scene.webp')
        this.load.spritesheet('dude', './assets/Dude2.png', {
            frameWidth: 576/9, frameHeight: 256/4
        })
        
        
    }

    create ()
    {
        this.add.image(400, 400, 'school')
        this.add

        player = this.physics.add.sprite(100, 100, 'dude')
        player.setBounce(0.2)
        player.setCollideWorldBounds(true)

        this.anims.create({
            key: 'left', 
            frames: this.anims.generateFrameNumbers('dude', {start: 9, end: 17}), 
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'right', 
            frames: this.anims.generateFrameNumbers('dude', {start: 27, end: 35}), 
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'up', 
            frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 8}), 
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'down', 
            frames: this.anims.generateFrameNumbers('dude', {start: 18, end: 26}), 
            frameRate: 10,
            repeat: -1
        })


        cursors = this.input.keyboard.createCursorKeys();
    }
    update(){
        if(cursors.left.isDown){
            player.setVelocityY(0)
            player.setVelocityX(-160)
            player.anims.play("left", true)
        }
        else if(cursors.right.isDown){
            player.setVelocityY(0)
            player.setVelocityX(160)
            player.anims.play("right", true)
        }
        else if(cursors.up.isDown){
            player.setVelocityX(0)
            player.setVelocityY(-160)
            player.anims.play("up", true)
        }
        else if(cursors.down.isDown){
            player.setVelocityX(0)
            player.setVelocityY(160)
            player.anims.play("down", true)
        }
        else {
            player.setVelocityX(0)
            player.setVelocityY(0)
            player.anims.stop()
        }
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