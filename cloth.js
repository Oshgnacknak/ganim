Algebra(3, 0, 1, () => {

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

  const createPoint = (x=0, y=0, z=0) =>
    !(x*1e1 + y*1e2 + z*1e3 + 1e0);
    
  const createMotor = (from, to) => {
    let m = 1 + (to / from);
    return m.Normalized;
  };
    
  const dist = (a, b) =>
    (a & b).Length;
    
  class Particle {
    constructor(options = {}) {
      this.mass = options.mass || 1;
      this.color = this.generateColor();
      this.motor = this.generateMotor(options);
      this.vel = 1e12;
      this.appliedForques = 0;
    }
    
    generateMotor(options) {
      const d = 1.2;
      const pos = options.pos || createPoint(
          random(-d, d),
          random(-d, d),
          random(-d, d));
          
      return createMotor(
        createPoint(),
        pos
      );
    }
    
    generateColor() {
      return createColor(
        random(60 / this.mass, 300 / this.mass),
        random(60 / this.mass, 300 / this.mass),
        random(60 / this.mass, 300 / this.mass)
      );
    }
    
    position() {
      return this.motor >>> createPoint();
    }
    
    render() {
         return [
           this.color,
           this.position()
         ];
    }
    
    forques() {
      const damping = !(-5 * this.vel);
      const gravity = this.mass * !(~this.motor >>> -6.2e02);
      const forques = this.appliedForques + gravity + damping;
      this.appliedForques = 0;
      return forques;
    }
    
    applyForque(forque) {
      this.appliedForques = (forque / this.mass) + this.appliedForques;
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
  
  class Spring {
    constructor(particle, getAttach) {
      this.strength = 15;
      this.restLength = 0.3;
      this.particle = particle;
      this.getAttach = getAttach;
    }
    
    spring() {
      const attach = this.getAttach();
      const displacement = dist(attach, this.particle.position()) - this.restLength;
      const hooke = displacement * this.strength * ((~this.particle.motor >>> attach) & createPoint(0, 0, 0));
      this.particle.applyForque(hooke);
    }
    
    render() {
      return [
        0x000000,
        [this.getAttach(), this.particle.position()]
      ];
    }
  }
  
  let particles = [];
  let springs = [];
  const attach = createPoint(0, 3, 0);
  for (let i = 0; i < 10; i++) {
    const p = new Particle();
    particles.push(p);
    
    const getAttach = i == 0
      ? () => attach
      : () => particles[i-1].position();
    
    springs.push(new Spring(p, getAttach));
}
  
  
  return this.graph(() => {
    let now = currentTime();
    dt = now - last;
    
    for (const s of springs) {
      s.spring();   
    }
    
    for (const p of particles) {
      p.update(dt);   
    }
    
    last = now;
    
    return [
      ...particles.map(p =>
        p.render()).flat(),
        
      ...springs.map(s =>
        s.render()).flat(),
      
      0x000000,
      attach
    ];
  }, {
    lineWidth: 2,
    grid: true,
    animate: true,
    scale: 0.5
  });
});
