const Algebra = f =>
    window.Algebra(2, 0, 1, f);

const utils = Algebra(() => ({
    innerProduct: (a, b) =>
        0.5 * (a*b + b*a).Dual.s,

    createPoint: (x=0, y=0, z=0) =>
        !(x*1e1 + y*1e2 + z*1e3 + 1e0)
}));

export const { createPoint, innerProduct } = utils;
export default Algebra;
