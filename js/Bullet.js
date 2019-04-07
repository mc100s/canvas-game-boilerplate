class Bullet {
  constructor(initialX, initialY, vx, vy) {
    this.x = initialX
    this.y = initialY
    this.vx = vx
    this.vy = vy
  }
  draw(ctx) {
    ctx.save()
    ctx.beginPath()
    ctx.arc(this.x, this.y, 10, 0, 2*Math.PI)
    ctx.fill()
    ctx.restore()
  }
  update() {
    this.x += this.vx
    this.y += this.vy
  }
}