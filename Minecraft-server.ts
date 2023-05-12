import plugin from '../src/lib/plugins'
import { PluginType, Messgetype, EType } from '../src/lib/types'
import { RCON } from 'minecraft-server-util';

/**
 * 编辑server.properties中的
 * rcon.port=25575      //如想更改端口把下面的port后面的25575改成自己更改的端口
 * enable-rcon=false    //false改为true，不改为true则RCON端口启动不了
 * rcon.password=       //建议添加个密码
 */

const host = '';        //自己服务器的IP地址，如是本地请填127.0.0.1
const port = 25575;     //默认25575，更改了端口请修改
const password = '';    //密码填单引号里
const client = new RCON();


async function Sendmessage(message: string) {
    const connectOpts = {
        timeout: 1000 * 5
    };

    const loginOpts = {
        timeout: 1000 * 5
    };
    await client.connect(host, port, connectOpts);
    await client.login(password, loginOpts);
    const res = await client.execute(message);
    await client.close();
    return res;
}

export class minecraft extends plugin {
    [parameter: string]: PluginType
    constructor() {
        super({
            name: 'Minecraft-server',
            dsc: 'Minecraft远程访问RCON',
            rule: [
                {
                    reg: '^/谁在线$',
                    fnc: 'online'
                },
                {
                    reg: '^/执行(.*)$',
                    fnc: 'execute'
                }
            ]
        })
    }
    async online(e: Messgetype) {
        let res = await Sendmessage('list')
        e.reply(res)
        return false
    }
    async execute(e: Messgetype) {
        let res = ''
        if (e.identity.master || e.identity.admins) {
            let msg = e.cmd_msg;
            let message = msg.replace(/\/执行/g, "").trim()
            res = await Sendmessage(message)
        } else {
            res = '你没权限ok?'
        }
        e.reply(res)
        return false
    }
}