class Player {
  constructor(initialX, initialY, color) {
    this.x = initialX
    this.y = initialY
    this.radius = PLAYER_RADIUS
    this.img = new Image()
    this.img.src = "img/spaceship-"+color+".png"
    this.color = color
    this.isKeyUpPressed = false
    this.isKeyDownPressed = false
    this.nbOfFramesBeforeShooting = 0
    this.life = 5
  }

  canShoot() {
    return this.nbOfFramesBeforeShooting === 0
  }

  shoot(direction, bullets) {
    let x = this.x + (direction==="right" ? this.radius+1 : -this.radius-1)
    let y = this.y 
    let vx = direction==="right" ? BULLET_SPEED : -BULLET_SPEED
    let vy = (Math.random()-0.5) * BULLET_SPEED/2
    let newBullet = new Bullet(x, y, vx, vy)
    bullets.push(newBullet)
    this.nbOfFramesBeforeShooting = NB_OF_FRAMES_BETWEEN_SHOOTS
  }

  receiveDamage() {
    this.life--
  }


  draw(ctx) {
    ctx.save()
    if (DEBUG) {
      ctx.globalAlpha = 0.5
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
      ctx.fill()
    }
    ctx.drawImage(this.img, this.x-this.radius, this.y-this.radius, 2*this.radius, 2*this.radius)
    ctx.restore()
  }
  update() {
    if (this.nbOfFramesBeforeShooting > 0) this.nbOfFramesBeforeShooting--

    if (this.isKeyUpPressed) {
      this.y -= PLAYER_SPEED
    }
    if (this.isKeyDownPressed) {
      this.y += PLAYER_SPEED
    }

    // Border limit
    if (this.y <= this.radius) {
      this.y = this.radius
    }
    if (this.y >= CANVAS_HEIGHT-this.radius) {
      this.y = CANVAS_HEIGHT-this.radius
    }
  }

}