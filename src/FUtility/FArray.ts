export class FArray extends Array {
    constructor(...items: any[]) {
        super(...items);
    }

    static get [Symbol.species]() {
        return Array;
    }

    // Gets last element
    get last() {
        return this.emptied ? null : this[this.length - 1];
    }

    // Gets first element
    get first() {
        return this.emptied ? null : this[0];
    }

    // Is the array empty?
    get emptied() {
        return this[0] === undefined;
    }

    // Make an element in FArray at index i Majescule
    uppercaseAtIndex(i: number): FArray | number {
        let s = this[i];
        if (typeof s !== "string") return -1;
        this.splice(i, 1, s.toUpperCase());
        return this;
    }

    // Make an element in FArray at index i Miniscule
    lowercaseAtIndex(i: number): FArray | number {
        let s = this[i];
        if (typeof s !== "string") return -1;
        this.splice(i, 1, s.toLowerCase());
        return this;
    }

    // Removes then Returns first and last elements from array
    edges(T: boolean): FArray {
        let out = new FArray();
        out.push(this.splice(0, 1).toString());
        out.push(this.pop());
        if (T === true) return out;
        else return this;
    }

    // Removes then Returns the inside of array
    trim(T: boolean): FArray {
        let out = new FArray();
        this.pop();
        this.splice(0, 1);
        out.push(this);
        if (T === true) return out;
        else return this;
    }

    // splice(start, deleteCount) {

    // }

    // Gets elements from index s to index e
    region(s: number, e = this.length - 1, remove = true): FArray {
        if (e < s || e >= this.length || s >= this.length) return this;
        let out = new FArray();
        let within;
        for (let i in this) {
            within = s <= i && i <= e;
            if (within && !remove) out.push(this[i]);
            else if (remove) {
                let tempArr = this.splice(s, e - s + 1);
                for (let j of tempArr) out.push(j)
                break;
            }
            if (i === e) break;
        }
        return out;
    }
}