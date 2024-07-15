// 模块“vscode”包含 VS Code 扩展性 API
// 导入模块并在下面的代码中使用别名 vscode 引用它
import * as vscode from 'vscode';

import { registerCommands } from "./command/RegisterCommand"
import { Il8n, getIl8n } from "./il8n/Il8n"


// 激活扩展时调用此方法
// 首次执行命令时，扩展将被激活
export function activate(context: vscode.ExtensionContext) {
	registerCommands(context)
	let il8n: Il8n = getIl8n(context)
	console.log(il8n.format<string>("a"));
}


// 停用扩展时调用此方法
export function deactivate() {

}
