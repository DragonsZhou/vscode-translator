import * as vscode from 'vscode';
import fs from "fs"
import { outputChannelInstance } from '../log/ChannelLogger';

interface ITextMap {
  // 键值对格式
  //"${namespace}.${extensionName}.${moudelName}.${fieldName}" : "xxx"
  [key: string]: any;
}
//国际化
export class Il8n {

  private localesTextMap: { [locales: string]: ITextMap } = {};
  private currentTextMap: ITextMap = {};

  //注册国际化
  public registry(locale: string, text: ITextMap): void {
    this.localesTextMap[locale] = text;
  }

  //设置当前语言
  // TODO
  public setLocal(locale: string): void {
    this.currentTextMap = this.localesTextMap[locale] ||
      this.localesTextMap["en"];
  }

  //获取当前语言的值
  public format<T>(contentKey: string): T;
  public format<T>(contentKey: string, defaultValue: T): T;
  public format<T>(contentKey: string, defaultValue?: T): T {
    const i18nformatString = this.currentTextMap[contentKey];
    return i18nformatString
  }
}

export function getIl8n(context: vscode.ExtensionContext): Il8n {
  // 注册语言表
  const il8n: Il8n = new Il8n();
  // 初始化
  let files = fs.readdirSync(`${context.extensionPath}/src/il8n`);
  ((files) => {
    if (files.length == 0)
      outputChannelInstance.info("No Support Language")
    else {
      let tmp: string[] = []
      files.forEach(file => {
        let nameJson = file.split(".")
        if ("json" == nameJson[1].toLowerCase()) {
          let data = JSON.parse(fs.readFileSync(`${context.extensionPath}/src/il8n/${file}`, 'utf-8'))
          // 注册名称
          il8n.registry(nameJson[0], data);
          tmp.push(nameJson[0])
        }
      })
      tmp.unshift("Support Language:");
      outputChannelInstance.info(tmp)
      // 设置使用的语言
      il8n.setLocal(vscode.env.language);
    }
  })(files)
  return il8n;
}