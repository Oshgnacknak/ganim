Algebra(2, 0, 1, () => {

  const currentTime = () =>
    performance.now() / 1000;
    
  let last = currentTime();
  let dt;

  const createPoint = (x=0, y=0, z=0) =>
    !(x*1e1 + y*1e2 + z*1e3 + 1e0);

  
  const innerProduct = (a, b) =>
    0.5 * (a*b + b*a).Dual.s;
  
  let point = createPoint(0.5, 1);
  
  let angle = 0;

  return this.graph(() => {
    let now = currentTime();
    dt = now - last;
    
    angle += 0.22 * dt;
    
    let R = Math.E**(createPoint(-0.4, 0.2) * angle * Math.PI);
    
    let wall = R >>> (1e2 - 0e0);
    
    let cmp = innerProduct(point, wall);
    let color;
    
    if (cmp < 0) {
      color = 0x00ff00;
    } else if (cmp > 0) {
      color = 0x0000ff;
    } else {
      color = 0xeeeeee;
    }
  
    last = now; 
    
    return [
      color,
      point, "point",
      
      0xff0000,
      wall, "wall"
    ];
  }, {
    lineWidth: 4,
    grid: true,
    animate: true
  });
});
