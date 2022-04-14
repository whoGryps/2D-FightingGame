const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height) //x position, y position, rect width, rect height

//creation of the background 
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/Bgupdate2.png'
})

const shop = new Sprite({
    position: {
        x: 375,
        y: 115
    },
    imageSrc: './img/oak_woods_v1.0/decorations/shop_anim.png',
    scale: 2.75,
    framesMax: 6
})

/*const playerFace = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/Martial Hero/Sprites/IdleRight.png',
    scale: 1,
    framesMax: 8,

}) */

const gravity = 0.7

//creation of player
const player = new Fighter( {
    position: {
        x: 256,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },

    imageSrc: './img/Martial Hero/Sprites/IdleRight.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 155
    },

    sprites: {
        idleLeft: {
            imageSrc:' ./img/Martial Hero/Sprites/IdleLeft.png',
            framesMax: 8
        },
        idleRight: {
            imageSrc:' ./img/Martial Hero/Sprites/IdleRight.png',
            framesMax: 8
        },
        runRight: {
            imageSrc:' ./img/Martial Hero/Sprites/RunRight.png',
            framesMax: 8
        },
        runLeft: {
            imageSrc:' ./img/Martial Hero/Sprites/RunLeft.png',
            framesMax: 8
        },
        jumpRight: {
            imageSrc:' ./img/Martial Hero/Sprites/JumpRight.png',
            framesMax: 2
        },
        jumpLeft: {
            imageSrc:' ./img/Martial Hero/Sprites/JumpLeft.png',
            framesMax: 2
        },
        fallRight: {
            imageSrc:' ./img/Martial Hero/Sprites/FallRight.png',
            framesMax: 2
        },
        fallLeft: {
            imageSrc:' ./img/Martial Hero/Sprites/FallLeft.png',
            framesMax: 2
        },
        attack1: {
            imageSrc:' ./img/Martial Hero/Sprites/Attack1.png',
            framesMax: 6
        },
        takeHit: {
            imageSrc: ' ./img/Martial Hero/Sprites/Take Hit - white silhouette.png',
            framesMax: 4
        },
        death: {
            imageSrc: ' ./img/Martial Hero/Sprites/Death.png',
            framesMax: 6
        }
    },


    attackBox: {
        offset: {
            x: 90,
            y: 50
        },
        width: 150,
        height: 50
    }

})

//creation of enemy
const enemy = new Fighter( {
    position: {
        x: 768,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },

    color: 'blue',

    offset: {
        x: -50,
        y: 0
    },

    imageSrc: './img/Fantasy Warrior/Sprites/IdleRight.png',
    framesMax: 10,
    scale: 2.5,
    offset: {
        x: 250,
        y: 102
    },

    sprites: {
        idleLeft: {
            imageSrc:' ./img/Fantasy Warrior/Sprites/IdleLeft.png',
            framesMax: 10
        },
        idleRight: {
            imageSrc:' ./img/Fantasy Warrior/Sprites/IdleRight.png',
            framesMax: 10
        },
        runRight: {
            imageSrc:' ./img/Fantasy Warrior/Sprites/RunRight.png',
            framesMax: 8
        },
        runLeft: {
            imageSrc:' ./img/Fantasy Warrior/Sprites/RunLeft.png',
            framesMax: 8
        },
        jumpRight: {
            imageSrc:' ./img/Fantasy Warrior/Sprites/JumpRight.png',
            framesMax: 3
        },
        jumpLeft: {
            imageSrc:' ./img/Fantasy Warrior/Sprites/JumpLeft.png',
            framesMax: 3
        },
        fallRight: {
            imageSrc:' ./img/Fantasy Warrior/Sprites/FallRight.png',
            framesMax: 3
        },
        fallLeft: {
            imageSrc:' ./img/Fantasy Warrior/Sprites/FallLeft.png',
            framesMax: 3
        },
        attack1: {
            imageSrc:' ./img/Fantasy Warrior/Sprites/Attack1Flipped.png',
            framesMax: 7
        },

        takeHit: {
            imageSrc: ' ./img/Fantasy Warrior/Sprites/TakeHitLeft.png',
            framesMax: 3
        },

        death: {
            imageSrc: ' ./img/Fantasy Warrior/Sprites/Death.png',
            framesMax: 7
        }

        /*takeHitRight: {
        imageSrc: ' ./img/Fantasy Warrior/Sprites/TakeHitRight.png',
        framesMax: 3
        },*/
    },


    attackBox: {
        offset: {
            x: -175,
            y: 60
        },
        width: 125,
        height: 50
    }
})

//console.log(player)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    w: {
        pressed: false
    }
}

decreaseTimer()

