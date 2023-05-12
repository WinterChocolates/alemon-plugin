import plugin from '../src/lib/plugins'
import { PluginType, Messgetype, EType } from '../src/lib/types'

export class wangyiyun extends plugin {
    [parameter: string]: PluginType
    constructor() {
        super({
            name: '网易云热评',
            dsc: '网易云热评',
            rule: [
                {
                    reg: '^/网易云热评$',
                    fnc: 'wangyiyunhot'
                }
            ]
        })
    }
    async wangyiyunhot(e: Messgetype) {
        let message = '';
        let url = 'https://tenapi.cn/v2/comment';
        let response = await fetch(url);
        let res = await response.json();
        if (res.code == '200') {
            message = res.data.comment + "\n" + "歌名：" + res.data.songs + "\n" + "歌手：" + res.data.sings + "\n" + "评论者：" + res.data.name;
        } else {
            message = 'api失效了喵~'
        }
        e.reply(message)
        return false
    }
}