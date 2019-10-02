export declare class FConsoleRead {
    constructor(options: {
        commands: {
            commandNameString?: Function;
        };
        exit: {
            command?: string;
            exitFunction?: Function;
        };
    }, onceEnable: boolean);
}
