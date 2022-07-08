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

# Simulating Physical Motion

## May the Forque Be with You

- About classical physics in 2D PGA

- Also in part written by Steven De Keninck

- <https://bivector.net/doc.html>

- tldr: <https://enki.ws/ganja.js/examples/pga_dyn.html>

## Why "Forque"?

- With GA, force and torque can be expressed in one multivector

- Forques encode their origin and apply accordingly

## Motion in PGA

- Motors represent position (displacement and orientation)

- Velocity is a line in the direction of motion

### Equations of Motion

\begin{align*}
\dot{M} &= - \frac12 M B \\
\dot{B} &= -(B^* \times B)^{-*} & \text{where }a \times b = \frac12 (ab - ba)
\end{align*}
