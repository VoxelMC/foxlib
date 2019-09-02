module.exports = class FLogger {
    constructor(options = { writeToText, timestamps, path }) {
        /**
         * Options:
         * Write to a .txt file.
         * Timestamps.
         * Folder Path for log files.
         * */
        const fs = require('fs');
        const FMaths = require('../FMaths');
        const fm = new FMaths();

        if (typeof options.writeToText !== "boolean") throw new Error("Option writeToTxt must be present and a boolean.");
        this.writeToText = options.writeToText;
        if (typeof options.timestamps !== "boolean") options.timestamps = false;
        this.timestamps = options.timestamps;
        if (typeof options.path !== "string") options.path = "./";
        this.path = options.path;
        if (!this.path.endsWith("/")) this.path += "/" 
          
        if (this.writeToText) {
            this.d = new Date();
            this.fileName = `${this.path}${fm.addZero(this.d.getFullYear(), 2)}-` +
            `${fm.addZero(this.d.getMonth(), 2)}-${fm.addZero(this.d.getDate(), 2)}-` +
            `${fm.addZero(this.d.getHours(), 2)}-${fm.addZero(this.d.getMinutes(), 2)}-` +
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
        const FMaths = require('../FMaths');
        const fm = new FMaths();

        if (this.writeToText) {
            if (this.timestamps) str = `[${fm.addZero(this.d.getHours(), 2)}:${fm.addZero(this.d.getMinutes(), 2)}:${fm.addZero(this.d.getSeconds(), 2)}] ${str}`;
            this.stream.write(`${str}\n`, (err) => {
                if (err) console.log(err.message);
                else console.log(`Written ${str}`);
            });
        }
    }

    BeginLog(s) {

    }
    
    Seperator(s) {
        console.log("");
        console.log(s);
        console.log("~--------------------------~");
    }

}