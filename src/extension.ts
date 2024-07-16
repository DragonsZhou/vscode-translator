// 模块“vscode”包含 VS Code 扩展性 API
// 导入模块并在下面的代码中使用别名 vscode 引用它
import * as vscode from 'vscode';

import { registerCommands } from "./command/RegisterCommand"


// 激活扩展时调用此方法
// 首次执行命令时，扩展将被激活
export function activate(context: vscode.ExtensionContext) {
	registerCommands(context)
}


// 停用扩展时调用此方法
export function deactivate() {

}
