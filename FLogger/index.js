﻿module.exports = class FLogger {
    /**
     * @constructor 
     * @param { { writeToText: Boolean, timestamps: Boolean, path: String, color: String, logWrite: Boolean } } options 
     *  'color' can be: 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', or 'white'. Defaults to 'white'.
     * */
    constructor(options = { writeToText, timestamps, path, color, logWrite, warnings }) {
        /**
         * Options:
         * Write to a .txt file.
         * Timestamps.
         * Folder Path for log files.
         * Log message color
         * Option to log Write();
         * */
        const fs = require('fs');
        const FMaths = require('../FMaths');
        this.FMaths = new FMaths();

        // Defaults
        if (typeof options.writeToText !== "boolean") throw new Error("Property: writeToText must be present and a boolean.");
        this.writeToText = options.writeToText;
        if (typeof options.timestamps !== "boolean") options.timestamps = false;
        this.timestamps = options.timestamps;
        if (typeof options.logWrite !== "boolean") options.logWrite = false;
        this.logWrite = options.logWrite;
        if (typeof options.path !== "string") options.path = "./";
        this.path = options.path.toString();
        if (!this.path.endsWith("/")) this.path += "/" ;
        if (!this.color) this.color = 'white';
        switch (this.color) {
            case 'red'     :  this.color = '\x1b[31m'; break;
            case 'green'   :  this.color = '\x1b[32m'; break;
            case 'yellow'  :  this.color = '\x1b[93m'; break;
            case 'blue'    :  this.color = '\x1b[34m'; break;
            case 'magenta' :  this.color = '\x1b[35m'; break;
            case 'cyan'    :  this.color = '\x1b[36m'; break;
            case 'white'   :  this.color = '\x1b[97m'; break;
        }
        if (options.warnings === false) this.warnings = false;
        else this.warnings = true;
        
        // If writeToText is true, create an empty .txt file.
        if (this.writeToText) {
            this.d = new Date();
            this.fileName = `${this.path}${this.FMaths.addZero(this.d.getFullYear(), 2)}-` +
            `${this.FMaths.addZero(this.d.getMonth(), 2)}-${this.FMaths.addZero(this.d.getDate(), 2)}_` +
            `${this.FMaths.addZero(this.d.getHours(), 2)}.${this.FMaths.addZero(this.d.getMinutes(), 2)}-` +
            `LOG.txt`;
      
            // Write data in 'Output.txt' . 
            fs.writeFile(`${this.fileName}`, "", (err) => {
                if (err) throw err; 
            });

            this.stream = fs.createWriteStream(`${this.fileName}`, {
                flags: 'r+'
            });
        }
    }

    Timestamp(time = new Date()) {
        var output = `[${this.FMaths.addZero(time.getHours(), 2)}:` +
        `${this.FMaths.addZero(time.getMinutes(), 2)}:` +
        `${this.FMaths.addZero(time.getSeconds(), 2)}] `;
        return output;
    }
    
    Write(str) {
        var d = new Date();
        if (this.writeToText) {
            if (this.timestamps) str = this.Timestamp() + str;
            this.stream.write(`${str}\n`, (err) => {
                if (err) console.log(err.message);
                else {
                    if (this.logWrite) console.log(`Written ${str}`);
                }
            });
        }
        else {
            if (this.warnings) {
                if (this.timestamps) {
                    console.log(`\x1b[93m\u2588\u2588\u2588 ${this.Timestamp()}[WRN] > ` +
                    `Property: writeToText must be set to true.\x1b[0m`);
                }
                else console.log(`\x1b[93m\u2588\u2588\u2588 [WRN] > Property: writeToText must be set to true. Cannot write to ${this.fileName}.\x1b[0m`);
            }
        }
    }

     /**
      * @private
      * This method is not meant for use, as it may cause you some unexpected problems. Use Write(str) instead.
      */
    ___internalWrite(str) {
        if (this.timestamps) this.Write(str.slice(20));
        else this.Write(str.slice(9));
        str += `\x1b[0m`;
        console.log(str);
    }

    Log(type = { property, filePath, bounds }, str, highlight) {
        var property, filePath, bounds; 
        var output = ""; 

        if (highlight) { output += "\x1b[35m" } // Apply colours.
        else { output += this.color; }
        output += "\u2588\u2588\u2588 ";

        if (typeof type.property === "undefined") property = false; // Defaults to false if undefined.
        else property = type.property;
        if (typeof type.filePath === "undefined") filePath = false;
        else filePath = type.filePath;
        if (typeof type.bounds === "undefined") bounds = false;
        else bounds = type.bounds;

        if (this.timestamps) {
            output += this.Timestamp();
        }
        output += `[LOG] > `;

        if (property) {
            this._PropLog(Object.keys(property), output, str);
        }
        else if (filePath) {
            this._PathLog(Object.keys(property), output, str);
        }
        else if (bounds) {
            this._BoundsLog(Object.keys(property), output, str);
        }
        else {
            this._UndefinedLog(output);
        }
    }
    
    LogError(type = { property: {}, filePath, bounds }, str, highlight) {
        var property, filePath, bounds; 
        var output = ""; 

        if (highlight) output += "\x1b[30;41m";
        else output += "\x1b[31m";
        output += "\u2588\u2588\u2588 ";

        if (typeof type.property === "undefined") property = false;
        else property = type.property;
        if (typeof type.filePath === "undefined") filePath = false;
        else filePath = type.filePath;
        if (typeof type.bounds === "undefined") bounds = false;
        else bounds = type.bounds;
        if (str === 0) { str = "low"; } else if (str === 1) { str = "high"; }
        
        if (this.timestamps) {
            output += this.Timestamp();
        }
        output += `[ERR] > `;

        if (typeof property === "string") {
            this._PropLog(Object.keys(property), output, str, "err");
        }
        if (typeof filePath === "string") {
            this._PathLog(Object.keys(property), output, str, "err");
        }
        if (typeof bounds === "string") { 
            this._BoundsLog(Object.keys(property), output, str, "err");
        }
        else { 
            output += `Error type not specified.`;
            this.___internalWrite(output);
        }
    }
    
    Seperator(str) {
        var output = "\x1b[96m\u2588\u2588\u2588 ";
        if (!str) str = "SEPERATOR";
        if (this.timestamps) {
            var d = new Date();
            output += `[${this.FMaths.addZero(d.getHours(), 2)}:` +
            `${this.FMaths.addZero(d.getMinutes(), 2)}:` +
            `${this.FMaths.addZero(d.getSeconds(), 2)}] `;
        }
        output += `[SEP] \u2588 ###### ${str.toUpperCase()} ###### \u2588`;
        this.___internalWrite(output);
    }

    // ##### LOGTYPES ##### \\

    _PropLog(tobj, input, str, type) {
        // if (typeof type === "number") { throw new Error("\x1b[31mProperty: property of LogError(type, str) must be a string.\x1b[0m"); } PROBABLY DONT NEED THIS

        if (typeof type === "undefined") {
            input += `Property: ${tobj} is "${str}": (${typeof str}).`;
        }
        else if (type === "change") {
            input += `Property: ${tobj} has changed to "${str}": (${typeof str}).`;
        }
        else if (type === "err") {
            input += `Property: ${tobj} must be ${str}.`;
        }
        else if (type === "warn") {
            input += `Property: ${tobj} should be ${str}, but the error has been handled. (${typeof str}).`;
        }
        else {
            throw new Error(`\x1b[31mProperty: type of _PropLog(tobj, input, str, type) must be undefined, "change", "err", or "warn".\x1b[0m`);
        }
        var output = input;

        this.___internalWrite(output);
    }

    _PathLog(tobj, input, str, type) {
        // if (typeof type === "number") { throw new Error("\x1b[31mProperty: filePath of LogError(type, str) must be a string or variable.\x1b[0m"); } AGAIN PROB DONT NEED.

        if (typeof type === "undefined") {
            input += `File Path: ${tobj} is ${str}. (${typeof str}).`;
        }
        else if (type === "change") {
            input += `File Path: ${tobj} has been changed to ${str} (${typeof str}).`;
        }
        else if (type === "err") {
            input += `File Path: ${tobj} (${str}) does not exist. (${typeof str}).`;
        }
        else if (type === "warn") {
            input += `File Path: ${tobj} (${str}) does not exist, but the error has been handled. (${typeof str}).`;
        }
        else {
            throw new Error(`\x1b[31mProperty: type of _PathLog(tobj, input, str, type) must be undefined, "change", "err", or "warn".\x1b[0m`);
        }
        var output = input;

        this.___internalWrite(output);
    }

    _BoundsLog(tobj, input, str, type) {
        // if (typeof type === "number") { throw new Error("\x1b[31mProperty: bounds of LogError(type, str) must be a string.\x1b[0m"); }

        if (typeof type === "undefined") {
            // SUCCESS
        }
        else if (type === "change") {
            // CHANGED
        }
        else if (type === "err") {
            // ERROR
        }
        else if (type === "warn") {
            // WARNING
        }
        else {
            // CATCH ANY INVALID ARGUMENT
        }
        var output = input;

        this.___internalWrite(output);
    }

    _UndefinedLog(str, input, type) {
        if (typeof type === "undefined") {
            // SUCCESS
        }
        else if (type === "change") {
            // CHANGED
        }
        else if (type === "err") {
            // ERROR
        }
        else if (type === "warn") {
            // WARNING
        }
        else {
            // CATCH ANY INVALID ARGUMENT
        }
        var output = input;

        this.___internalWrite(output);
    }
}