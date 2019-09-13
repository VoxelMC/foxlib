module.exports = class FConsoleRead {
    constructor(options) {
        let stdin = process.stdin;
        let commandsInput = 0;

        stdin.setEncoding('utf-8');
        
        stdin.on("data", data => {
            let send = data.slice(0, -2).split(" "); 
            let command = send.shift();
            let readArr = Array.from(send);
            let argsArr = [];
            let reservedCommands = [
                "-exit", "-e", "-report", "-help"
            ];

            switch (command) {
                case "-e"  :  case "-exit" :  
                    console.log("\nExiting...");
                    process.exit();
                    commandsInput++;
                    break;
                case options.exit.command  :  stdin.destroy(); break;
                case "-report"  :  
                    console.log(`Commands input: ${commandsInput}`);
                    commandsInput++;
                    break;
                case "-help"  :  
                    console.log(`Reserved Commands: ${reservedCommands}`);
                    console.log(`Commands: ${options.commands}`);
                    break;
            }
            
            if (reservedCommands.includes(command)) return console.log("This is a reserved keyword!");

            if (Object.keys(options.commands).includes(command) && !reservedCommands.includes(command)) {
                console.log("Command is: " + command); // Remove after complete.
                let Pass = options.commands[command];
                let end;

                commandsInput++;

                for (let i in readArr) {
                    if (readArr[i] === "-string") {
                        let sendArr = [];
                        let strBegin = parseInt(i) + 1;
                        end = parseInt(readArr.indexOf("-s", strBegin));

                        for (strBegin; strBegin < end; strBegin++) {
                            if (readArr[strBegin] !== "-s") sendArr.push(readArr[strBegin]);
                            else break;
                        }

                        argsArr.push(sendArr.join(" "));
                    }
                    else if (readArr[i] === "-num") {
                        let sendArr = [];
                        let numBegin = parseInt(i) + 1;
                        end = parseInt(readArr.indexOf("-n", numBegin));

                        for (numBegin; numBegin < end; numBegin++) {
                            if (readArr[numBegin] !== "-n") {
                                let pushed = readArr[numBegin];
                                sendArr.push(pushed);
                            }
                            else break;
                        }
                        argsArr.push(parseInt(eval(sendArr.join(''))));
                    }
                    else if (readArr[i] === "-array") {
                        let sendArr = [];
                        let arrBegin = parseInt(i) + 1;
                        end = parseInt(readArr.indexOf("-a", arrBegin));

                        for (arrBegin; arrBegin < end; arrBegin++) {
                            if (readArr[arrBegin] !== "-a") {
                                sendArr.push(readArr[arrBegin]);
                            }
                            else break;
                        }
                        argsArr.push(sendArr);
                    }
                    else {
                        if (i <= end) continue;
                        else argsArr.push(readArr[i]);
                    }
                }
                Pass.apply(this, argsArr);
            }
        });

        stdin.on('close', c => {
            console.log(c);
            console.log(options.exitFunction);
            let exitFunc = options.exit.function;
            console.log('after' + "");
            let param = "New String!!!";
            exitFunc(param);
        })
    }
}