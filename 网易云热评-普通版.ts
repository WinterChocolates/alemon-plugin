import { Messgetype } from '../src/lib/types'

export const rule = [
    {
        name: '网易云热评',
        event: 'MESSAGES',
        eventType: 'CREATE',
        dsc: '网易云热评',
        priority: 5000,
        reg: '^/网易云热评$',
        fnc: 'wangyiyunhot'
    }
]

export async function wangyiyunhot(e: Messgetype) {
    let message = '';
    let url = 'https://tenapi.cn/v2/comment';
    let response = await fetch(url);
    let res = await response.json();
    if (res.code == 200) {
        message = res.data.comment + "\n" + "歌名：" + res.data.songs + "\n" + "歌手：" + res.data.sings + "\n" + "评论者：" + res.data.name;
    } else {
        message = 'api失效了喵~'
    }
    e.reply(message)
    return false
}