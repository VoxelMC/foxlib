module.exports = class FConsoleInput {
    constructor(options = { commands }) {
        var standard_input = process.stdin;

        standard_input.setEncoding('utf-8');

        standard_input.on("data", data => {
            var send = data.slice(0, -2).split(" "); 
            var command = send[0];

            console.log("It is: " + command);

            if (Object.keys(options.commands).includes(command)) {
                var Pass = options.commands[command];
                Pass();
            }
        });
    }

    ReadConsole(si) {
        si.setEncoding('utf-8');

        var test;

        test = si.read()
        this.Data(test, this.commands);
    }

    TestData() {
    }

    NewCommand(name, callback) {
        this.commands[name] = callback;
        console.log(this.commands);
    }

    Data(data, cmds) {
        var send = data.slice(0, -2).split(" "); 
        var command = send[0];

        console.log(send);
        console.log(command);
        
        console.log(cmds);

        if (cmds.keys().includes(command)) {
            console.log("this is a test message");
            var Pass = cmds[command];
            Pass()
        }

        console.log(cmds);
    }
}



// So, what do i want this to do???
/**
 * FUNCTIONALITY:
 * > I want this to be able to read user input through stdin and process it through functions.
 * > Perhaps allow the user to assign custom console commands to msethods within their programs.
 * > A method that occurs whenever a user input to the console is given, and in this function it can parse what it says, then assign it to a new function to be carried out. 
 * > Perhaps this can be achieved by using a function within the constructor object, keys, and function names?
 * 
 * 
 */