//animation loop
function animate() {
    window.requestAnimationFrame(animate) //what function you want to loop over and over again
    //console.log('go')

    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height) //clears the canvas

    //background ceation
    background.update()

    //shop creation
    shop.update()

    /*player face creation
    playerFace.update()*/

    //enemy face creation

    c.fillStyle = 'rgba(255, 255, 255, 0.05)'
    c.fillRect(0,0, canvas.width, canvas.height)

    player.update()
    enemy.update()

    player.velocity.x = 0 //resets position after keyup 
    enemy.velocity.x = 0

    //player movement

    if(keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -5
        player.switchSprite('runLeft')
  
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        player.switchSprite('runRight')

    } else if(player.lastKey === 'd'){
        player.switchSprite('idleRight')
    } else if(player.lastKey === 'a'){
        player.switchSprite('idleLeft')
    } else player.switchSprite('idleRight')
    

    //player jump animation
    if(player.velocity.y < 0 && player.lastKey === 'd'){
        player.switchSprite('jumpRight')
    } else if(player.velocity.y > 0 && player.lastKey === 'd') {
        player.switchSprite('fallRight')
    }

    if(player.velocity.y < 0 && player.lastKey === 'a'){
        player.switchSprite('jumpLeft')
    } else if(player.velocity.y > 0 && player.lastKey === 'a') {
        player.switchSprite('fallLeft')
    }

    //enemy movement
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -5
        enemy.switchSprite('runLeft')

    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
        enemy.switchSprite('runRight')

    } else if(enemy.lastKey === 'ArrowRight'){
        enemy.switchSprite('idleRight')
    } else if(enemy.lastKey === 'ArrowLeft'){
        enemy.switchSprite('idleLeft')
    } else enemy.switchSprite('idleLeft')

    //enemy jump animiation
    if(enemy.velocity.y < 0 && enemy.lastKey === 'ArrowRight'){
        enemy.switchSprite('jumpRight')
    } else if(enemy.velocity.y > 0 && enemy.lastKey === 'ArrowRight') {
        enemy.switchSprite('fallRight')
    }

    if(enemy.velocity.y < 0 && enemy.lastKey === 'ArrowLeft'){
        enemy.switchSprite('jumpLeft')
    } else if(enemy.velocity.y > 0 && enemy.lastKey === 'ArrowLeft') {
        enemy.switchSprite('fallLeft')
    }


    //detect for player attack and enemy gets hit
    if( rectangularCollision({
        rectangle1: player,
        rectangle2: enemy,
    })
        && player.isAttacking && player.framesCurrent === 4)
    {
        enemy.takeHit()
        player.isAttacking = false 

        gsap.to('#enemyHealth', {   //animate downward for health
            width: enemy.health + '%'
        })
    }

    //if player misses
    if(player.isAttacking && player.framesCurrent === 4){
        player.isAttacking = false
    }

    //detect enemy attack and player hit
    if( rectangularCollision({
        rectangle1: player,
        rectangle2: enemy,
    })
        && enemy.isAttacking && enemy.framesCurrent === 3)
    {
        player.takeHit()
        enemy.isAttacking = false 
        //console.log('die from enemy')
        gsap.to('#playerHealth', { //animate downward for health
            width: player.health + '%'
        })
    }

    //if enemy misses
    if(enemy.isAttacking && enemy.framesCurrent === 3){
        enemy.isAttacking = false
    }


    //end game based on health
    if(enemy.health <= 0 || player.health <= 0)
    {
        determineWinner({player, enemy, timerId})
    }
}

animate()
//atempting to limit player to one jump
playerJumpPress = 0

enemyJumpPress = 0

//moving the player with key press
window.addEventListener('keydown', (event) => {

    if(!player.dead){
    switch (event.key) {
        
        //player
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
        break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
        break
        case 'w':
            if(player.position.y === 326)
            {
                player.velocity.y = -20
                //console.log('w press')
                playerJumpPress++
                //console.log(playerJumpPress)
            }
        break
        case ' ':
            player.attack()
        break
    }
}

    if(!enemy.dead)
    {
    switch(event.key){
        //enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
        break
        case 'ArrowUp':
            if(enemy.position.y === 326)
            {
                enemy.velocity.y = -20
                //console.log('Arrow Up press')
                enemyJumpPress++
                //console.log(enemyJumpPress)
            }
        break
        case 'ArrowDown':
            enemy.attack()
        break
        }
    
    }
    //console.log(event.key)
})

//moving the player with key unpress
window.addEventListener('keyup', (event) => {

    switch (event.key) {
        
        //player
        case 'd':
            keys.d.pressed = false
        break
        case 'a':
            keys.a.pressed = false
        break
        /*case 'w':
            playerJumpPress = 0
        break*/

        //enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
        break
    }
    //console.log(event.key)
})

