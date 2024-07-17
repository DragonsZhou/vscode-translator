
import * as vscode from 'vscode';
import { outputChannelInstance } from '../../log/ChannelLogger';

export function getSelectedText(...args: any[]): string {
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
}
// // 获取注释
// const editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
// if (editor) {
//     const textArray: string[] = []
//     // 当前被选中文本的位置信息数组（实际上就是range组成的数组）
//     const Ranges = editor.selections
//     Ranges.forEach((range) => {
//         // 通过位置信息拿到被选中的文本，然后拼接要插入的log
//         const text = editor.document.getText(range)
//         textArray.push(text)
//     })
//     outputChannelInstance.info(textArray.join(" "));
//     // editor.action.blockComment  注释命令
// }




export function comment() {
    let editor = vscode.window.activeTextEditor;
    if (editor) {
        let currentPosition = editor.selection.active;
        let lineNumber = currentPosition.line;
        let lineText = editor.document.lineAt(lineNumber).text;
        let textArry = []
        outputChannelInstance.info(lineText)


        // 向上搜索注释文本
        let commentText = '';
        for (let i = lineNumber; i >= 0; i--) {
            let currentLineText = editor.document.lineAt(i).text;
            if (currentLineText.trim().startsWith('//')) {
                textArry.push(currentLineText.trim().substring(2).trim() + '\n' + commentText)
            } else {
                break;
            }
        }
        textArry.push(lineText)
        // 向下搜索注释文本
        for (let i = lineNumber + 1; i < editor.document.lineCount; i++) {
            let currentLineText = editor.document.lineAt(i).text;
            if (currentLineText.trim().startsWith('//')) {
                textArry.push(currentLineText.trim().substring(2).trim() + '\n')
            } else {
                break;
            }
        }
        outputChannelInstance.info(textArry.toString())
        // // 输出注释文本
        // if (commentText !== '') {
        //     vscode.window.showInformationMessage('Comment Text: ' + commentText);
        // } else {
        //     vscode.window.showInformationMessage('No comment found!');
        // }
    } else {
        vscode.window.showInformationMessage('No active editor found!');
    }
};
