# [foxlib](./index.md)/FMaths

A general Node.js javascript library for plenty of useful math functions.

## Table of Contents

- [Usage](#usage)
- [Functions](#functions)
  - [Factorial(n)](#factorialn)
  - [CheckPrime(n)](#checkprimen)
  - [Pascal(n)](#pascaln)
  - [nCr(n, r)](#nCrn-r)
  - [BinomialTheorem(n, o, a, b, x, y)](#binomialtheoremn-o-a-b-x-y)
- [Contributors](#contributors)

## Usage

Using npm:
```
npm i foxlib
```

In Node.js:
```javascript
var flib = require('foxlib');
```

A quick example of using a function:
```javascript
console.log(flib.CheckPrime(7));
// logs "true"
```

## Functions

This is a list of functions written into the FMaths library.

### Factorial(n)

Evaluates `n` factorial (n!).  
Returns `int`.

#### Usage

Example:
```javascript
console.log(flib.Factorial(12));
// logs "479001600"
```

### CheckPrime(n)

Checks if `n` is a prime number.  
Returns `bool`.

#### Usage

Example:
```javascript
console.log(flib.CheckPrime(7));
// logs "true"
console.log(flib.CheckPrime(6));
// logs "false"
```

### Pascal(n)

Generates [Pascal's Triangle](https://en.wikipedia.org/wiki/Pascal%27s_triangle) up to the `n`'th row.  
Returns `array[][]`.

#### Usage

Example:
```javascript
console.log(fm.Pascal(4));
// logs "[ [ 1 ], [ 1, 1 ], [ 1, 2, 1 ], [ 1, 3, 3, 1 ], [ 1, 4, 6, 4, 1 ] ]"
```

### nCr(n, r)

Finds the `r`'th `integer` in row `n` of Pascal's Triangle.  
Returns `int`.

#### Usage

Example:
```javascript
console.log(fm.nCr(4, 2))
// logs "6"
// healthy reminder that arrays start at [0], not [1].
```

### BinomialTheorem(n, o, a, b, x, y)

Expands a binomial of the form `(xa +/- yb)^n`.  
Returns `string`.

#### Parameters
- `n` - (`int`, required) - Exponent.  
- `o` - (`string`, optional, defaults to `"+"`) - Operator, can only be `"+"` or `"-"`.  
- `a` - (`int` or `string`, optional) - First variable, can be `undefined`, or assigned to `"a"` or an `int`.  
- `b` - (`int` or `string`, optional) - Second variable, can be `undefined`, or assigned to `"b"` or an `int`.  
- `x` - (`int`, optional, defaults to `1`) - Constant of `a`.  
- `y` - (`int`, optional, defaults to `1`) - Constant of `b`.  

#### Usage

Example:
```javascript
// expand (a+b)^4
console.log(fm.BinomialTheorem(4)); 
// the same as above
console.log(fm.BinomialTheorem(4, "+")); 
// both log "1a^4 + 4a^3b^1 + 6a^2b^2 + 4a^1b^3 + 1a^0b^4"

// expand (2+b)^9
console.log(fm.BinomialTheorem(3, "+", 2));
// expand (a+2)^9
console.log(fm.BinomialTheorem(3, "+", 'a', 2));
// logs, respectively
// "8 + 12b^1 + 6b^2 + 1b^3"
// "1a^3 + 6a^2 + 12a^1 + 8a^0"

// expand (2a+b)^3
console.log(fm.BinomialTheorem(3, "+", 'a', 'b', 2));
// logs "8a^3b^0 + 12a^2b^1 + 6a^1b^2 + 1a^0b^3"

// expand (a+2b)^4
console.log(fm.BinomialTheorem(4, "+", 'a', 'b', 1, 2));
// logs "1a^4b^0 + 8a^3b^1 + 24a^2b^2 + 32a^1b^3 + 16a^0b^4"
```

## Contributors

**Trev Fox (VoxelMC)**