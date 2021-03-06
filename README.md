# Ganim

Animations done with geometric algebra

Currently animations can only be run in the
[Ganja Coffeeshop](https://enkimute.github.io/ganja.js/examples/coffeeshop.html).

The following animations have been implemented so far:

## Steering Behavior: Seek a target

- <https://enkimute.github.io/ganja.js/examples/coffeeshop.html#gYwqpILzE>
- [steering.js](steering.js)

Inspired by [Example 6.1: Seeking a target](https://natureofcode.com/book/chapter-6-autonomous-agents/#chapter06_example1).
Using motors to represent velocity and over time lerping between the "current" and the "desired" motor
we are moving a point towards a target point.

## A line as a separator

- <https://enkimute.github.io/ganja.js/examples/coffeeshop.html#P-t3NNo1Q>
- [separator.js](separator.js)

Dotting a point with a line gives us information
on which side the point lies.
In the next animation this will be
exploited to implement collision detection.
Note that origin and orientation
of the line are not constrained.

## Bouncing on a line

- <https://enkimute.github.io/ganja.js/examples/coffeeshop.html#-vZHRz6fW>
- [bounce.js](bounce.js)

A particle stores position and velocity,
which are implemented as in <https://enki.ws/ganja.js/examples/pga_dyn.html#dynamics--forques>.
We also include gravity and drag from the linked example.

We say a point collides with a line
iff it is not on the normal side.
We can resolve the collision by reflecting
the velocity on the line we collide with
\- a primitive operation in GA compared
to classical game mechanics.
We also translate the point onto its
projection in the line, to correct its position.

## N-Body gravitational attraction

- <https://enkimute.github.io/ganja.js/examples/coffeeshop.html#oBgrZxcEt>
- [nbodies.js](nbodies.js)

Particles are taken from be previous example,
but instead of keeping then on the screen using solid walls,
we calculate net-gravity between all the particles.
This also, on average, keeps then evenly spread out
around the center of the screen (their combined center of mass).

As an addition to the animation above,
particles now have mass making the
simulation a bit more diverse.

## Cloth simulation

- <https://enkimute.github.io/ganja.js/examples/coffeeshop.html#QlGVWZePp>
- [cloth.js](cloth.js)

This time, particles are being attach to a fixed
point and then chained together in a chain of springs.
We use hooks law to calculate spring forces.
