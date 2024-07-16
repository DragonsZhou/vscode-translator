import vscode, { CancellationToken, commands, ExtensionContext, Hover, Position, ProviderResult, TextDocument, TextEditor, TextEditorEdit } from "vscode";

import { confInstance } from "../config/configuration"
import { outputChannelInstance } from '../log/ChannelLogger';



import { getSelectedText } from "./SlelctedText";
import { provideHover } from "./Hover";


export function registerCommands(context: ExtensionContext) {
    // 测试
    context.subscriptions.push(
        /* 暴露的命令 */
        // 该命令必须已在 package.json 文件commands的字段中定义（注册）
        // {
        //     "command": "vscode-translator.testCommand",
        //     "title": "testCommand",
        //     "category": "test"
        // },
        // title是调用命令的字符串
        // command必须和registerCommand的第一个参数相同
        // 使用 registerCommand 注册命令的实现
        commands.registerCommand('vscode-translator.testCommand',
            (...args: any[]): any => {
                vscode.window.showInformationMessage('您正在测试命令！');
                // 您放置在此处的代码将在每次执行命令时执行
                // 向用户显示消息框
                outputChannelInstance.info('This is a message');
                // axios.get("https://cn.bing.com/?mkt=zh-CN&mkt=zh-CN&mkt=zh-CN").then(res => {
                // 	console.log(res);
                // })

                // vscode.commands.executeCommand('vscode-translator.testParamReturnCommand', 'params1', 'params2').then(result => {
                //     console.log('命令结果', result);
                // });
            }),

        commands.registerCommand('vscode-translator.testWebView',
            (...args: any[]): any => {
                vscode.window.showInformationMessage('您正在测试WebView！');
                const panel = vscode.window.createWebviewPanel(
                    'vscode-translator-testWebView', // 只供内部使用，这个 webview 的标识
                    'vscode-translator-testWebView', // 给用户显示的面板标题
                    vscode.ViewColumn.One, // 给新的 webview 面板一个编辑器视图
                    {
                        enableScripts: true, // 启用 javascript 脚本
                        retainContextWhenHidden: true, // 隐藏时保留上下文
                    } // webview 面板的内容配置
                );
            }),

        // 该命令必须已在 package.json 文件commands的字段中定义，同时也在menus字段定义
        // "explorer/context": [
        // {
        //     "group": "navigation",  
        //     "command": "vscode-translator.getCurrentFilePath"
        // }
        // ],  这样在资源管理的右键菜单可以调用该函数
        // "editor/context": [
        // {
        //     "when": "editorFocus",
        //     "group": "navigation",
        //     "command": "vscode-translator.getCurrentFilePath"
        // }
        // ],这样在资编辑器的右键菜单可以调用该函数
        commands.registerCommand('vscode-translator.testMenus',
            (uri) => {
                vscode.window.showInformationMessage(`当前文件(夹)路径是：${uri ? uri.path : '空'}`);
            }),

        commands.registerTextEditorCommand('vscode-translator.testEditorCommand',
            (textEditor: TextEditor, edit: TextEditorEdit, ...args: any[]): void => {
                vscode.window.showInformationMessage('您正在测试编辑器命令！');
                // console.log(textEditor);
                // console.log(edit);
                // console.log(args);
            }),


        /* 功能性命令（直接调用） */
        // 没有在 package.json注册，但是可以通过executeCommand调用
        commands.registerCommand('vscode-translator.testParamReturnCommand',
            (...args: any[]): any => {
                vscode.window.showInformationMessage('您正在测试testParamReturnCommand命令！');
                console.log(args);//[]
                let textEditor = vscode.window.activeTextEditor//获取当前激活的编辑框的实例
                let start = textEditor?.selection.start;
                let end = textEditor?.selection.end;
                let selectedText: string = ""
                if (start && end) {
                    let selectRange = new vscode.Range(start, end)
                    selectedText = textEditor?.document.getText(selectRange) ?
                        textEditor?.document.getText(selectRange) : "";
                }
                outputChannelInstance.info(["已经选取的文本：", selectedText])
                return selectedText
            }),


        /* 视图  注册鼠标悬停提示 */
        vscode.languages.registerHoverProvider(
            { pattern: '**' },  //匹配所有文件
            {
                provideHover(
                    document: TextDocument,
                    position: Position,
                    token: CancellationToken
                ): ProviderResult<Hover> {
                    // // hover开关配置，对typelanguage生效
                    // const open = confInstance.getConfig<boolean>('hover.enabled');
                    // if (!open) return null;
                    return new vscode.Hover('I am a hover!');
                }
            }),
    );









    /* 暴露的命令 */
    context.subscriptions.push(
    );

    /* 功能性命令（直接调用） */
    context.subscriptions.push(
        commands.registerCommand('vscode-translator.getSelectedText', getSelectedText),
    );

    /* 视图  鼠标悬停提示 */
    context.subscriptions.push(
        vscode.languages.registerHoverProvider(
            { pattern: '**' },  //匹配所有文件
            { provideHover }
        ),
    );
}


