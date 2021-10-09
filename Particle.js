class Particle {

  constructor(x, y, color, firework) {
    this.pos = { x, y };
    this.color = color;
    this.opacity = 1;
    this.firework = firework;
    this.acc = { x: 0, y: 0 };
    this.size = 5;

    if (this.firework) {
      this.vel = { x: 0, y: Math.floor(Math.random() * -15) - 5 };
    } else {
      this.vel = { x: (Math.random() * 30) - 15, y: (Math.random() * 30) - 15 };
    }

  }

  done = () => this.opacity < 0;

  applayForce = (force) => {
    this.acc.x += force.x;
    this.acc.y += force.y;
  }

  update = () => {
    if (!this.firework) {
      this.vel.x *= 0.9;
      this.vel.y *= 0.9;
      this.opacity -= 0.05;
    }

    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    this.acc.x *= 0;
    this.acc.y *= 0;
  }

  show = (ctx) => {
    ctx.beginPath();
    ctx.fillStyle = `hsl(${this.color}, 50%, 50%, ${this.opacity})`;
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

}

export default Particle;