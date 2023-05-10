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

    //let message = '';
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
        //message = res.data.comment + "\n" + "歌名：" + res.data.songs + "\n" + "歌手：" + res.data.sings + "\n" + "评论者：" + res.data.name;
        //let music = res.data.url;
        //let voice = segment.record(music);
        //e.reply(voice)
    } else {
        //message = 'api失效了喵~'
        e.reply('api失效了喵~')
        return false
    }
}