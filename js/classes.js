class Sprite {
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}}) {
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElasped = 0  //how many frames elasped over entire animation
        this.framesHold = 15 //how many frames should we go through before changing framesCurrent (actual animation)
        this.offset = offset

    }
    draw() {
        c.drawImage(this.image, 
            this.framesCurrent * (this.image.width / this.framesMax),  //animation for frames
            0, this.image.width / this.framesMax, this.image.height,
            this.position.x - this.offset.x, this.position.y - this.offset.y, 
            (this.image.width / this.framesMax) * this.scale, this.image.height * this.scale)

    }

    animateFrame()
    {
        this.framesElasped++

        if(this.framesElasped % this.framesHold === 0)
        {
            if(this.framesCurrent < this.framesMax - 1){ //resetting the frame from the beginning, minus one gets rid of the black/final part of image
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }

        }
    }

    update(){
        this.draw()
        this.animateFrame()
    }

}

class Fighter extends Sprite {
    constructor({position, velocity, color = 'red', imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}, sprites, 
    attackBox = {offset: {}, width: undefined, height: undefined}}) {
        super({
            position, imageSrc, scale, framesMax, offset
        })

        this.velocity = velocity //gravity
        this.height = 150
        this.width = 50
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }

        this.color = color
        this.isAttacking

        this.health = 100

        this.framesCurrent = 0
        this.framesElasped = 0  //how many frames elasped over entire animation
        this.framesHold = 12 //how many frames should we go through before changing framesCurrent (actual animation)

        this.sprites = sprites

        this.dead = false

        //loop through sprites object
        for(const sprite in this.sprites){
            sprites[sprite].image = new Image() //object you are currently looping over
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }


    update(){
        this.draw()

        if(!this.dead){
            this.animateFrame()
        }

        //attack boxes
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y //over time, position is adding on per frame

        //show attackbox
        //c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        //prevents falling under canvas 
        if(this.position.y + this.height + this.velocity.y >= canvas.height - 100) { 
            this.velocity.y = 0
            this.position.y = 326 //sets default height so you don't go under when falling 
         } else this.velocity.y += gravity 
        
        //adding barriers to the left and right of the screen
        if(this.position.x + this.width < 0)
        {
            this.position.x = 0
        } else this.position.x

        if(this.position.x - this.width > 1024)
        {
            this.position.x = 1024
        } else this.position.x


         //console.log(this.position.x)


    }

    attack() { //displays the attack animation for 1ms
        this.isAttacking = true
        this.switchSprite('attack1')
    }

    takeHit(){
        this.health -= 10

        if(this.health <= 0)
        {
            this.switchSprite('death')
        } else {
            this.switchSprite('takeHit')
        }
    }

    switchSprite(sprite){
        //checks for death
        if(this.image === this.sprites.death.image){
            if(this.framesCurrent === this.sprites.death.framesMax -1){
                this.dead = true
            }
            return
        }
        //overriding all other animations with attack animation
        if(this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax - 1){
            return
            }
        
        //override when fighter gets hit
        if(this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax - 1){
            return
            } 

        switch(sprite){
            case 'idleLeft':
                if(this.image != this.sprites.idleLeft.image){
                this.image = this.sprites.idleLeft.image
                this.framesMax = this.sprites.idleLeft.framesMax
                this.framesCurrent = 0 //when swapping to a different animation, start from zero
                }
                break
            case 'idleRight':
                if(this.image != this.sprites.idleRight.image){
                this.image = this.sprites.idleRight.image
                this.framesMax = this.sprites.idleRight.framesMax
                this.framesCurrent = 0 
                }
                break      
            case 'runLeft':
                if(this.image != this.sprites.runLeft.image){
                this.image = this.sprites.runLeft.image
                this.framesMax = this.sprites.runLeft.framesMax
                this.framesCurrent = 0 
                }
                break      
            case 'runRight':
                if(this.image != this.sprites.runRight.image){
                this.image = this.sprites.runRight.image
                this.framesMax = this.sprites.runRight.framesMax
                this.framesCurrent = 0 
                }
                break      
            case 'jumpLeft':
                if(this.image != this.sprites.jumpLeft.image){
                this.image = this.sprites.jumpLeft.image
                this.framesMax = this.sprites.jumpLeft.framesMax
                this.framesCurrent = 0 
                }
                break
            case 'jumpRight':
                if(this.image != this.sprites.jumpRight.image){
                this.image = this.sprites.jumpRight.image
                this.framesMax = this.sprites.jumpRight.framesMax
                this.framesCurrent = 0 
                }
                break    
            case 'fallRight':
                if(this.image != this.sprites.fallRight.image){
                this.image = this.sprites.fallRight.image
                this.framesMax = this.sprites.fallRight.framesMax
                this.framesCurrent = 0 
                }
                break
            case 'fallLeft':
                if(this.image != this.sprites.fallLeft.image){
                this.image = this.sprites.fallLeft.image
                this.framesMax = this.sprites.fallLeft.framesMax
                this.framesCurrent = 0 
                }
                break           
            case 'attack1':
                if(this.image != this.sprites.attack1.image){
                this.image = this.sprites.attack1.image
                this.framesMax = this.sprites.attack1.framesMax
                this.framesCurrent = 0 
                }
                break            
                
            case 'takeHit':
                if(this.image != this.sprites.takeHit.image){
                this.image = this.sprites.takeHit.image
                this.framesMax = this.sprites.takeHit.framesMax
                this.framesCurrent = 0 
                }
                break
            
            case 'death':
                if(this.image != this.sprites.death.image){
                this.image = this.sprites.death.image
                this.framesMax = this.sprites.death.framesMax
                this.framesCurrent = 0 
                }
                break
        }
    }
}