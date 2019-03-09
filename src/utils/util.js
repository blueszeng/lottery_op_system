import path from 'path'
import fs from 'fs'
import os from 'os'


const getIPAdress = () => {
    let interfaces = os.networkInterfaces()
    for (let devName in interfaces) {
        let iface = interfaces[devName]
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address
            }
        }
    }
}

const extendMsgStatus = (ctx, msg) => {
    msg.sysStatus = ctx.query.sysStatus
    msg.sysMsg = ctx.query.sysMsg
    return msg
}

const checkDirExist = (p) => {
    if (!fs.existsSync(p)) {
        fs.mkdirSync(p)
    }
}

const getUploadDirName = () => {
    const date = new Date()
    let month = Number.parseInt(date.getMonth()) + 1
    month = month.toString().length > 1 ? month : `0${month}`
    const dir = `${date.getFullYear()}${month}${date.getDate()}`
    return dir
}
const getUploadFileExt = (name) => {
    let ext = name.split('.')
    return ext[ext.length - 1]
}

const getUploadFileName = (ext) => {
    return `${Date.now()}${Number.parseInt(Math.random() * 10000)}.${ext}`;
}


export default {
    extendMsgStatus,
    checkDirExist,
    getUploadDirName,
    getUploadFileExt,
    getUploadFileName,
    getIPAdress
}