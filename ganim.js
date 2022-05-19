Algebra(2, 0, 1, () => {

  const currentTime = () =>
    performance.now() / 1000;
    
  let last = currentTime();
  let dt;

  const createPoint = (x=0, y=0, z=0) =>
    !(x*1e1 + y*1e2 + z*1e3 + 1e0);
    
  const innerProduct = (a, b) =>
    0.5 * (a*b + b*a).Dual.s;
    
  class Particle {
    constructor() {
      this.motor = 1;
      this.vel = (1e1 - 0e0) ^ (1e2 - 3e0);
    }
    
    positon() {
      return this.motor >>> createPoint();
    }
    
    forques() {
      const gravity = !(~this.motor >>> -9.81e02);
      const damping = !(-0.25 * this.vel);
      return gravity + damping;
    }
    
    update(dt) {
      const [dm, dv] = this.deriv();
      this.motor = this.motor + dt * dm;
      this.vel = this.vel + dt * dv;
    }
     
    deriv() {
      const B = this.vel;
      return [
        -0.5 * this.motor * this.vel,
        (this.forques() - 0.5 * (B.Dual*B - B*B.Dual)).UnDual
      ];
    }
  }
  
  class Wall {
    constructor() {
      this.theWall = 1e2 + 1e0;
    }
    
    render() {
      return this.theWall;
    }
    
    bounce(particle) {
      let pos = particle.positon();
      let cmp = innerProduct(pos, this.theWall);
      
      if (cmp <= 0) {
        particle.vel = this.theWall >>> particle.vel;
      }
    }
  }
  
  let particle = new Particle();
  let wall = new Wall();

  return this.graph(() => {
    let now = currentTime();
    dt = now - last;

    wall.bounce(particle);
    particle.update(dt);

    last = now;
    
    return [
      0x00ff00,
      particle.positon(),
      
      0xff0000,
      wall.render()
    ];
  }, {
    lineWidth: 4,
    grid: true,
    animate: true
  });
});

