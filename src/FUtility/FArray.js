module.exports = class FArray extends Array {
    constructor(...items) {
        super(...items);
    }

    static get [Symbol.species]() {
        return Array;
    }

    static get [Symbol.iterator](){
        let step = 0;
        const iterator = {
            next() {
                step++;
                if (step !== this.length - 1) {
                    return {
                        value: this[step],
                        done: false
                    }
                }
                else if (step === this.length) {
                    return {
                        value: undefined,
                        done: true
                    }
                }
            }
        }
        return iterator;
    }

    // Create FArray from native array - Array class already got this covered, apparently. Delete later.
    // static from(source) {
    //     let out = new FArray()
    //     for (let e of source) {
    //         out.push(e);
    //     }
    //     return out;
    // }


    // Gets last element
    get last() {
        return this.empty ? null : this[this.length - 1];
    }

    get first() {
        return this.empty ? null : this[0];
    }

    get empty() {
        return this[0] === undefined;
    }

    // Make an element in FArray at index i Majescule
    uppercaseAtIndex(i) {
        let s = this[i];
        if (typeof s !== "string") return -1;
        this.splice(i, 1, s.toUpperCase());
        return this;
    }

    // Make an element in FArray at index i Miniscule
    lowercaseAtIndex(i) {
        let s = this[i];
        if (typeof s !== "string") return -1;
        this.splice(i, 1, s.toLowerCase());
        return this;
    }

    // Removes then Returns first and last elements from array
    edges(T) {
        let out = [];
        out.push(this.splice(0, 1).toString());
        out.push(this.pop());
        if (T === true) return out;
        else return this;
    }

    // Removes then Returns the inside of array
    trim(T) {
        let out = [];
        this.pop();
        this.splice(0, 1);
        out.push(this);
        if (T === true) return out;
        else return this;
    }
}