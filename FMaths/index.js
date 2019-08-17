module.exports = class FMaths {
    constructor(n) {
        this.n = n;
    }

    /**
     * Returns an integer of n!.
     * @param { Integer to evaluate as a factorial} n 
     */
    Factorial(n) {
        return n ? n * this.Factorial(n - 1) : 1;
    }

    /**
     * Returns a boolean; true if n is prime.
     * @param { Integer to check } n 
     */
    CheckPrime(n) {
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
     * Returns a nested array with rows of Pascal's Triangle.
     * @param { Generates Pascal's Triangle up to the n'th row } n 
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
     * Returns an evaluation of 'n Choose r'.
     * @param { Generates Pascal's Triangle up to the n'th row } n 
     * @param { Finds the number at row r} r 
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
     * Form: (a [+|-] b)^n
     * Returns a string of the Expanded Binomial.
     * @param { Constant A } a 
     * @param { Constant B } b 
     * @param { Exponent (a +|- b) } x 
     * @param { Operator +|- } o 
     */
    BinomialExpansion(x, o, a, b) {
        var aexp = x;
        var bexp = 0;
        var result = "";

        if (!o === "+" || !o === "-") return console.log("invalid operator");
        else if (!o) o = "+";

        if (!a && !b) {
            result += "1a^" + aexp + ` ${o} `;
            for (var i = 0; i <= x - 1; i++) {
                let r = i + 1;
                aexp--;
                bexp++;
                if (i < x - 1) result += this.nCr(x, r) + `a^${aexp}` + `b^${bexp}` + ` ${o} `;
                else result += this.nCr(x, r) + `a^${aexp}` + `b^${bexp}`;
            }
            return result;
        }
    }
}