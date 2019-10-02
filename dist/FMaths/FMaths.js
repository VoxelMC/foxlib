"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file
 *  foxlib Maths Library
 *  (In the future each of these methods will be seperated into different source files.)
 */
class FMaths {
    constructor(n) {
        this.n = n;
    }
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
    static addZero(x, n) {
        while (x.toString().length < n) {
            let y = "0" + x;
            x = parseInt(y);
        }
        return x;
    }
    /*
    static round(n: Number, type: string) {
        // types can be undefined for normal, c for ceiling, and f for floor.
        // slice the integer from the decimals, figure out if decimal is bigger or smaller than 5, then make decimal 0, increasing the integer if decimal is bigger than 5.
        // or, loop through the number, adding each number to a variable, until it reaches a '.', then break from the loop, then loop again through the decimals.
        var integer = "";
        var decimals = "";
        var numbersArray = Array.from(n.toString()).map(Number);
        var decimalsArray;
        var decimalPlace;
        var output;

        for (let num in numbersArray) {
            if (Number.isNaN(numbersArray[num])) {
                decimalPlace = Number(num) + 1;
                break;
            }
            else {
                integer += `${numbersArray[num]}`;
            }
        }

        for (let num = decimalPlace; num < numbersArray.length; num++) {
            decimals += `${numbersArray[num]}`;
        }

        decimalsArray = Array.from(decimals.toString()).map(Number);

        return integer + " " + decimalPlace + " " + decimals;
    }*/
    /**
     * Evaluates n!
     *
     * @param { number } n
     *  Number to evaluate as a factorial.
     *
     * @return { number }
     *  Returns n factorial.
     */
    static factorial(n) {
        return n ? n * FMaths.factorial(n - 1) : 1;
    }
    /**
     * Evaluates n to see if it is a prime number.
     *
     * @param { number } n
     *  Number to check if prime.
     *
     * @return { boolean }
     *  Boolean
     */
    static checkPrime(n) {
        var s = true;
        if (n === 1) {
            s = true;
        }
        else if (n === 2) {
            s = false;
        }
        else {
            for (var i = 2; i <= Math.sqrt(n); i++) {
                if (n % i == 0) {
                    s = false;
                    break;
                }
            }
        }
        return s;
    }
    /**
     * Generates Pascal's Triangle to the n'th row.
     *
     * @param {number} n
     *  The number of rows with which to generate Pascal's Triangle.
     *
     * @return
     *  A nested array with rows of Pascal's Triangle up to the n'th row.
     */
    static pascal(n) {
        let result = [];
        result[0] = [1];
        result[1] = [1, 1];
        for (var r = 2; r <= n; r++) {
            result[r] = [1];
            for (var c = 1; c <= r - 1; c++) {
                result[r][c] = result[r - 1][c] + result[r - 1][c - 1];
                result[r].push(1);
            }
        }
        return result;
    }
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
    static nCr(n, r) {
        let output;
        if (r <= n) {
            output = this.pascal(n);
            return output[n][r];
        }
        else
            return -1;
    }
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
    // May have to attempt to overhaul the system with a different equation to allow for (xa + yb)^n
    // Start with overhauling the parameters, so that they are properties.
    static binomialTheorem(x, o, a, b, aconst, bconst) {
        var aexp = x;
        var bexp = 0;
        var result = "";
        if (!aconst || aconst === 0)
            aconst = 1;
        if (!bconst || bconst === 0)
            bconst = 1;
        if (!(o === "+" || o === "-"))
            throw "Invalid Operator"; // assure that the input operator is either "+" or "-".
        else if (!o)
            o = "+"; // assume the operator is "+" if no operator is given.
        // ONLY X
        if (((!a && !b) || (a === 'a' && b === 'b')) && aconst === 1 && bconst === 1) { // if a and b are both undefined, equal to 'a' and 'b'
            result += "1a^" + aexp + ` ${o} `;
            for (var i = 0; i <= x - 1; i++) {
                let r = i + 1;
                aexp--;
                bexp++;
                if (i < x - 1)
                    result += this.nCr(x, r) + `a^${aexp}b^${bexp} ${o} `;
                else
                    result += this.nCr(x, r) + `a^${aexp}b^${bexp}`;
            }
            return result;
        }
        // IF THERE ARE ANY CONSTANTS
        else if ((a === 'a' && b === 'b') && (aconst > 1 || bconst > 1)) {
            if (aconst > 0 && bconst > 0) {
                result += `${(aconst ** aexp) * (bconst ** bexp)}a^${aexp}b^${bexp} ${o} `;
                for (var i = 0; i <= x - 1; i++) {
                    let r = i + 1;
                    let t = this.nCr(x, r);
                    aexp--;
                    bexp++;
                    if (i < x - 1) {
                        result += `${t * (aconst ** aexp) * (bconst ** bexp)}a^${aexp}b^${bexp} ${o} `;
                    }
                    else {
                        result += `${t * (aconst ** aexp) * (bconst ** bexp)}a^${aexp}b^${bexp}`;
                    }
                }
                return result;
            }
        }
        // IF A IS AN INTEGER AND B == B OR UNDEFINED
        else if ((a && b === 'b') || (a !== 'a' && !b)) { // if a is present and b is undefined.
            // printing the first term manually ensures that it is always correct.
            // we can do this because the first constant in every expanded binomial is '1'.
            result += `${1 * a ** aexp} ${o} `;
            for (var i = 0; i <= x - 1; i++) {
                let r = i + 1; // ensure that the first term of Pascal's Triangle is skipped over.
                let t = this.nCr(x, r);
                aexp--;
                bexp++;
                if (i < x - 1) {
                    result += `${t * a ** aexp}b^${bexp} ${o} `;
                }
                else {
                    result += `${t * a ** aexp}b^${bexp}`;
                }
            }
            return result;
        }
        else if (a === 'a' && b) { // if b is present and a is undefined.
            result += `1a^${aexp} ${o} `;
            for (var i = 0; i <= x - 1; i++) {
                let r = i + 1;
                let t = this.nCr(x, r);
                aexp--;
                bexp++;
                if (i < x - 1) {
                    result += `${t * b ** bexp}a^${aexp} ${o} `;
                }
                else {
                    result += `${t * b ** bexp}a^${aexp}`;
                }
            }
            return result;
        }
        return "";
    } // End of BinomialTheorem();
    static findPrimeInPascal(n) {
        var Prime = [];
        var pascal = FMaths.pascal(n);
        for (var r in pascal) {
            for (var c in pascal[r]) {
                if (FMaths.checkPrime(pascal[r][c])) {
                    if (pascal[r][c] != 1) {
                        try {
                            Prime.push(pascal[r][c]);
                        }
                        catch {
                            break;
                        }
                    }
                }
                else
                    continue;
            }
        }
        Prime.filter(elem => elem != 0);
        var rootedPrime = Prime.filter(function (item, index) {
            return Prime.indexOf(item) >= index;
        });
        return rootedPrime.sort();
    }
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
    static discriminant(a, b, c) {
        var discriminant = b ** 2 - 4 * a * c;
        if (discriminant > 0) {
            return 2;
        }
        else if (discriminant == 0) {
            return 1;
        }
        else {
            return 0;
        }
    }
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
    static quadraticForm(a, b, c) {
        var negb = b - (b * 2);
        var discriminant = FMaths.discriminant(a, b, c);
        var output = [];
        var s1, s2;
        if (discriminant == 2) { // 2 real solutions
            s1 = (negb + Math.sqrt((b ** 2) - (4 * a * c))) / (2 * a);
            s2 = (negb - Math.sqrt((b ** 2) - (4 * a * c))) / (2 * a);
            output.push(s1);
            output.push(s2);
        }
        else if (discriminant == 1) { // 1 real solution
            s1 = negb / (2 * a);
            output.push(s1);
        }
        else if (discriminant == 0) { // no real solutions
            s1 = 0;
            output.push(s1);
        }
        else
            throw new Error("Discriminant Failed");
        return output;
    }
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
    static gcdEuclid(a, b) {
        var t;
        // This variable stores the previous iteration
        while (b !== 0) {
            t = b;
            b = a % b;
            a = t;
        }
        return a;
    }
    /**
     * Converts n degrees to radians.
     *
     * @param { number } n
     *  Angle in degrees.
     *
     * @return { number }
     *  Returns angle in radians.
     */
    static radians(n) {
        var output = Math.PI * n / 180;
        return output;
    }
    /**
     * Converts n radians to degrees.
     *
     * @param { number } n
     *  Angle in radians.
     *
     * @return { number }
     *  Returns angle in degrees.
     */
    static degrees(n) {
        var output = n / Math.PI * 180;
        return output;
    }
    static hPythagoras(a, b) {
        var c;
        var c2 = (a ** 2) + (b ** 2);
        c = Math.sqrt(c2);
        return c;
    }
    // try to join these.
    static sPythagoras(b, c) {
        var a;
        var a2 = (b ** 2) - (c ** 2);
        a = Math.sqrt(a2);
        return a;
    }
}
exports.FMaths = FMaths;
