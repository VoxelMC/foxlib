/**
 * @file 
 *  foxlib Maths Library
 *  (In the future each of these methods will be seperated into different source files.)
 */
module.exports = class FMaths {
    constructor(n) {
        this.n = n;
    }

    /**
     * Evaluates n!
     * 
     * @param { number } n 
     *  Number to evaluate as a factorial.
     * 
     * @return { number }
     *  Returns n factorial.
     */
    Factorial(n) {
        return n ? n * this.Factorial(n - 1) : 1;
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
    CheckPrime(n) { // make a mersenne prime checker, as well.
        if (n === 1) {
            return false;
        }
        else if (n === 2) {
            return true;
        }
        else {
            for (var i = 2; i < n; i++) {
                if (n % i !== 0) return true;
                else return false;
            }
        }
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
    Pascal(n) {
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
     * @return { number }
     *  Returns term in column r of row n.
     */
    nCr(n, r) {
        let output;
        if (r <= n) {
            output = this.Pascal(n);
            return output[n][r];
        }
        else return "'r' cannot be an integer higher than 'n'.";
    }

    /**
     * Form: (a [+|-] b)^x
     * @param { number } x
     *  Exponent x 
     * @param { string } [o="+"]
     *  Can be '+' or '-'. 
     * @param { number } [a]
     *  Variable a
     * @param { number } [b] 
     *  Variable b
     * 
     * @return { string }
     *  Returns a string of the Expanded Binomial.
     */
    // May have to attempt to overhaul the system with a different equation to allow for (xa + yb)^n
    // Start with overhauling the parameters, so that they are properties.
    BinomialTheorem(x, o, a, b, aconst, bconst) {
        var aexp = x;
        var bexp = 0;
        var result = "";

        if (!aconst || aconst === 0) aconst = 1;
        if (!bconst || bconst === 0) bconst = 1;

        if (!o === "+" || !o === "-") return console.log("invalid operator"); // assure that the input operator is either "+" or "-".
        else if (!o) o = "+"; // assume the operator is "+" if no operator is given.

        // ONLY X
        if (((!a && !b) || (a === 'a' && b === 'b')) && aconst === 1 && bconst === 1) { // if a and b are both undefined, equal to 'a' and 'b'
            result += "1a^" + aexp + ` ${o} `;
            for (var i = 0; i <= x - 1; i++) {
                let r = i + 1;

                aexp--; bexp++;

                if (i < x - 1) result += this.nCr(x, r) + `a^${aexp}b^${bexp} ${o} `;
                else result += this.nCr(x, r) + `a^${aexp}b^${bexp}`;
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
    
                    aexp--; bexp++;
    
                    if (i < x - 1) {
                        result += `${t * (aconst ** aexp) * (bconst ** bexp)}a^${aexp}b^${bexp} ${o} `;
                    }
                    else {
                        result += `${t * (aconst ** aexp) * (bconst ** bexp)}a^${aexp}b^${bexp}`;
                    }
                }
                return result;
            }
            
            /* THIS IS DEPRECATED, BUT KEEP IT FOR EXAMPLE OF LEARNING.
            else if (aconst < 0 && bconst === 0) {
                result += `${(aconst ** aexp) * (bconst ** bexp)}a^${aexp}b^${bexp} ${o} `;
                for (var i = 0; i <= x - 1; i++) {
                    let r = i + 1;
                    let t = this.nCr(x, r);
    
                    aexp--; bexp++;
    
                    if (i < x - 1) {
                        result += `${t * (aconst ** aexp)}a^${aexp}b^${bexp} ${o} `;
                    }
                    else {
                        result += `${t * (aconst ** aexp)}a^${aexp}b^${bexp}`;
                    }
                }
            }

            else if (bconst < 0 && aconst === 0) {
                result += `${(aconst ** aexp) * (bconst ** bexp)}a^${aexp}b^${bexp} ${o} `;
                for (var i = 0; i <= x - 1; i++) {
                    let r = i + 1;
                    let t = this.nCr(x, r);
    
                    aexp--; bexp++;
    
                    if (i < x - 1) {
                        result += `${t * (bconst ** bexp)}a^${aexp}b^${bexp} ${o} `;
                    }
                    else {
                        result += `${t * (bconst ** bexp)}a^${aexp}b^${bexp}`;
                    }
                }
            } */
        }

        // IF A IS AN INTEGER AND B == B OR UNDEFINED
        else if ((a && b === 'b') || (a !== 'a' && !b)) { // if a is present and b is undefined.
            // printing the first term manually ensures that it is always correct.
            // we can do this because the first constant in every expanded binomial is '1'.
            result += `${1 * a ** aexp} ${o} `;

            for (var i = 0; i <= x - 1; i++) {
                let r = i + 1; // ensure that the first term of Pascal's Triangle is skipped over.
                let t = this.nCr(x, r);

                aexp--; bexp++;

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

                aexp--; bexp++;

                if (i < x - 1) {
                    result += `${t * b ** bexp}a^${aexp} ${o} `;
                }
                else {
                    result += `${t * b ** bexp}a^${aexp}`;
                }
            }
            return result;
        }
    }
}