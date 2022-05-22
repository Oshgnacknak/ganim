import Algebra, { createPoint, innerProduct } from './algebra.js';

const Sketch = Algebra(() =>    
    class {
        constructor() {
            this.point = createPoint();
            this.angle = 0;
            this.wall = null;
        }

        update(dt) {
            this.angle += 0.22 * dt;
            const rotation = Math.E**(createPoint() * this.angle * Math.PI);
            this.wall = rotation >>> (1e2 - 0e0);
        }

        render() {
            let cmp = innerProduct(this.point, this.wall);
            let color;
            
            if (cmp < 0) {
                color = 0x00ff00;
            } else if (cmp > 0) {
                color = 0x0000ff;
            } else {
                color = 0xeeeeee;
            }

            return [
                color,
                this.point, "point",
                
                0xff0000,
                this.wall, "wall"
            ];
        }
    });

const createCanvas = Algebra(() =>
    sketch => {
        const currentTime = () =>
            performance.now() / 1000;

        let last = currentTime();
        let dt;

        return this.graph(() => {
            let now = currentTime();
            dt = now - last;
            
            sketch.update(dt);
          
            last = now; 
            return sketch.render();
        }, {
            lineWidth: 4,
            grid: true,
            animate: true
        });
    });

async function main() {
    const sketch = new Sketch();
    const canvas = createCanvas(sketch);
    canvas.id = 'canvas';
    canvas.style.width = null;
    canvas.style.height = null;
    window.sketch = sketch;
    document.body.appendChild(canvas);
}

window.addEventListener('load', main);
