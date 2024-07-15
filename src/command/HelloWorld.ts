import * as vscode from 'vscode';
import { outputChannelInstance } from '../log/ChannelLogger';


export function helloWorld() {
    // 您放置在此处的代码将在每次执行命令时执行
    // 向用户显示消息框
    outputChannelInstance.info('This is a message');
    // axios.get("https://cn.bing.com/?mkt=zh-CN&mkt=zh-CN&mkt=zh-CN").then(res => {
    // 	console.log(res);
    // })
    vscode.window.showInformationMessage('Hello World from vscode-translator!');
}