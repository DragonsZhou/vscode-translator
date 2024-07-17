import vscode, { CancellationToken, commands, ExtensionContext, Hover, Position, ProviderResult, TextDocument, TextEditor, TextEditorEdit } from "vscode";

import { confInstance } from "../config/configuration"
import { outputChannelInstance } from '../log/ChannelLogger';



import { getSelectedText } from "./command/SlelctedText";
import { provideHover } from "./view/Hover";
import { SidebarWebviewViewProvider } from "./view/SidebarWebviewViewProvider";

export function subscriptions(context: ExtensionContext) {
    /* 暴露的命令 */
    context.subscriptions.push(
    );

    /* 功能性命令（直接调用） */
    context.subscriptions.push(
        commands.registerCommand('vscode-translator.getSelectedText', getSelectedText),
    );

    /* 视图*/
    context.subscriptions.push(
        //  鼠标悬停提示 
        vscode.languages.registerHoverProvider(
            { pattern: '**' },  //匹配所有文件
            { provideHover }
        ),

        // 侧边栏
        vscode.window.registerWebviewViewProvider(
            SidebarWebviewViewProvider.viewId,  // package.json文件views字段孙子元素中的id
            new SidebarWebviewViewProvider(context.extensionUri)
        )
    );
}


