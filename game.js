
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
        this.load.spritesheet('goltsov', './assets/Sasha_anim.png', {
            frameWidth: 256, frameHeight: 512
        })
        
        
    }

    create ()
    {
        this.add.image(400, 400, 'school')
        this.add

        player = this.physics.add.sprite(100, 100, 'goltsov')
        player.setBounce(0.2)
        player.setCollideWorldBounds(true)
        player.scaleX = (0.3)
        player.scaleY = (0.3)
        console.log(player)

        this.anims.create({
            key: 'left', 
            frames: this.anims.generateFrameNumbers('goltsov', {start: 0, end: 5}), 
            frameRate: 6,
            repeat: -1
        })
        this.anims.create({
            key: 'right', 
            frames: this.anims.generateFrameNumbers('goltsov', {start: 6, end: 11}), 
            frameRate: 6,
            repeat: -1
        })


        cursors = this.input.keyboard.createCursorKeys();
    }
    update(){
        if(cursors.left.isDown){
            player.setVelocityX(-160)
            player.anims.play("left", true)
            player.lastAnim = "left"
        }
        if(cursors.right.isDown){
            player.setVelocityX(160)
            player.anims.play("right", true)
            player.lastAnim = "right"
        }
        if(cursors.up.isDown){
            player.setVelocityY(-160)
            player.anims.play(player.lastAnim, true)
        }
        if(cursors.down.isDown){
            player.setVelocityY(160)
            player.anims.play(player.lastAnim, true)
        }
        if(!(cursors.down.isDown || cursors.up.isDown)) {
            player.setVelocityY(0)
        }
        if (!(cursors.left.isDown || cursors.right.isDown)){
            player.setVelocityX(0)
        }
        if (!(cursors.left.isDown || cursors.right.isDown || cursors.down.isDown || cursors.up.isDown)){
            player.anims.stop()
            if (player.lastAnim == 'right'){
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