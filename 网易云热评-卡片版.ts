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
        let centent = '网易云热评'
        let url = 'https://tenapi.cn/v2/comment';
        let response = await fetch(url);
        let res = await response.json();
        if (res.code == 200) {
            let songs = res.data.songs;
            let sings = res.data.sings;
            let album = res.data.album;
            let cover = res.data.cover;
            let url = res.data.url;
            let name = res.data.name;
            let comment = res.data.comment;
            let obj = {
                embed: {
                    title: '网抑云热评',
                    prompt: '网抑云热评',
                    thumbnail: {
                        url: cover
                    },
                    fields: [
                        {
                            name: '热评： ' + comment
                        },
                        {
                            name: '歌曲名字： ' + songs
                        },
                        {
                            name: '歌手： ' + sings
                        },
                        {
                            name: '专辑： ' + album
                        },
                        {
                            name: '评论人： ' + name
                        }
                    ]
                }
            }
            e.reply(centent, obj)
            return false
        } else {
            e.reply('api失效了喵~')
            return false
        }
    }
}
