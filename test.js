'use strict';

const { FMaths } = require('./index.js');
const fm = new FMaths();
const { FLogger } = require('./index.js');
const fl = new FLogger({
    writeToText: false,
    timestamps: true,
    path: "./src/Logs",
    logWrite: false,
    warnings: false,
});

function Function(param) {
    console.log("heeel yea");
    console.log(param);
}
const { FConsoleInput } = require('./index.js');
const fci = new FConsoleInput({
    commands: {
        help: () => {
            var testv = [];
            testv.push("first");
            console.log(testv);
        },
        testcmd: (arg1, arg2) => {
            console.log(arg1);
            console.log(arg2 + " ARGS");
        },
        testFuncion: (param) => {
            testFunction(param)
            .then(a => console.log(a))
            .catch(a => console.log(a))
            .finally(() => console.log("This is in the finally."));
        },
        add: (n1, n2) => {
            console.log(Add(n1, n2));
        },
        data: (type, n1, n2) => {
            var output;
            if (type === "change") {
                output = n2 - n1;
            }
            else if (type === "percent") {
                output = (n2 - n1) / n1 * 100;
            }
            
            console.log(output);
        },
        sub: (n1, n2) => {
            console.log(n1 - n2);
        }
    },
    exit: { 
        command: "exitcommands",
        exitFunction: (param) => {
            console.log(param);
        }
    },
});


fci.startRead();

function Add(n1, n2) {
    return Number(n1) + Number(n2);
}

console.log(Add(5, 10));


// fci.NewCommand("testCommand", () => {
//     console.log("this is in the callback function");
// });

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

//////////////////////////
var v1 = new Date().getTime();

fl.write("hello there");
fl.write("hello there again");

// setTimeout(() => {
//     fl.Write("after 3 seconds");
// }, 3000);

// fl.LogError({ filePath: path });
// fl.Log({}, "test");
fl.seperator();
var testvar = "abcdefg";
fl.log({ property: {testvar} }, testvar, true);
fl.logError({ property: {testvar} }, testvar, true);
// fl.Log({ filePath: "path variable"}, "Again");
fl.seperator("test separator");

var v2 = new Date().getTime();
var mseconds = v2 - v1;

console.log(mseconds + " ms to process.");

function testFunction(param) {
    return new Promise((resolve, reject) => {
        if (param == 1) {
            resolve([true, param, "stringsucceed"]);
        }
        if (param > 1) {
            resolve([true, param, 'stringgreater']);
        }
        if (param < 1) {
            reject([false, param, 'string lesser']);
        }
        if (!param) {
            reject("there is no parameter to reject.");
        }
    });
}

const { FArray } = require('./index.js');

let farray = new FArray('test', true, 'test2', 4, 1, 2, 3, 4);
console.log(farray.uppercaseAtIndex(0));
console.log(farray.uppercaseAtIndex(1));
console.log(farray.uppercaseAtIndex(2));
console.log(farray.lowercaseAtIndex(0));
const mapper = new Map([['1', 'a'], ['2', 'b']]);
// let another = FArray.from(mapper.values());
// let another2 = Array.from(mapper.values());
let another = FArray.from("mapper.values()");
let another2 = Array.from("mapper.values()");
console.log(another, "\n", another2);
console.log(farray.edges());
console.log(farray.trim());
farray.push("test again"); // Testing extension of array class
console.log(farray.empty);
for (let item of farray) { // Shows iterable
    console.log(item);
}

const foxlib = require('./index.js');

console.log(";" === ";d");