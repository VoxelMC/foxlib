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
            let l, reservedCommands = [
                "-exit", "-exitread", "-report", "-help", "-usage"
            ];
            let reservedAliases = [
                "-e", "-er", "-r", "-h", "-u"
            ];
            let commandInfo = [
                [
                    "Exits the Node process.", "Exits the FConsoleRead process.", "Displays # of commands used", 
                    "Displays a help menu containing all reserved and custom commands. Optional argument for info on a specific command.",
                    "Displays the usage of datatype flags."
                ], [
                    "-exit, -e", "-exitread, -er", "-report, -r", "-help [command], -h [command]", "-usage [type], -u [type]"
                ]
            ]
            let cmdCheck = false;

            reservedAliases.push(options.exit.command); l = reservedAliases.length - 1;

            if (!reservedCommands.includes(command) && !reservedAliases.includes(command)) cmdCheck = true;

            if (Object.keys(options.commands).includes(command) && !cmdCheck) {
                console.log(`\u001b[33;1mFConsoleRead > ${command} is a reserved command name! Please change this command name.\u001b[0m`);
            }
            
            switch (command) {
                case reservedCommands[0]  :  case reservedAliases[0]  :  
                    process.exit();
                    commandsInput++;
                    break;
                case reservedCommands[1]  :  case reservedAliases[l]  :
                    stdin.destroy(); 
                    break;
                case reservedCommands[2]  :  case reservedAliases[2]  :
                    console.log(`\u001b[35;1mFConsoleRead > # of commands input: \u001b[33;1m${commandsInput}\u001b[0m`);
                    commandsInput++;
                    break;
                case reservedCommands[3]  :  case reservedAliases[3]  :
                    if (Object.keys(options.commands).includes(readArr[0])) {
                        let f = options.commands[readArr[0]].length;
                        console.log(`\u001b[35;1mFConsoleRead >\n` + 
                        `Command Name: ${readArr[0]}\n` +
                        `\u001b[35;1m => \u001b[36;1m# of expected parameters: \u001b[33;1m${f}\u001b[0m`);
                    }
                    else if (reservedCommands.includes(readArr[0]) || reservedAliases.includes(readArr[0])) {
                        
                    }
                    else {
                        console.log(`\u001b[35;1mFConsoleRead >\n` + 
                        `\u001b[35;1m => \u001b[36;1mReserved Commands: \u001b[33;1m${reservedCommands.join(", ")}\n` +
                        `\u001b[35;1m => \u001b[36;1mReserved Command Aliases: \u001b[33;1m${reservedAliases.join(", ")}\n` +
                        `\u001b[35;1m => \u001b[36;1mCommands: \u001b[33;1m${Object.keys(options.commands).join(", ")}\u001b[0m`);
                    }
                    commandsInput++;
                    break;
                case reservedCommands[4]  :  case reservedAliases[4]  :
                    console.log(`\u001b[35;1mFConsoleRead >\n`);
                    break;
            }
            
            if (!Object.keys(options.commands).includes(command) && cmdCheck) {
                    return console.log("FConsoleRead > Command not recognized!");
            }
            else if (Object.keys(options.commands).includes(command) && cmdCheck) {
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
                    else if (readArr[i] === "-true" || "-false") {
                        switch (readArr[i]) {
                            case "-true"  : argsArr.push(true); break;
                            case "-false" : argsArr.push(false); break;
                        }
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
            let exitFunc = options.exit.exitFunction;
            let param = "New String!!!";
            console.log("\x1b[1m\x1b[31m\nExiting...");
            exitFunc(param);
        });

        process.on('exit', c => {
            let exitFunc = options.exit.exitFunction;
            let param = "Param String";
            console.log("\x1b[1m\x1b[31m\nTerminating Node Process...");
            exitFunc(param);
        });
    }
}