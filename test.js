'use strict';

const FMaths = require('./FMaths');
const fm = new FMaths();
const FLogger = require('./FLogger');
const fl = new FLogger();

console.log('Hello world');
console.log(fm.Factorial(12)); // test Factorial
console.log(fm.CheckPrime(7) + " " + fm.CheckPrime(6)); // test Prime Checker
console.log(fm.Pascal(9));  // test Pascal's Triangle
console.log(fm.nCr(9, 0));  // test nCr
console.log(fm.nCr(9, 10)); // force nCr error

fl.Seperator("Only exponent given")
console.log(fm.BinomialTheorem(9)); // expand (a+b)^9
console.log(fm.BinomialTheorem(3)); // expand (a+b)^3

fl.Seperator("(2+b)^9 and (a+2^9)");
console.log(fm.BinomialTheorem(3, "+", 2)) // expand (2+b)^9
console.log(fm.BinomialTheorem(3, "+", 'a', 2)) // expand (a+2)^9

fl.Seperator("(2+b)^9 and (a+2^9)");
console.log(fm.BinomialTheorem(3, "+", 2, 'b')) // expand (2+b)^9
console.log(fm.BinomialTheorem(3, "+", 'a', 2)) // expand (a+2)^9

fl.Seperator("(2a+b)^3 in 2 ways.");
console.log(fm.BinomialTheorem(3, "+", 'a', 'b', 2));
console.log(fm.BinomialTheorem(3, "+", 'a', 'b', 2, 0));

fl.Seperator("(a+2b)^4 in 2 ways");
console.log(fm.BinomialTheorem(4, "+", 'a', 'b', 0, 2));
console.log(fm.BinomialTheorem(4, "+", 'a', 'b', 1, 2));