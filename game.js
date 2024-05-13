
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
        this.load.spritesheet('weapon', './assets/weapon.png', {
            frameWidth: 315, frameHeight: 250
        })
        
    }

    create ()
    {
        {
            backgroud = this.physics.add.sprite(400, 400, 'school')
            backgroud.scaleX = 2
            backgroud.scaleY = 2

            player = this.physics.add.sprite(400, 400, 'goltsov')
            player.setBounce(0.2)
            player.setCollideWorldBounds(true)
            player.scaleX = (0.4)
            player.scaleY = (0.4)
            player.scaleXStamp = player.scaleX
            player.scaleYStamp = player.scaleY

            player.timeStamp = new Date().getTime()
            player.currentAnim = false
            player.animSpeed = 30
            player.frames = 0

            player.weapon = this.physics.add.sprite(400, 400+50, 'weapon')
            player.weapon.scaleX = 1.2
            player.weapon.scaleY = 1.2
            player.weapon.scaleXStamp = player.weapon.scaleX
            player.weapon.scaleYStamp = player.weapon.scaleY        
            player.depth = 2
            player.direction = 'right'
        }

        player.attack = function () {
            if (player.attackAnim) return
            player.attackFrames = 0
            player.attackAnim = setInterval(()=>{
                if (player.attackFrames >=12) {
                    console.log(player.attackFrames)
                    clearInterval(player.attackAnim)
                    player.attackFrames = 0
                    player.attackAnim = setInterval(()=>{
                        if (player.attackFrames >= 40){
                            clearInterval(player.attackAnim )
                            player.attackAnim = false
                            player.attackFrames = 0
                            player.weapon.rotation = 0
                        }
                        if (player.direction == 'right') player.weapon.rotation -= 0.039
                        else player.weapon.rotation += 0.039
                        player.attackFrames++
                    },15)
                }
                if (player.direction == 'right') player.weapon.rotation += 0.12
                else player.weapon.rotation -= 0.12
                player.attackFrames++
            },10)
        }

        player.playAnim = function () { 
            if (!this.currentAnim) {
                if (player.direction == 'right') {
                    this.scaleX = this.scaleXStamp
                    this.scaleY = this.scaleYStamp
                    this.weapon.scaleX = this.weapon.scaleXStamp
                    this.weapon.scaleY = this.weapon.scaleYStamp
                }
                else{
                    this.scaleX = -this.scaleXStamp
                    this.scaleY = this.scaleYStamp
                    this.weapon.scaleX = -this.weapon.scaleXStamp
                    this.weapon.scaleY = this.weapon.scaleYStamp
                }
                return
            }
            const time = new Date().getTime()
            if (time - this.timeStamp >= this.animSpeed){
                if (this.currentAnim == 'left'){
                    this.direction = 'left'
                    this.scaleX = -Math.abs(this.scaleX)
                    this.weapon.scaleX = -Math.abs(this.weapon.scaleX)
                }
                else { 
                    this.direction = 'right'
                    this.scaleX = Math.abs(this.scaleX)
                    this.weapon.scaleX = Math.abs(this.weapon.scaleX)
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
                this.weapon.setVelocityX(x)
            }
            else if (this.x < 300 && x == Math.abs(x)){
                this.setVelocityX(x)
                this.weapon.setVelocityX(x)
                backgroud.setVelocityX(0)
            }
            else if (this.x > 500 && x != Math.abs(x)){
                this.setVelocityX(x)
                this.weapon.setVelocityX(x)
                backgroud.setVelocityX(0)
            }
            else{
                this.setVelocityX(0)
                this.weapon.setVelocityX(0)
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
                this.weapon.setVelocityY(y)
            }
            else if (this.y < 300 && y == Math.abs(y)){
                this.setVelocityY(y)
                this.weapon.setVelocityY(y)
                backgroud.setVelocityY(0)
            }
            else if (this.y > 500 && y != Math.abs(y)){
                this.setVelocityY(y)
                this.weapon.setVelocityY(y)
                backgroud.setVelocityY(0)
            }
            else{
                this.setVelocityY(0)
                this.weapon.setVelocityY(0)
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
        if (cursors.space.isDown) player.attack()
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