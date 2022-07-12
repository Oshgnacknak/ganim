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

- Write Ganja examples in our browser

- <https://enkimute.github.io/ganja.js>

# Our First Example

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

## Motion in PGA

- Let $M$ be the position motor

- $F$ the sum Forques

- And let $V$ be the Velocity

\begin{align*}
\dot{M} &= - \frac12 M V \\
\dot{V} &= (F - V^* \times V)^{-*} & \text{where }a \times b = \frac12 (ab - ba)
\end{align*}

## Motion in PGA Code

```js
class Particle {
  update(dt) {
    const [dm, dv] = this.deriv();
    this.motor = this.motor + dt * dm;
    this.vel = this.vel + dt * dv;
  }
   
  deriv() {
    const B = this.vel;
    return [
      -0.5 * this.motor * this.vel,
      (this.forques() -
        0.5 * (B.Dual*B - B*B.Dual)).UnDual
    ];
  }
  // ...
}
```

## Some Example Forques

- Gravity $F_g = (\widetilde{M} (g e_{02}) M)^*$

- Damping $F_d = (- d V)^*$

```js
class Particle {
  forques() {
    const gravity = !(~this.motor >>> -5e02);
    const damping = !(-0.12 * this.vel);
    return gravity + damping;
  }
  // ...
}
```

## Collision detection in PGA

- Point $P$ is on the normal side of a Hyperplane $H$ iff
$$
    P \vee H > 0
$$

```js
class Wall {
  bounce(particle) {
    let pos = particle.positon();
    let cmp = (pos & this.theWall).s;
    
    if (cmp < 0) {
      particle.vel = this.theWall >>> particle.vel;
      // ...
    }
  }
  // ...
}
```

## Gravitation between Particles

- Let $P$ be the sun, $r$ be the distance and let $m_1, m_2$ be masses

$$
    F_g = \frac{g m_1 m_2}{r^2} (\widetilde{M} P M \vee e_0)
$$

```js
class Particle {
  gravity(sun) {
    const g = 0.1 * this.mass * sun.mass;
    const r = dist(sun.position(), this.position());
    this.applyForque(g * ((~this.motor >>> sun.position())
      & createPoint()) / (r*r));
  }
  // ...
}
```

## Hook's Law  

- Let $P$ be the attachment, $d$ be the displacement and let $k$ be the spring constant

$$
    F_s = d k (\widetilde{M} P M \vee e_0)
$$

```js
class Spring {
  spring() {
    const attach = this.getAttach();
    const displacement = dist(attach,
      this.particle.position()) - this.restLength;
    const hooke = displacement * this.strength * (
        (~this.particle.motor >>> attach)
            & createPoint(0, 0, 0));
    this.particle.applyForque(hooke);
  }
  // ...
}
```

# Using PGA with our own framework

- Let's just generate PGA with Gaalop's precompiler

## The multivector

```cpp
struct MV {
    coeff coeffs[8] = { 0 };

    coeff& operator[](size_t);
}
```

## Implementing addition

```cpp

MV operator+(MV a, MV b) {
#pragma gpc begin
    gaalop_add_a = mv_from_array(a);
    gaalop_add_b = mv_from_array(b);
#pragma clucalc begin
    ? gaalop_add_res = gaalop_add_a + gaalop_add_b;
#pragma clucalc end
    MV mv;
    mv = mv_to_array(gaalop_add_res);
    return mv;
#pragma gpc end
}
```

## The Rest is pretty much the same

```cpp
struct Particle {
    void update(double dt) {
        MV dm = -0.5 * motor * vel;
        MV dv = !(forques - 0.5
          * (!vel * vel - vel * !vel));

        motor += dt * dm;
        vel += dt * dv;

        forques = { 0 };
    }
    // ...
}
```

- However, we can always optimize with the precompiler

# Thanks for Listening!

- Any questions?

- Full Ganja examples: <https://github.com/Oshgnacknak/ganim>

- PDF with slides as release

- C++ code: <https://github.com/Oshgnacknak/ganim-cpp/tree/world-gravity>
