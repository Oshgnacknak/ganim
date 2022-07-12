Algebra(2, 0, 1, () => {
  
  const point = (x=0, y=0, z=0) =>
    !(x*1e1 + y*1e2 + z*1e3 + 1e0);
  
  return this.graph(() => {
    return [
      0x00ff00,
      point(-0.17, 0.56), "p"
    ];
  }, {
    lineWidth: 4,
    grid: true
  });
});
