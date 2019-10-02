export declare class FArray extends Array {
    constructor(...items: any[]);
    static readonly [Symbol.species]: ArrayConstructor;
    readonly last: any;
    readonly first: any;
    readonly emptied: boolean;
    uppercaseAtIndex(i: number): FArray | number;
    lowercaseAtIndex(i: number): FArray | number;
    edges(T: boolean): FArray;
    trim(T: boolean): FArray;
    region(s: number, e?: number, remove?: boolean): FArray;
}
