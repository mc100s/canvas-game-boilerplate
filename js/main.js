const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width
const CANVAS_HEIGHT = canvas.height

// Constants used that can be changed to have a different game play
const PLAYER_SPEED = 10
const PLAYER_RADIUS = 50
const NB_OF_FRAMES_BETWEEN_SHOOTS = 20
const BULLET_SPEED = 20

// If true, we see more information to debug more easily the game
const DEBUG = true

let g = new Game()

function animation() {
  g.draw(ctx)
  g.update()
  window.requestAnimationFrame(animation)
}
animation()



window.onkeydown = (event) => {
  console.log("event.keyCode", event.keyCode)
  try {
    switch (event.keyCode) {

      case 13: // Enter
        g.start()
        break
      
      case 38: // 'Up'
        g.player2.isKeyUpPressed = true
        break
      case 40: // 'Down'
        g.player2.isKeyDownPressed = true
        break
      
      case 87: // 'W'
        g.player1.isKeyUpPressed = true
        break
      case 83: // 'S'
        g.player1.isKeyDownPressed = true
        break
      case 68: // 'D'
        g.player1.isKeyShootPressed = true
        break
    }
  }
  catch (error) {
    console.log("g.player1 or g.player2 is probably null")
  }
}

window.onkeyup = (event) => {
  try {
    switch (event.keyCode) {
      case 38: // 'Up'
        g.player2.isKeyUpPressed = false
        break
      case 40: // 'Down'
        g.player2.isKeyDownPressed = false
        break
      
      case 87: // 'W'
        g.player1.isKeyUpPressed = false
        break
      case 83: // 'S'
        g.player1.isKeyDownPressed = false
        break
      case 68: // 'D'
        g.player1.isKeyShootPressed = false
        break
    }
  }
  catch (error) {
    console.log("g.player1 or g.player2 is probably null")
  }
}