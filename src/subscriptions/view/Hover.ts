import * as vscode from 'vscode';
import { outputChannelInstance } from '../../log/ChannelLogger';


export function provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
): vscode.ProviderResult<vscode.Hover> {
    const space = '&nbsp;&nbsp;';
    const base64TranslatedText = Buffer.from("I love you").toString('base64');
    let md = new vscode.MarkdownString(base64TranslatedText);
    const separator = `${space}|${space}`;

    // const translate = `[显示的符合](链接(也可以是自定义命令)?参数(只能一个) "提示")`;
    const translate = `[$(sync)](command:vscode-translator.testParamReturnCommand?132465  "Change translate source")`;
    const header = new vscode.MarkdownString(`[vscode-translator]${space}${translate}`, true);
    header.isTrusted = true;
    // // hover开关配置，对typelanguage生效
    // const open = confInstance.getConfig<boolean>('hover.enabled');
    // if (!open) return null;
    const hover = new vscode.Hover([header, md]);
    return hover
}
