module.exports = class FLogger {
    /**
     * @constructor 
     * @param { { writeToText: Boolean, timestamps: Boolean, path: String, color: String, logWrite: Boolean } } options 
     *  'color' can be: 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', or 'white'. Defaults to 'white'.
     * */
    constructor(options = { writeToText, timestamps, path, color, logWrite, warnings }) {
        /**
         * Options:
         * Write to a .txt file.
         * timestamps.
         * Folder Path for log files.
         * Log message color
         * Option to log Write();
         * */
        const fs = require('fs');
        const FMaths = require('../FMaths/FMaths.js');
        const fm = new FMaths();

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
            const d = new Date();
            this.fileName = `${this.path}${fm.addZero(d.getFullYear(), 2)}-` +
            `${fm.addZero(d.getMonth(), 2)}-${fm.addZero(d.getDate(), 2)}_` +
            `${fm.addZero(d.getHours(), 2)}.${fm.addZero(d.getMinutes(), 2)}-` +
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

    timestamp(time = new Date()) {
        const FMaths = require('../FMaths/FMaths.js');
        const fm = new FMaths();
        var output = `[${fm.addZero(time.getHours(), 2)}:` +
        `${fm.addZero(time.getMinutes(), 2)}:` +
        `${fm.addZero(time.getSeconds(), 2)}] `;
        return output;
    }
    
    write(str) {
        if (this.writeToText) {
            if (this.timestamps) str = this.timestamp() + str;
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
                    console.log(`\x1b[93m\u2588\u2588\u2588 ${this.timestamp()}[WRN] > ` +
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
        if (this.timestamps) this.write(str.slice(20));
        else this.write(str.slice(9));
        str += `\x1b[0m`;
        console.log(str);
    }

    log(type = { property, filePath, bounds }, str, highlight) {
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
            output += this.timestamp();
        }
        output += `[LOG] > `;

        if (property) {
            this._propLog(Object.keys(property), output, str);
        }
        else if (filePath) {
            this._pathLog(Object.keys(property), output, str);
        }
        else if (bounds) {
            this._boundsLog(Object.keys(property), output, str);
        }
        else {
            this._undefinedLog(output);
        }
    }
    
    logError(type = { property: {}, filePath, bounds }, str, highlight) {
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
        if (str === false) { str = "low"; } else if (str === true) { str = "high"; }
        
        if (this.timestamps) {
            output += this.timestamp();
        }
        output += `[ERR] > `;

        if (typeof property === "string") {
            this._propLog(Object.keys(property), output, str, "err");
        }
        if (typeof filePath === "string") {
            this._pathLog(Object.keys(property), output, str, "err");
        }
        if (typeof bounds === "string") { 
            this._boundsLog(Object.keys(property), output, str, "err");
        }
        else { 
            output += `Error type not specified.`;
            this.___internalWrite(output);
        }
    }
    
    seperator(str) {
        var output = "\x1b[96m\u2588\u2588\u2588 ";
        if (!str) str = "SEPERATOR";
        output += this.timestamp()
        output += `[SEP] \u2588 ###### ${str.toUpperCase()} ###### \u2588`;
        this.___internalWrite(output);
    }

    // ##### LOGTYPES ##### \\

    _propLog(tobj, input, str, type) {
        // if (typeof type === "number") { throw new Error("\x1b[31mProperty: property of logError(type, str) must be a string.\x1b[0m"); } PROBABLY DONT NEED THIS

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
            throw new Error(`\x1b[31mProperty: type of _propLog(tobj, input, str, type) must be undefined, "change", "err", or "warn".\x1b[0m`);
        }
        var output = input;

        this.___internalWrite(output);
    }

    _pathLog(tobj, input, str, type) {
        // if (typeof type === "number") { throw new Error("\x1b[31mProperty: filePath of logError(type, str) must be a string or variable.\x1b[0m"); } AGAIN PROB DONT NEED.

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
            throw new Error(`\x1b[31mProperty: type of _pathLog(tobj, input, str, type) must be undefined, "change", "err", or "warn".\x1b[0m`);
        }
        var output = input;

        this.___internalWrite(output);
    }

    _boundsLog(tobj, input, str, type) {
        // if (typeof type === "number") { throw new Error("\x1b[31mProperty: bounds of logError(type, str) must be a string.\x1b[0m"); }

        if (typeof type === "undefined") {
            input += `Bounds: ${tobj} is within ${str}.`;
        }
        else if (type === "change") {
            input += `Bounds: ${tobj} has been changed to ${str}.`;
        }
        else if (type === "err") {
            input += `Bounds: ${tobj} is too ${str}.`;
        }
        else if (type === "warn") {
            input += `Bounds: ${tobj} is too ${str}.`;
        }
        else {
            throw new Error(`\x1b[31mProperty: type of _boundsLog(tobj, input, str, type) must be undefined, "change", "err", or "warn".\x1b[0m`);
        }
        var output = input;

        this.___internalWrite(output);
    }

    _undefinedLog(str, input, type) {
        if (typeof type === "undefined") {
            input += `UndefinedLog: ${str}`;
        }
        else if (type === "change") {
            input += `UndefinedLog: (CHANGED) ${str}`;
        }
        else if (type === "err") {
            input += `UndefinedLog: (ERROR) ${str}`;
        }
        else if (type === "warn") {
            input += `UndefinedLog: (WARNING) ${str}`;
        }
        else {
            throw new Error(`\x1b[31mProperty: type of _undefinedLog(input, str, type) must be undefined, "change", "err", or "warn".\x1b[0m`);
        }
        var output = input;

        this.___internalWrite(output);
    }
}