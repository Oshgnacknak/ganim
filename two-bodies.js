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
    constructor() {
      this.color = createColor(random(50, 255), random(50, 255), random(50, 255));
      this.motor = createMotor(
        createPoint(), 
        createPoint(random(-1, 1), random(-1, 1), random(-1, 1)));
      this.vel = 1e12;
      this.appliedForques = 0;
    }
    
    position() {
      return this.motor >>> createPoint();
    }
    
    render() {
      return [this.color, this.position()];
    }
    
    forques() {
      const damping = !(-0.12 * this.vel);
      const forques = this.appliedForques + damping;
      this.appliedForques = 0;
      return forques;
    }
    
    applyForque(forque) {
      this.appliedForques = forque + this.appliedForques;
    }
    
    gravity(sun) {
      const r = dist(sun, this.position());
      this.applyForque(0.5 * ((~this.motor >>> sun) & createPoint()) / (r*r));
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
  
  let p1 = new Particle();
  let p2 = new Particle();

  return this.graph(() => {
    let now = currentTime();
    dt = now - last;
    
    p1.gravity(p2.position());
    p2.gravity(p1.position());


    p1.update(dt);
    p2.update(dt);

    last = now;
    
    return [
      ...p2.render(),
      ...p1.render()
      ];
  }, {
    lineWidth: 4,
    grid: true,
    animate: true
  });
});

