/**
 * @file
 *  foxlib Maths Library
 *  (In the future each of these methods will be seperated into different source files.)
 */
export declare class FMaths {
    n: number;
    constructor(n: number);
    /**
     * Stacks a zero onto x until it is n digits long.
     *
     * @param { number } x
     *  Target int.
     * @param { number } n
     *  Target length.
     *
     * @return { number }
     *  Returns x with zeroes in front to n length.
     */
    static addZero(x: number, n: number): number;
    /**
     * Evaluates n!
     *
     * @param { number } n
     *  Number to evaluate as a factorial.
     *
     * @return { number }
     *  Returns n factorial.
     */
    static factorial(n: number): number;
    /**
     * Evaluates n to see if it is a prime number.
     *
     * @param { number } n
     *  Number to check if prime.
     *
     * @return { boolean }
     *  Boolean
     */
    static checkPrime(n: number): boolean;
    /**
     * Generates Pascal's Triangle to the n'th row.
     *
     * @param {number} n
     *  The number of rows with which to generate Pascal's Triangle.
     *
     * @return
     *  A nested array with rows of Pascal's Triangle up to the n'th row.
     */
    static pascal(n: number): number[][];
    /**
     * Evaluation of 'n Choose r', or 'nCr'.
     *
     * @param { number } n
     *  Creates Pascal's Triangle to the n'th row.
     * @param { number } r
     *  Finds the number in column r of row n.
     *
     * @return { number }
     *  Returns term in column r of row n.
     */
    static nCr(n: number, r: number): number;
    /**
     * Form:
     * (a [+|-] b)^x
     *
     * @param { number } x
     *  Exponent x.
     * @param { string } [o="+"]
     *  Can be '+' or '-'.
     * @param { number } [a]
     *  Variable a.
     * @param { number } [b]
     *  Variable b.
     * @param { number } [aconst]
     *  Constant of a.
     * @param { number } [bconst]
     *  Constant of b.
     *
     * @return { string }
     *  Returns a string of the Expanded Binomial.
     */
    static binomialTheorem(x: number, o?: string, a?: any, b?: any, aconst?: number, bconst?: number): string;
    static findPrimeInPascal(n: number): number[];
    /**
     * Discriminant:
     *
     * b ** 2 - 4 * a * c
     *
     * @param { number } a
     *  First Constant.
     * @param { number } b
     *  Second Constant.
     * @param { number } c
     *  Third Constant.
     *
     * @return { number }
     *  Returns number of real solutions.
     */
    static discriminant(a: number, b: number, c: number): number;
    /**
     * Quadratic Formula:
     *
     * output[] = (-b +/- sqrt(b**2 - 4*a*c)) / (2*a)
     *
     * @param { number } a
     *  First Constant.
     * @param { number } b
     *  Second Constant.
     * @param { number } c
     *  Third Constant.
     *
     * @return { number[] }
     *  Returns an array including all real solutions.
     */
    static quadraticForm(a: number, b: number, c: number): number[];
    /**
     * Euclid's Algorithm to determing Greatest Common Denominator.
     *
     * Pseudocode Basis:
     * function gcd(a, b)
     *  while b ≠ 0
     *      t := b;
     *      b := a mod b;
     *      a := t;
     *  return a;
     *
     * @param { number } a
     *  First Number.
     * @param { number } b
     *  Second Number.
     *
     * @return { number }
     *  Returns the Greatest Common Denominator of a and b.
     */
    static gcdEuclid(a: number, b: number): number;
    /**
     * Converts n degrees to radians.
     *
     * @param { number } n
     *  Angle in degrees.
     *
     * @return { number }
     *  Returns angle in radians.
     */
    static radians(n: number): number;
    /**
     * Converts n radians to degrees.
     *
     * @param { number } n
     *  Angle in radians.
     *
     * @return { number }
     *  Returns angle in degrees.
     */
    static degrees(n: number): number;
    static hPythagoras(a: number, b: number): number;
    static sPythagoras(b: number, c: number): number;
}
