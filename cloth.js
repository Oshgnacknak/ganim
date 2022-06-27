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
         return [
           this.color,
           this.position()
         ];
    }
    
    forques() {
      const damping = !(-0.6 * this.vel);
      const gravity = this.mass * !(~this.motor >>> -2.2e02);
      const forques = this.appliedForques + 0 + damping;
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
    constructor(particle, attach) {
      this.strength = random(2, 4);
      this.restLength = random(0.2, 2);
      this.particle = particle;
      this.attach = attach;
    }
    
    spring() {
      const displacement = dist(this.attach, this.particle.position()) - this.restLength;
      const hooke = displacement * this.strength * ((~this.particle.motor >>> this.attach) & createPoint(0, 0, 0));
      this.particle.applyForque(hooke);
    }
    
    render() {
      return [
        0x000000, this.attach,
        [this.attach, this.particle.position()]
      ];
    }
  }
  
  let particles = [];
  for (let i = 0; i < 10; i++) {
    particles.push(new Particle());
  }
  
  const spring = new Spring(particles[0], createPoint(0, 1, 0));
  
  return this.graph(() => {
    let now = currentTime();
    dt = now - last;
    
    spring.spring();
    
    for (const p of particles) {
      p.update(dt);   
    }
    
    last = now;
    
    return [
      ...particles.map(p =>
        p.render()).flat(),
        
        ...spring.render()
    ];
  }, {
    lineWidth: 2,
    grid: true,
    animate: true
  });
});
