'use strict';

const FMaths = require('./FMaths');
const fm = new FMaths();
const FLogger = require('./FLogger');
const fl = new FLogger({
    writeToText: false,
    timestamps: true,
    path: "./Logs",
    logWrite: false,
    warnings: false,
});

/*console.log('Hello world');
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
console.log(fm.BinomialTheorem(4, "+", 'a', 'b', 1, 2));*/

// fl.Seperator("Rounder");
// console.log(fm.Round(10902.3323));

// var botMessage = [ "Beep Boop", "Boop Beep", "Beep Beep Beep", "beeb", "*beep*", ]
// var random = Math.floor(Math.random[botMessage.length]);
// var sentMessage = "";

// sentMessage += botMessage[random];

// console.log(sentMessage);

// async function exponentiatetwo() {
//     var mseconds = 0;

//     var yeet = setInterval(() => {
//         mseconds++;
//     }, 1);
    
//     var v1 = new Date().getTime();

//     var exp = await (2 ** 2000);
    
//     var v2 = new Date().getTime();
//     var mseconds = v2 - v1;
//     console.log(exp);
//     console.log(mseconds + " seconds to process.");
// }

// exponentiatetwo();


var v1 = new Date().getTime();

fl.Write("hello there");
fl.Write("hello there again");

// setTimeout(() => {
//     fl.Write("after 3 seconds");
// }, 3000)

// fl.LogError({ filePath: path })
// fl.Log({}, "test");
fl.Seperator();
var testvar = "abcdefg";
fl.Log({ property: {testvar} }, testvar, true);
fl.LogError({ property: {testvar} }, testvar, true);
// fl.Log({ filePath: "path variable"}, "Again");
fl.Seperator("test separator");


var v2 = new Date().getTime();
var mseconds = v2 - v1;

console.log(mseconds + " ms to process.");
