module.exports = class FLogger {
    /**
     * @constructor 
     * @param { { writeToText: Boolean, timestamps: Boolean, path: String, color: String, logWrite: Boolean } } options 
     *  'color' can be: 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', or 'white'. Defaults to 'white'.
     * */
    constructor(options = { writeToText, timestamps, path, color, logWrite }) {
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
    
    Write(str) {
        var d = new Date();
        if (this.writeToText) {
            if (this.timestamps) str = `[${this.FMaths.addZero(d.getHours(), 2)}:` +
            `${this.FMaths.addZero(d.getMinutes(), 2)}:` +
            `${this.FMaths.addZero(d.getSeconds(), 2)}]` +
            ` ${str}`;
            this.stream.write(`${str}\n`, (err) => {
                if (err) console.log(err.message);
                else {
                    if (this.logWrite) console.log(`Written ${str}`);
                }
            });
        }
        else {
            if (this.timestamps) console.log(`\x1b[93m\u2588\u2588\u2588 [${this.FMaths.addZero(d.getHours(), 2)}:` +
            `${this.FMaths.addZero(d.getMinutes(), 2)}:` +
            `${this.FMaths.addZero(d.getSeconds(), 2)}] [WRN] > ` +
            `Property: writeToText must be set to true.\x1b[0m`);
            else console.log(`\x1b[93m\u2588\u2588\u2588 [WRN] > Property: writeToText must be set to true. Cannot write to ${this.fileName}.\x1b[0m`);
        }
    }
     /**
      * @private
      * This method is not meant for use, as it may cause you some unexpected problems. Use Write(str) instead.
      */
    ___internalWrite(str) {
        if (this.timestamps) this.Write(str.slice(20));
        else this.Write(str.slice(9));
    }

    Log(type = { property, filePath }, str) {
        var property, filePath, output = this.color + "\u2588\u2588\u2588 ";

        if (typeof type.property === "undefined") property = false;
        else property = type.property;
        if (typeof type.filePath === "undefined") filePath = false;
        else filePath = type.filePath;
        
        if (this.timestamps) {
            var d = new Date();
            output += `[${this.FMaths.addZero(d.getHours(), 2)}:` +
            `${this.FMaths.addZero(d.getMinutes(), 2)}:` +
            `${this.FMaths.addZero(d.getSeconds(), 2)}] `;
        }
        output += `[LOG] > `;

        if (typeof property === "number") { throw new Error("\x1b[31mProperty: type must be a string\x1b[0m"); }
        if (typeof filePath === "number") { throw new Error("\x1b[31mProperty: filePath must be a string\x1b[0m"); }

        if (typeof property === "string") {
            output += `Property: ${property} is ${str}`;
        }
        else if (typeof filePath === "string") {
            output += `File Path: ${filePath}.`;
        }
        else {
            output += `${str}`
        }

        this.___internalWrite(output);
        output += `\x1b[0m`;
        console.log(output);
    }

    LogError(type = { property, filePath }, str) {
        var property, filePath, output = "\x1b[31m\u2588\u2588\u2588 ";

        if (typeof type.property === "undefined") property = false;
        else property = type.property;
        if (typeof type.filePath === "undefined") filePath = false;
        else filePath = type.filePath;
        
        if (this.timestamps) {
            var d = new Date();
            output += `[${this.FMaths.addZero(d.getHours(), 2)}:` +
            `${this.FMaths.addZero(d.getMinutes(), 2)}:` +
            `${this.FMaths.addZero(d.getSeconds(), 2)}] `;
        }
        output += `[ERR] > `;

        if (typeof property === "number") { throw new Error("\x1b[31mProperty: type must be a string\x1b[0m"); }
        if (typeof filePath === "number") { throw new Error("\x1b[31mProperty: filePath must be a string\x1b[0m"); }

        if (typeof property === "string") {
            output += `Property: ${property} must be ${str}`;
        }
        else if (typeof filePath === "string") {
            output += `File Path: ${filePath} does not exist.`;
        }
        else {
            output += `Error type not specified.`;
        }

        this.___internalWrite(output);
        output += `\x1b[0m`;
        console.log(output);
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
        output += `\x1b[0m`;
        console.log(output);
    }
}