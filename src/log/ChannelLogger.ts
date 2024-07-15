import * as vscode from 'vscode';

export class ChannelLogger {
    private outputChannel: vscode.OutputChannel;
    constructor(pluginName: string) {
        this.outputChannel = vscode.window.createOutputChannel(pluginName);
    }
    // [时间戳] [日志等级] [消息内容] [错误堆栈]
    private formatStack(level: string, message: string): string {
        let dateO = new Date();
        let dateL = dateO.toLocaleString(undefined, { hourCycle: "h24" }).split(" ")

        let date = dateL[0].split("/")
        date[0] = date[0].padStart(2, '0')
        date[1] = date[1].padStart(2, '0')
        date[2] = date[2].replaceAll(",", "")

        let milliseconds = dateO.getMilliseconds().toString()
        milliseconds = milliseconds.padStart(0, "0")
        let result = [date[2], date[1], date[0]].join("-") +
            " " + dateL[1] + "." + milliseconds;

        let formatString = `${result} [${level}]:\n    ${message}`
        return formatString
    }

    debug(message: string | string[]): void {
        if (message instanceof Array) {
            message = message.join(" ")
        }
        this.outputChannel.appendLine(this.formatStack("debug", message))
    }
    info(message: string | string[]): void {
        if (message instanceof Array) {
            message = message.join(" ")
        }
        this.outputChannel.appendLine(this.formatStack("info", message))
    }
    warn(message: string | string[]): void {
        if (message instanceof Array) {
            message = message.join(" ")
        }
        this.outputChannel.appendLine(this.formatStack("warn", message))
    }
    error(message: string | string[]): void {
        if (message instanceof Array) {
            message = message.join(" ")
        }
        this.outputChannel.appendLine(this.formatStack("error", message))
    }
}
export let outputChannelInstance: ChannelLogger = new ChannelLogger("vscode-translator")

// interface ChannelLoggerCache {
//     [key: string]: ChannelLogger
// }
// export class ChannelLoggerSingleton {
//     //用于引用全局唯一的单例对象，在一开始就创建好
//     private static INSTANCE: ChannelLoggerCache
//     private Singleton() { }    //不允许随便new，需要对象直接找getInstance
//     public static getChannelLoggerInstance(pluginName: string): ChannelLogger {   //获取全局唯一的单例对象
//         if (!this.INSTANCE)
//             this.INSTANCE = {}
//         if (!this.INSTANCE[pluginName])
//             this.INSTANCE[pluginName] = new ChannelLogger(pluginName)

//         return this.INSTANCE[pluginName];
//     }
// }
// export let outputChannelInstance: ChannelLogger = ChannelLoggerSingleton.getChannelLoggerInstance("vscode-translator")
