import vscode, { WorkspaceConfiguration } from "vscode";

// 对配置文件的处理
class Configuration {
    prefixConfig: string
    configuration: WorkspaceConfiguration
    constructor(prefixConfig: string) {
        // 插件名称，插件配置信息的前缀
        this.prefixConfig = prefixConfig
        this.configuration = vscode.workspace.getConfiguration(prefixConfig);
    }
    // 读取某个值
    public getConfig<T>(key: string): T | undefined;
    public getConfig<T>(key: string, defaultValue: T): T;
    public getConfig<T>(key: string, defaultValue?: T): T {
        let value: any = this.configuration.get<T>(`${this.prefixConfig}.${key}`);
        if (typeof value === 'undefined' || value === '') {
            value = defaultValue;
        }
        return value;
    }
    // 设置某个值
    public setConfig<T>(key: string, value: any): void;
    public setConfig<T>(key: string, value: any, configurationTarget: boolean | null): void;
    public setConfig<T>(key: string, value: any, configurationTarget?: boolean | null): void {
        // 最后一个参数，为true时表示写入全局配置，为false或不传时则只写入工作区配置
        vscode.workspace.getConfiguration().update(`${this.prefixConfig}.${key}`,
            value, configurationTarget);
    }

    // 删除某个值
    public deleteConfig<T>(key: string): void;
    public deleteConfig<T>(key: string, configurationTarget: boolean | null): void;
    public deleteConfig<T>(key: string, configurationTarget?: boolean | null): void {
        // 最后一个参数，为true时表示写入全局配置，为false或不传时则只写入工作区配置
        vscode.workspace.getConfiguration().update(`${this.prefixConfig}.${key}`,
            undefined, configurationTarget);
    }


    // TODO 怎么处理
    // 监听变化并进行处理
    onConfigChange<T>(key: string, callback: (newValue: T) => void) {
        vscode.workspace.onDidChangeConfiguration((eventNames) => {
            if (eventNames.affectsConfiguration(`${this.prefixConfig}.${key}`)) {
                let newValue: T = this.getConfig(key) as T;
                callback(newValue);
            }
        });
    }
}
// TODO 
export let confInstance = new Configuration("vscode-translator")