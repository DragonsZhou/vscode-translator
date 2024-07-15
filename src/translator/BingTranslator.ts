import { BaseTranslator } from "./BaseTranslater"

// 定义数据结构
interface ParamsJson {
    src: string,
}
interface ResultJson {
    src: string,
    srcAudio: any
    target: string,
    targetAudio: any,
}

export class BingTranslaor implements BaseTranslator {

    translate(context: string): string {
        return "123"
    }
}