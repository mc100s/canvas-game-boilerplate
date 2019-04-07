class Game {

  // Method triggered when we write: `var g = new Game()`
  constructor() {
    this.frame = 0
    this.page = "home"
    this.player1 = null 
    this.player2 = null 
    this.bg = null 
  }

  // Method to start the game
  start() {
    this.page = "game"
    this.player1 = new Player(PLAYER_RADIUS, CANVAS_HEIGHT/2, "red")
    this.player2 = new Player(CANVAS_WIDTH-PLAYER_RADIUS, CANVAS_HEIGHT/2, "blue")
    this.bullets = []
    // this.bg = new Background()
  }

  endGame() {
    this.page = "game-over"
  }

  // Method to draw on the canvas
  // You SHOULDN'T change any variable (only with `update()`)
  draw(ctx) {
    ctx.save()
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    if (this.page === "home") {
      ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
      ctx.font = "50px Arial"
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      let x = CANVAS_WIDTH / 2
      let y = CANVAS_HEIGHT / 2 - 100
      ctx.fillText("Player 1: W - S", x, y)
      ctx.fillText("Player 2: Up - Down", x, y+100)
      ctx.fillText("Press Enter to start", x, y+200)
    }
    if (this.page === "game") {
      // bg.draw(ctx)
      this.player1.draw(ctx)
      this.player2.draw(ctx)
      for (let i = 0; i < this.bullets.length; i++) {
        this.bullets[i].draw(ctx)
      }
      this.drawLives(ctx)

    }
    if (this.page === "game-over") {
      ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
      ctx.font = "50px Arial"
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      let x = CANVAS_WIDTH / 2
      let y = CANVAS_HEIGHT / 2 - 100
      ctx.fillText("Game Over", x, y)
      if (this.player1.life > 0)
        ctx.fillText("Player 1 won", x, y + 100)
      else
        ctx.fillText("Player 2 won", x, y + 100)
      ctx.fillText("Press Enter to restart", x, y + 200)
    }
    ctx.restore()
  }

  drawLives(ctx) {
    ctx.save()
    ctx.font = "50px Arial"
    ctx.fillText("Life: " + this.player1.life, 20, 70)

    ctx.textAlign = "right"
    ctx.fillText("Life: " + this.player2.life, CANVAS_WIDTH-20, 70)
    ctx.restore()
  }

  // Method to update variable for the next frame
  // You SHOULDN'T draw on the canvas (only with `draw(ctx)`)
  update() {
    this.frame++
    if (this.page === "game") {
      // bg.update()
      this.player1.update()
      this.player2.update()
      for (let i = 0; i < this.bullets.length; i++) {
        this.bullets[i].update()
      }

      // Check if players can shoot
      if (this.player1.canShoot()) {
        this.player1.shoot("right", this.bullets)
      }
      if (this.player2.canShoot()) {
        this.player2.shoot("left", this.bullets)
      }
      
      // Check collision between each bullet and each player
      for (let i = this.bullets.length-1; i >= 0; i--) {
        if (this.checkCollision(this.player1, this.bullets[i])) {
          this.player1.receiveDamage()
          this.bullets.splice(i,1)
        }
        if (this.checkCollision(this.player2, this.bullets[i])) {
          this.player2.receiveDamage()
          this.bullets.splice(i,1)
        }
      }

      if (this.player1.life <= 0 || this.player2.life <= 0) {
        this.endGame()
      }
    }
  }

  checkCollision(player, bullet) {
    let distance = Math.sqrt((player.x-bullet.x)**2 + (player.y-bullet.y)**2)
    return distance < player.radius
  }
}