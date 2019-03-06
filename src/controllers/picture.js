import common from '../common'
const getCaptcha = async(ctx, next) => {
    let uuid = ctx.query.uuid || 123
    let image = await common.genCaptcha(uuid)
    ctx.body = image
}

const upload = async(ctx, next) => {
    console.log('cddddd', ctx.uploadpath)
    return Promise.resolve(ctx.uploadpath)
}

export default {
    getCaptcha,
    upload
}