import vscode, { commands, ExtensionContext } from "vscode";

import { confInstance } from "../config/configuration"
import { helloWorld } from "./HelloWorld"
import { comment } from "./Comment"
import { provideHover } from "./Hover";



export function registerCommands(context: ExtensionContext) {
    // context.subscriptions.push(
    //     vscode.languages.registerHoverProvider('javascript', {
    //         provideHover(document, position, token) {
    //             // hover开关配置，对typelanguage生效
    //             const open = confInstance.getConfig<boolean>('hover.enabled');
    //             if (!open) return null;
    //             return new vscode.Hover('I am a hover!');
    //         }
    //     }),
    //     // vscode.languages.registerHoverProvider('json', {
    //     //     provideHover
    //     // })
    // );

    // let tt=vscode.languages.registerHoverProvider('json', {
    //     provideHover
    // })
    // // 注册鼠标悬停提示
    // context.subscriptions.push();

    context.subscriptions.push(
        // 该命令已在 package.json 文件中定义
        // 现在使用 registerCommand 提供命令的实现
        // commandId 参数必须与 package.json 中的命令字段匹配
        commands.registerCommand('vscode-translator.helloWorld', helloWorld),
        commands.registerCommand('vscode-translator.getComment', comment),

        // 
        commands.registerCommand('vscode-translator.getCurrentFilePath', (uri) => {
            vscode.window.showInformationMessage(`当前文件(夹)路径是：${uri ? uri.path : '空'}`);
        }),
    );
}


// let testEditorCommand=vscode.commands.registerTextEditorCommand('vscode-translator.testEditorCommand', (textEditor, edit) => {
// 	vscode.window.showInformationMessage('您正在执行编辑器命令！');
// 	console.log(textEditor, edit);
// });
// context.subscriptions.push(testEditorCommand);