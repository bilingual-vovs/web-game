
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
        this.load.spritesheet('goltsov', './assets/goltsov.webp', {
            frameWidth: 512, frameHeight: 512
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

        player.timeStamp = new Date().getTime()
        player.currentAnim = false
        player.animSpeed = 30
        player.frames = 0

        player.playAnim = function () { 
            if (!this.currentAnim) return 
            const time = new Date().getTime()
            if (time - this.timeStamp >= this.animSpeed){
                if (this.currentAnim == 'left'){
                    this.scaleX = -Math.abs(this.scaleX)
                }
                else { 
                    this.scaleX = Math.abs(this.scaleX)
                }
                this.frames++
                if (this.frames%30 <15){
                    this.scaleY /= 0.994
                    this.scaleX *= 0.98
                }
                else{
                    this.scaleY *= 0.994
                    this.scaleX /= 0.98
                }
                this.timeStamp = time
            }
        }
        

        player.moveX = function(x) { 
            if (x != Math.abs(x) && x != 0){
                this.currentAnim = 'left'
            }
            else if (x != 0){
                this.currentAnim = 'right'
            }
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
            if (y != Math.abs(y) && !this.currentAnim && y != 0){
                this.currentAnim = 'rigth'
            }
            else if (y == Math.abs(y) && !this.currentAnim && y != 0){
                this.currentAnim = 'left'
            }
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

        

        cursors = this.input.keyboard.createCursorKeys();
    }
    update(){
        if(!(cursors.down.isDown || cursors.up.isDown)) {
            player.moveY(0)
        }
        else{
            if(cursors.up.isDown){
                player.moveY(-160)
            }
            else if(cursors.down.isDown){
                player.moveY(160)
            }
        }
        if (!(cursors.left.isDown || cursors.right.isDown)){
            player.moveX(0)
        }
        else{
            if(cursors.left.isDown){
                player.moveX(-160)
            }
            else if(cursors.right.isDown){
                player.moveX(160)
            }
        }
        if(!(cursors.left.isDown || cursors.right.isDown || cursors.down.isDown || cursors.up.isDown)) player.currentAnim = false
        player.playAnim()
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