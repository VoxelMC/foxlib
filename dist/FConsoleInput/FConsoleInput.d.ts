export declare class FConsoleInput {
    options: {
        commands: {
            commandNameString?: Function;
        };
        exit: {
            command?: string;
            exitFunction?: Function;
        };
    };
    /**
     *
     * @param { { commands: { string: Function }, exit: { command: string, exitFunction: Function } } } options
     *
     */
    constructor(options?: {
        commands: {
            commandNameString?: Function;
        };
        exit: {
            command?: string;
            exitFunction?: Function;
        };
    });
    readCommand(): any;
    startRead(): any;
}
/**
 * FUNCTIONALITY:
 * > I want this to be able to read user input through stdin and process it through functions.
 * > Perhaps allow the user to assign custom console commands to msethods within their programs.
 * > A method that occurs whenever a user input to the console is given, and in this function it can parse what it says, then assign it to a new function to be carried out.
 * > Perhaps this can be achieved by using a function within the constructor object, keys, and function names?
 */ 
