Algebra(2, 0, 1, () => {
  
  const currentTime = () =>
    performance.now() / 1000;
    
  let last = currentTime();
  let dt;

  const createPoint = (x=0, y=0, z=0) =>
    !(x*1e1 + y*1e2 + z*1e3 + 1e0);
    
  const createMotor = (from, to) => {
    let m = 1 + (to / from);
    return m.Normalized;
  };
  
  const lerp = (x, y, t) => 
    (1 - t) * x + t * y;
  
  let position = createPoint(-1, 1);
  let target = createPoint(1, -1);
  let motor = 1;

  return this.graph(() => {
    let now = currentTime();
    dt = now - last;

    let desired = createMotor(position, target);
    motor = lerp(motor, desired, dt);
    position = motor >>> position;
    
    last = now;
    
    return [
      0x00ff00,
      position, "position",
      
      0xff0000,
      target, "target"
    ];
  }, {
    lineWidth: 4,
    grid: true,
    animate: true
  });
});
