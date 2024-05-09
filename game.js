
let cursors;
let player;
let backgroud;


class School extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.spritesheet('school', './assets/School-scene.webp', {
            frameWidth: 1000, frameHeight: 1000 
        })
        this.load.spritesheet('goltsov', './assets/Sasha_anim.png', {
            frameWidth: 256, frameHeight: 512
        })
        
        
    }

    create ()
    {
        backgroud = this.physics.add.sprite(400, 400, 'school')
        backgroud.scaleX = 2
        backgroud.scaleY = 2

        player = this.physics.add.sprite(400, 400, 'goltsov')
        player.setBounce(0.2)
        player.setCollideWorldBounds(true)
        player.scaleX = (0.4)
        player.scaleY = (0.4)

        player.moveX = function(x) { 
            if (this.x > 300 && this.x < 500){
                this.setVelocityX(x)
            }
            else if (this.x < 300 && x == Math.abs(x)){
                this.setVelocityX(x)
                backgroud.setVelocityX(0)
            }
            else if (this.x > 500 && x != Math.abs(x)){
                this.setVelocityX(x)
                backgroud.setVelocityX(0)
            }
            else{
                this.setVelocityX(0)
                backgroud.setVelocityX(-x)
            }
            if (!x) backgroud.setVelocityX(0)
        }

        player.moveY = function(y) {
            if (this.y > 300 && this.y < 500){
                this.setVelocityY(y)
            }
            else if (this.y < 300 && y == Math.abs(y)){
                this.setVelocityY(y)
                backgroud.setVelocityY(0)
            }
            else if (this.y > 500 && y != Math.abs(y)){
                this.setVelocityY(y)
                backgroud.setVelocityY(0)
            }
            else{
                this.setVelocityY(0)
                backgroud.setVelocityY(-y)
            }
            if (!y) backgroud.setVelocityY(0)
        }

        this.anims.create({
            key: 'left', 
            frames: this.anims.generateFrameNumbers('goltsov', {start: 0, end: 5}), 
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'right', 
            frames: this.anims.generateFrameNumbers('goltsov', {start: 6, end: 11}), 
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'down', 
            frames: this.anims.generateFrameNumbers('goltsov', {start: 13, end: 17}), 
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'up', 
            frames: this.anims.generateFrameNumbers('goltsov', {start: 18, end: 22}), 
            frameRate: 5,
            repeat: -1
        })


        cursors = this.input.keyboard.createCursorKeys();
    }
    update(){
        if(!(cursors.down.isDown || cursors.up.isDown)) {
            player.moveY(0)
        }
        if (!(cursors.left.isDown || cursors.right.isDown)){
            player.moveX(0)
        }
        if (!(cursors.left.isDown || cursors.right.isDown || cursors.down.isDown || cursors.up.isDown)){
            player.anims.stop()
            if (player.lastAnim == 'right'){
            }
        }
        else{
            if(cursors.left.isDown){
                player.moveX(-160)
                if (!(cursors.up.isDown || cursors.down.isDown)) player.lastAnim = "left"
                player.anims.play(player.lastAnim, true)
            }
            else if(cursors.right.isDown){
                player.moveX(160)
                if (!(cursors.up.isDown || cursors.down.isDown)) player.lastAnim = "right"
                player.anims.play(player.lastAnim, true)
            }
            if(cursors.up.isDown){
                player.moveY(-160)
                if (!(cursors.left.isDown || cursors.right.isDown)) player.lastAnim = "up"
                player.anims.play(player.lastAnim, true)
            }
            else if(cursors.down.isDown){
                player.moveY(160)
                if (!(cursors.left.isDown || cursors.right.isDown)) player.lastAnim = "down"
                player.anims.play(player.lastAnim, true)
            }
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