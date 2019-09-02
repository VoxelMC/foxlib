/**
 * Discriminant:
 * 
 * b**2 - 4*a*c
 * 
 * @param {*} a 
 * @param {*} b 
 * @param {*} c 
 */
function Discriminant(a, b, c) {
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
 * x = (-b +/- sqrt(b**2 - 4*a*c)) / (2*a)
 * 
 */
function QuadraticForm(a, b, c) {
    var negb = b - (b * 2);
    var discriminant = Discriminant(a, b, c);
    var output = [];
    var s1, s2;

    if (discriminant == 2) {
        s1 = (negb + Math.sqrt((b ** 2) - (4 * a * c))) / (2 * a);
        s2 = (negb - Math.sqrt((b ** 2) - (4 * a * c))) / (2 * a);
        output.push(s1);
        output.push(s2);
    }
    else if (discriminant == 1) {
        s1 = negb / (2 * a);
        output.push(s1);
    }
    else if (discriminant == 0) {
        s1 = "Not Real";
        output.push(s1);
    }
    else throw new Error("Discriminant Failed");
    
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
     *  First Number 
     * @param { number } b 
     *  Second Number
     * 
     * @return { number }
     *  Returns the Greates Common Denominator of a and b.
     */
function gcdEuclid(a, b) {
    var t;
    // This variable stores the previous iteration

    while (b !== 0) {
        t = b;
        b = a % b;
        a = t;
    }

    return a;
}