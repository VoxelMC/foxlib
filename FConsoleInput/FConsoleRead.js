module.exports = class FConsoleRead {
    constructor(options) {
        var stdin = process.stdin;
        var commandsInput = 0;

        stdin.setEncoding('utf-8');
        
        stdin.on("data", data => {
            var send = data.slice(0, -2).split(" "); 
            var command = send.shift();
            var readArr = Array.from(send);
            var argsArr = [];
            var reservedCommands = [
                "exitprocess", "report"
            ];

            switch (command) {
                case "exitp"  :  console.log("\nExiting..."); 
                    process.exit(); 
                    commandsInput++; 
                    break;
                case options.exit.command  :  stdin.destroy(); break;
                case "report"  :  console.log(`Commands input: ${commandsInput}`); commandsInput++; break;
            }

            if (Object.keys(options.commands).includes(command) && !reservedCommands.includes(command)) {
                console.log("Command is: " + command); // Remove after complete.
                var Pass = options.commands[command];
                var begin, end;
                if (reservedCommands.includes(command)) return console.log("This is a reserved keyword!");
                commandsInput++;
                for (var i in readArr) {
                    if (readArr[i] === "-string") {
                        let sendArr = [];
                        begin = Number(i) + 1;
                        end = Number(readArr.indexOf("-s", begin));

                        if (ind !== 0) readArr.splice(ind - 1, ind + 1);
                        else readArr.splice(0, 1);

                        for (begin; begin < end; begin++) {
                            if (readArr[begin] !== "-s") sendArr.push(readArr[begin]);
                            else break;
                        }

                        argsArr.push(sendArr.join(" "));
                    }
                    else if (readArr[i] === "-num") {
                        let sendArr = [];
                        begin = Number(i) + 1;
                        end = Number(readArr.indexOf("-n", begin));

                        if (ind !== 0) readArr.splice(ind - 1, ind + 1);
                        else readArr.splice(0, 1);

                        for (begin; begin < end; begin++) {
                            if (readArr[begin] !== "-n") {
                                let pushed = readArr[begin];
                                sendArr.push(Number(pushed));
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

                if (readArr.includes("-string")) {
                    var ind = readArr.indexOf("-string")
                    if (ind !== 0) readArr.splice(ind - 1, ind + 1);
                    else readArr.splice(0, 1);
                }
                Pass.apply(this, argsArr);
            }
        });

        stdin.on('close', c => {
            console.log(c);
            console.log(options.exitFunction);
            var exitFunc = options.exit.function;
            console.log('after' + "");
            var param = "New String!!!";
            exitFunc(param);
        })
    }
}