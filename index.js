'use strict';

const FMaths = require('./FMaths');
const fm = new FMaths();

console.log('Hello world');
console.log(fm.Factorial(12)); // test Factorial
console.log(fm.CheckPrime(7) + " " + fm.CheckPrime(6)); // test Prime Checker
console.log(fm.Pascal(9));  // test Pascal's Triangle
console.log(fm.nCr(9, 0));  // test nCr
console.log(fm.nCr(9, 10)); // force nCr error
console.log(fm.BinomialExpansion(4)); // expand (a+b)^4

module.exports = {
    FMaths : require('./FMaths')
}