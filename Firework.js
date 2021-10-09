import Particle from './Particle.js';

class Firework {

  constructor(gravity) {
    this.gravity = gravity;
    this.color = Math.floor(Math.random() * 255);
    this.expoled = false;
    this.firework = new Particle(Math.random() * canvas.width, canvas.height, this.color, true);
    this.particles = [];
  }

  done = () => this.exploded && !this.particles.length;

  explode = () => {
    for (let i = 0; i < 100; i++) {      
      const p = new Particle(this.firework.pos.x, this.firework.pos.y, this.color);
      this.particles.push(p);
    }
  }

  update = (height) => {
    if (!this.exploded) {
      this.firework.update();
      this.firework.applayForce(this.gravity);

      if (this.firework.vel.y > 0) {
        this.exploded = true;
        this.explode();
      }
    }

    this.particles.forEach((particle, idx) => {
      particle.applayForce(this.gravity);
      particle.update();

      if (particle.done())
        this.particles.splice(idx, 1);
    });
  }

  show = (ctx) => {
    if (!this.exploded) {
      this.firework.show(ctx);
    }

    this.particles.forEach((particle) => {
      particle.show(ctx);
    });

  }
}

export default Firework;