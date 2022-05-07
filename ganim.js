Algebra(2, 0, 1, () => {

  const currentTime = () =>
    performance.now() / 1000;

  
  const point = (x=0, y=0, z=0) =>
    !(x*1e1 + y*1e2 + z*1e3 + 1e0);
  
  let p = point(-0.17, 0.56);
  
  let vel = 0;
  
  let T = 1 - 0.0025e01;

  return this.graph(() => {
    p = T >>> p;

    return [
      0x00ff00,
      p, "p"
    ];
  }, {
    lineWidth: 4,
    grid: true,
    animate: true
  });
});
