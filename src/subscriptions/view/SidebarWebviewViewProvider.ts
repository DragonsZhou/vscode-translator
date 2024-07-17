import * as vscode from 'vscode';
import * as path from 'path';

export class SidebarWebviewViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewId = 'vscode-translator-Sidebar-id';
    constructor(private readonly _extensionPath: vscode.Uri) { }


    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ) {
        webviewView.webview.options = {
            enableScripts: true,// 启用 javascript 脚本，控制是否在 Webview 内容中启用脚本
            // 指定 Webview 可以使用 URI（表示磁盘上的文件或任何其他资源的通用资源标识符）
            // 加载本地资源的根路径。
            // 这保证了扩展不能访问您指定的路径之外的文件。
            // vscode.Uri.file(path.join(this._extensionPath, 'dist'))
            localResourceRoots: [vscode.Uri.joinPath(this._extensionPath, 'dist')]
        };
        console.log(this._extensionPath);

        // const onDiskPath = vscode.Uri.file(
        //     path.join(this._extensionPath, 'dist', "vue", 'bundle.js')
        // );
        // const webviewUri = webviewView.webview.asWebviewUri(onDiskPath);

        const icon = webviewView.webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionPath, 'dist', "vue", 'favicon.ico'));
        const jsapp = webviewView.webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionPath, 'dist', "vue", "js", 'app.501fa4a1.js'));
        const jschunk = webviewView.webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionPath, 'dist', "vue", "js", 'chunk-vendors.34a5124e.js'));
        const cssapp = webviewView.webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionPath, 'dist', "vue", "css", 'app.2cf79ad6.css'));

        webviewView.webview.html = `
            <!doctype html>
            <html lang="">
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <link rel="icon" href="${icon}">
                <title>view-vue</title>
                <script defer="defer" src="${jsapp}"></script>
                <script defer="defer" src="${jschunk}"></script>
                <link href="${cssapp}" rel="stylesheet">
            </head>

            <body><noscript><strong>We're sorry but view-vue doesn't work properly without JavaScript enabled. Please enable it to
                        continue.</strong></noscript>
                <div id="app"></div>
            </body>
            </html>`;
    }
}
