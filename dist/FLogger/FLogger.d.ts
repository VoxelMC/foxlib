export declare class FLogger {
    writeToText: boolean;
    timestamps: boolean;
    logWrite: boolean;
    path: string;
    color: any;
    warnings: boolean;
    fileName: string | undefined;
    stream: any;
    /**
     * @constructor
     * @param { { writeToText: Boolean, timestamps: Boolean, path: String, color: String, logWrite: Boolean, warnings: Boolean } } options
     *  'color' can be: 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', or 'white'. Defaults to 'white'.
     * */
    constructor(options?: {
        writeToText: boolean;
        timestamps: boolean;
        path: string;
        color: string;
        logWrite: boolean;
        warnings: boolean;
    });
    timestamp(time?: Date): string;
    write(str: string): void;
    /**
     * @private
     * This method is not meant for use, as it may cause you some unexpected problems. Use Write(str) instead.
     */
    private _internalWrite;
    log(type: {
        property: any;
        filePath?: boolean | undefined;
        bounds?: boolean | undefined;
    } | undefined, str: string, highlight: boolean): void;
    logError(type: {
        property: {};
        filePath: undefined;
        bounds: undefined;
    } | undefined, str: string | boolean, highlight: boolean): void;
    seperator(str: string): void;
    private _propLog;
    private _pathLog;
    private _boundsLog;
    private _undefinedLog;
}
