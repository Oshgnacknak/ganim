Algebra(2, 0, 1, () => {

  const currentTime = () =>
    performance.now() / 1000;
    
  const createColor = (r, g, b) =>
    Math.round(r) * 2**16
    | Math.round(g) * 2**8
    | Math.round(b)
    
  const random = (min, max) =>
    Math.random() * (max - min) + min;
    
  let last = currentTime();
  let dt;
  
  const lerp = (x, y, t) => 
    (1 - t) * x + t * y;

  const createPoint = (x=0, y=0, z=0) =>
    !(x*1e1 + y*1e2 + z*1e3 + 1e0);
    
  const createMotor = (from, to) => {
    let m = 1 + (to / from);
    return m.Normalized;
  };
    
  const project = (x, onto) =>
   (x | onto) / onto;
    
  class Particle {
    constructor() {
      this.color = createColor(random(50, 255), random(50, 255), random(50, 255));
      this.motor = 1;
      this.vel = (1e1 - random(0.33, 33)*1e0) ^ (0.3e2 - random(0.33, 0.33)*1e0);
    }
    
    positon() {
      return this.motor >>> createPoint();
    }
    
    render() {
      return [this.color, this.positon()];
    }
    
    forques() {
      const gravity = !(~this.motor >>> -5e02);
      const damping = !(-0.12 * this.vel);
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
    constructor(theWall) {
      this.theWall = theWall;
    }
    
    render() {
      return this.theWall;
    }
    
    bounce(particle) {
      let pos = particle.positon();
      let cmp = (pos & this.theWall).s;
      
      if (cmp < 0) {
        particle.vel = this.theWall >>> particle.vel;
        particle.vel = particle.vel * 0.995;
        
        let intersect = project(pos, this.theWall);
        let correction = createMotor(pos, intersect);
        correction = lerp(1, correction, 3);

        particle.motor = particle.motor * correction;
      }
    }
    
    rotate(dt) {
      let R = Math.E**(createPoint(0.4, -0.2) * 0.2 * dt);
      this.theWall = R >>> this.theWall;
    }
  }
  
  let particles = [];
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }
  const d = 1;
  let walls = [
    new Wall(1e2 + d*1e0),
    new Wall(-1e2 + d*1e0),
    new Wall(1e1 + d*1e0),
    new Wall(-1e1 + d*1e0)
  ];

  return this.graph(() => {
    let now = currentTime();
    dt = now - last;
    
    for (const p of particles) {
      p.update(dt);   
  
      for (const w of walls) {
        w.bounce(p);
      }
    }
  
    for (const w of walls) {
      w.rotate(dt);
    }


    last = now;
    
    return [
      ...particles.map(p =>
        p.render()).flat(),
      
      0xff0000,
      ...walls.map(w =>
        w.render())
    ];
  }, {
    lineWidth: 4,
    grid: true,
    animate: true
  });
});
