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
  
  const lerp = (x, y, t) => 
    (1 - t) * x + t * y;

  const createPoint = (x=0, y=0, z=0) =>
    !(x*1e1 + y*1e2 + z*1e3 + 1e0);
    
  const createMotor = (from, to) => {
    let m = 1 + (to / from);
    return m.Normalized;
  };
    
  const innerProduct = (a, b) =>
    0.5 * (a*b + b*a);
    
  const dist = (a, b) =>
    (a & b).Length;
    
  const project = (x, onto) =>
    (x | onto) / onto;
    
  class Particle {
    constructor(options = {}) {
      this.mass = options.mass || random(0.01, 2);
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
         return [this.color, this.position()];
    }
    
    forques() {
      const damping = !(-0.6 * this.vel);
      const forques = this.appliedForques + damping;
      this.appliedForques = 0;
      return forques;
    }
    
    applyForque(forque) {
      this.appliedForques = (forque / this.mass) + this.appliedForques;
    }
    
    gravity(sun) {
      const g = 0.1 * this.mass * sun.mass;
      const r = dist(sun.position(), this.position());
      this.applyForque(g * ((~this.motor >>> sun.position()) & createPoint()) / (r*r));
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
    
  let particles = [];
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle());
  }
  particles.push(new Particle({ 
    mass: 30,
    pos: createPoint()
  }));
  
  return this.graph(() => {
    let now = currentTime();
    dt = now - last;
    
    for (let i = 0; i < particles.length-1; i++) {
      for (let j = i+1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        
        p1.gravity(p2);
        p2.gravity(p1);
      }      
    }
    
    for (const p of particles) {
      p.update(dt);   
    }
    last = now;
    
    return [
      ...particles.map(p =>
        p.render()).flat()
    ];
  }, {
    lineWidth: 4,
    grid: true,
    animate: true
  });
});
