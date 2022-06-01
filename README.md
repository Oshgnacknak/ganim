# Ganim

Animations done with geometric algebra

Currently animations can only be run in the
[Ganja Coffeeshop](https://enkimute.github.io/ganja.js/examples/coffeeshop.html).

The following animations have been implemented so far:

## Steering Behavior: Seek a target

- [steering.js](steering.js)

Inspired by [Example 6.1: Seeking a target](https://natureofcode.com/book/chapter-6-autonomous-agents/#chapter06_example1).
Using motors to represent velocity and over time lerping between the "current" and the "desired" motor
we are moving a point towards a target point.

## A line as a separator

- [separator.js](separator.js)

Dotting a point with a line gives us information
on which side the point lies.
In the next animation this will be
exploited to implement collision detection.
Note that origin and orientation
of the line are not constrained.

## Bouncing on a line

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
