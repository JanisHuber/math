export function gcdBruteForce(a: number, b: number): number {
    let gcd = 1;

    for (let i = 1; i <= Math.min(a, b); i++) {
        if (a % i === 0 && b % i === 0) {
            gcd = i;
        }
    }

    return gcd;
}

export function gcdEuclid(a: number, b: number): number {
    const absA = Math.abs(a);
    const absB = Math.abs(b);
    if (absA === absB){ return a; }
    return gcdEuclid(Math.max(absA, absB) - Math.min(absA, absB), Math.min(absA, absB));
}