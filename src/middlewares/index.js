import models from '../models'
import koaBody from 'koa-body'
import path from 'path'
import util from '../utils/util'
const catchError = async(ctx, next) => {
    try {
        await next()
        if (ctx.status === 404) {
            ctx.throw(404)
        }
    } catch (err) {
        let status = err.status || 500
        if (status < 0) {
            status = 500
        }
        ctx.status = status
        ctx.state = {
            status: status,
            currentUser: null
        }
        if (status === 500) {
            console.log('server error', err, ctx)
        }
        await ctx.render('error/error', {})
    }
}

const addHelper = async(ctx, next) => {
    let currentUser = null
    if (ctx.session.userId) {
        currentUser = await models.Admin.findById(ctx.session.userId)

    }
    if (!ctx.state) {
        ctx.state = {}
    }
    //  ctx.state.csrf = ctx.csrf
    ctx.state.currentUser = currentUser
    ctx.state.isUserSignIn = (currentUser != null)
    await next()
}

const multipart = () => {
    return koaBody({
        multipart: true, // 支持文件上传
        encoding: 'gzip',
        formidable: {
            uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
            keepExtensions: true, // 保持文件的后缀
            maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
            onFileBegin: (name, file) => { // 文件上传前的设置
                // 获取文件后缀
                const ext = util.getUploadFileExt(file.name)
                    // 最终要保存到的文件夹目录
                const dirName = util.getUploadDirName();
                let __tempDirname = path.resolve(__dirname, '..')
                const dir = path.join(__tempDirname, `public/upload/${dirName}`)
                    // 检查文件夹是否存在如果不存在则新建文件夹
                util.checkDirExist(dir)
                    // 获取文件名称
                const fileName = util.getUploadFileName(ext)

                // 重新覆盖 file.path 属性
                file.path = `${dir}/${fileName}`
                let app = global.getApp()
                app.context.uploadpath = app.context.uploadpath ? app.context.uploadpath : {};
                app.context.uploadpath[name] = `/upload/${dirName}/${fileName}`;
            }
        }
    })
}





export default {
    catchError,
    multipart,
    addHelper
}