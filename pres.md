---
title: Geometric Algebra Animations
author: Oshgnacknak
date: \today
---

# Ganja.js

- *Geometric Algebra - Not Just Algebra*

- Generic Geometric Algebra implemented in JavaScript

- Written by Steven De Keninck

- <https://github.com/enkimute/ganja.js>

## Ganja Coffeeshop

- Write Ganja examples in your browser

- <https://enkimute.github.io/ganja.js>

# My First Example

## Render a Point

```js
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
```

# Moving Points

## Steering Behavior and Motors

### Creating Motors

```js
const createMotor = (from, to) => {
    let m = 1 + (to / from);
    return m.Normalized;
};
```

### Steering

```js
let desired = createMotor(position, target);
desired = lerp(1, desired, 5);
motor = lerp(motor, desired, dt);
motor = lerp(motor, 1, damping);
position = motor >>> position;
```
