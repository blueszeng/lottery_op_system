import menuConfig from '../configs/menu'
import generate from '../utils/menu'
import util from '../utils/util'
import models from '../models/index'




/**
 * 主页面
 * @param {*} ctx 
 * @param {*} next 
 */
const listPage = async(ctx, next) => {
    let offset = ctx.query.offset || 0
    let limit = ctx.query.limit || 10
    let games = await models.Game.findAll({ offset, limit })
    await ctx.render('game/list', {
        sysStatus: ctx.query.sysStatus,
        sysMsg: ctx.query.sysMsg,
        games: games
    })
}


/**
 * 编辑页面
 * @param {*} ctx 
 * @param {*} next 
 */
const eidtPage = async(ctx, next) => {

}

/**
 * 添加页面
 * @param {*} ctx 
 * @param {*} next 
 */
const addPage = async(ctx, next) => {
    await ctx.render('game/add', { sysStatus: ctx.query.sysStatus, sysMsg: ctx.query.sysMsg })
}

/**
 * 添加一条记录接口
 * @param {*} ctx 
 * @param {*} next 
 */
const add = async(ctx, next) => {
    if (!ctx.state.isUserSignIn) {
        return ctx.redirect('/user')
    }
    let menu = { str: "" }
    generate.generateMenu(menuConfig, menu)
    let user = await models.Admin.findOne({ where: { id: ctx.session.userId } })
    if (user === null) {
        return ctx.redirect('/user')
    }
    let userData = {
        id: user.id,
        name: user.name,
        email: user.email,
    }
    await ctx.render('index', util.extendMsgStatus(ctx, { user: userData, 'menu': menu.str }))
}


/**
 * 编辑一条记录
 * @param {*} ctx 
 * @param {*} next 
 */
const edit = async(ctx, next) => {

}

/**
 * 删除一条记录
 * @param {*} ctx 
 * @param {*} next 
 */
const del = async(ctx, next) => {

}



/**
 * 查询接口
 * @param {*} ctx 
 * @param {*} next 
 */
const search = async(ctx, next) => {

}



export default {
    listPage,
    eidtPage,
    addPage,
    add,
    edit,
    del,
    search
}