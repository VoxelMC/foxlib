"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FConsoleRead {
    constructor(options, onceEnable) {
        let stdin = process.stdin;
        let commandsInput = 0;
        stdin.setEncoding('utf-8');
        stdin.on("data", data => {
            let once = onceEnable;
            let send = data.replace(/(\r\n|\n|\r)/gmi, "").split(" "); // Array to parse 
            let command = send.shift(); // First element of send array is the command
            let readArr = Array.from(send); // New array from send
            let argsArr = []; // Entry array to be filled with arguments for command method
            let l, reservedCommands = [
                "-exit", "-exitread", "-report", "-help", "-usage" // Reserved Commands
            ];
            let reservedAliases = [
                "-e", "-er", "-r", "-h", "-u" // Reserved Command Aliases
            ];
            let cmdCheck = false;
            reservedAliases.push(options.exit.command);
            l = reservedAliases.length - 1;
            // Check if Reserved Command
            if (!reservedCommands.includes(command) && !reservedAliases.includes(command))
                cmdCheck = true;
            if (Object.keys(options.commands).includes(command) && !cmdCheck) {
                console.log(`\u001b[33;1mFConsoleRead > ${command} is a reserved command name! Please change this command name.\u001b[0m`);
            }
            // Reserved Commands
            switch (command) {
                case reservedCommands[0]:
                case reservedAliases[0]:
                    process.exit();
                    commandsInput++;
                    break;
                case reservedCommands[1]:
                case reservedAliases[l]:
                    stdin.destroy();
                    break;
                case reservedCommands[2]:
                case reservedAliases[2]:
                    console.log(`\u001b[35;1mFConsoleRead > # of commands input: \u001b[33;1m${commandsInput}\u001b[0m`);
                    commandsInput++;
                    break;
                case reservedCommands[3]:
                case reservedAliases[3]:
                    if (Object.keys(options.commands).includes(readArr[0])) {
                        let f = options.commands[readArr[0]].length;
                        console.log(`\u001b[35;1mFConsoleRead >\n` +
                            `Command Name: ${readArr[0]}\n` +
                            `\u001b[35;1m => \u001b[36;1m# of expected parameters: \u001b[33;1m${f}\u001b[0m`);
                    }
                    else if (reservedCommands.includes(readArr[0]) || reservedAliases.includes(readArr[0])) {
                        let commandInfo = [
                            [
                                "Exits the Node process.", "Exits the FConsoleRead process.", "Displays # of commands used",
                                "Displays a help menu containing all reserved and custom commands. Optional argument for info on a specific command.",
                                "Displays the usage of datatype flags."
                            ], [
                                "-exit, -e", "-exitread, -er", "-report, -r", "-help [command], -h [command]", "-usage [type], -u [type]"
                            ]
                        ];
                        let indOfRC = 0;
                        if (reservedAliases.includes(readArr[0]))
                            indOfRC = reservedAliases.indexOf(readArr[0]);
                        else if (reservedCommands.includes(readArr[0]))
                            indOfRC = reservedCommands.indexOf(readArr[0]);
                        console.log(`\u001b[35;1mFConsoleRead >\n` +
                            `Command Name, Alias: ${commandInfo[1][indOfRC]}\n` +
                            `\u001b[35;1m => \u001b[36;1m${commandInfo[0][indOfRC]}\u001b[0m`);
                    }
                    else {
                        console.log(`\u001b[35;1mFConsoleRead >\n` +
                            `\u001b[35;1m => \u001b[36;1mReserved Commands: \u001b[33;1m${reservedCommands.join(", ")}\n` +
                            `\u001b[35;1m => \u001b[36;1mReserved Command Aliases: \u001b[33;1m${reservedAliases.join(", ")}\n` +
                            `\u001b[35;1m => \u001b[36;1mCommands: \u001b[33;1m${Object.keys(options.commands).join(", ")}\u001b[0m`);
                    }
                    commandsInput++;
                    break;
                case reservedCommands[4]:
                case reservedAliases[4]:
                    console.log(`\u001b[35;1mFConsoleRead >\n`);
                    break;
            }
            if (!Object.keys(options.commands).includes(command) && cmdCheck) {
                return console.log("FConsoleRead > Command not recognized!");
            }
            else if (Object.keys(options.commands).includes(command) && cmdCheck) {
                let Pass = options.commands[command];
                let end;
                let bools = ["-true", "-false"];
                commandsInput++;
                for (let i = 0; i < readArr.length; i++) {
                    if (readArr[i] === "-string") {
                        let sendArr = [];
                        let strBegin = i + 1;
                        end = readArr.indexOf("-s", strBegin);
                        for (strBegin; strBegin < end; strBegin++) {
                            if (readArr[strBegin] !== "-s")
                                sendArr.push(readArr[strBegin]);
                            else
                                break;
                        }
                        argsArr.push(sendArr.join(" "));
                        continue;
                    }
                    else if (readArr[i] === "-num") {
                        let sendArr = [];
                        let numBegin = i + 1;
                        end = readArr.indexOf("-n", numBegin);
                        for (numBegin; numBegin < end; numBegin++) {
                            if (readArr[numBegin] !== "-n") {
                                let pushed = readArr[numBegin];
                                sendArr.push(pushed);
                            }
                            else
                                break;
                        }
                        argsArr.push(parseInt(sendArr.reduce((p, n) => parseInt(p) + parseInt(n))));
                        continue;
                    }
                    else if (readArr[i] === "-array") {
                        let sendArr = [];
                        let arrBegin = i + 1;
                        end = readArr.indexOf("-a", arrBegin);
                        for (arrBegin; arrBegin < end; arrBegin++) {
                            if (readArr[arrBegin] !== "-a") {
                                sendArr.push(readArr[arrBegin]);
                            }
                            else
                                break;
                        }
                        argsArr.push(sendArr);
                        continue;
                    }
                    else if (bools.includes(readArr[i])) {
                        switch (readArr[i]) {
                            case "-true":
                                argsArr.push(true);
                                break;
                            case "-false":
                                argsArr.push(false);
                                break;
                        }
                        continue;
                    }
                    else {
                        if (!end)
                            end = -1;
                        if (i <= end)
                            continue;
                        else
                            argsArr.push(readArr[i].toString());
                        continue;
                    }
                }
                Pass.apply(this, argsArr);
                if (once) {
                    stdin.destroy();
                }
            }
        });
        stdin.on('close', _c => {
            let exitFunc = options.exit.exitFunction;
            let param = true;
            exitFunc(param);
            console.log("\x1b[1m\x1b[31m\nExiting...");
        });
        process.on('exit', _c => {
            let exitFunc = options.exit.exitFunction;
            let param = true;
            exitFunc(param);
            console.log("\x1b[1m\x1b[31m\nTerminating Node Process...");
        });
    }
}
exports.FConsoleRead = FConsoleRead;
