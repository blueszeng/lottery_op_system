import menuConfig from '../configs/menu'
import generate from '../utils/menu'
import util from '../utils/util'
import models from '../models/index'
import { Joi, validate } from '../utils/validator'

import debug from '../utils/debug'
const log = debug(__filename)


/**
 * 主页面
 * @param {*} ctx 
 * @param {*} next 
 */
const listPage = async(ctx, next) => {
    console.log('weewwewwwww')
    let offset = ctx.query.offset || 0
    let limit = ctx.query.limit || 10
    let games = await models.Game.findAll({ offset, limit })
    await ctx.render('goods/goodsType/list', {
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
const editPage = async(ctx, next) => {
    let { query } = ctx.request
    const validateSchema = Joi.object().keys({
        gameId: Joi.number().required().label('游戏id'),
    })
    try {
        const { gameId } = await validate(query, validateSchema)
        const game = await models.Game.findById(gameId)
        await ctx.render('game/edit', {
            sysStatus: ctx.query.sysStatus,
            sysMsg: ctx.query.sysMsg,
            game
        })
    } catch (err) {
        log('验证参数错误', err.message)
        const locals = {
            sysStatus: 'error',
            sysMsg: escape(err.message)
        }
        return ctx.redirect(`/game/listPage?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    }
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
    const body = ctx.request.body
        // 参数验证
    const schema = Joi.object().keys({
        img: Joi.string().required().label('图片'),
        name: Joi.string().required().label('名称'),
        config: Joi.string().required().label('区配置')
    })
    try {
        await validate(body, schema)
    } catch (err) {
        log(err)
        return Promise.reject(`验证参数出错${err.message}`)
    }
    try {
        await models.Game.create(body)
    } catch (err) {
        log(err)
        return Promise.reject(err)
    }
    return Promise.resolve(true)
}


/**
 * 编辑一条记录
 * @param {*} ctx 
 * @param {*} next 
 */
const edit = async(ctx, next) => {
    let body = ctx.request.body
        // 参数验证
    const schema = Joi.object().keys({
        gameId: Joi.number().required().label('游戏id'),
        img: Joi.string().required().label('图片'),
        name: Joi.string().required().label('名称'),
        config: Joi.string().required().label('区配置')
    })
    try {
        body = await validate(body, schema)
    } catch (err) {
        log(err)
        return Promise.reject(`验证参数出错${err.message}`)
    }
    try {
        let game = await models.Game.findById(body.gameId)
        game.update({
            img: body.img,
            name: body.name,
            config: body.config,
        })
        await game.save()
    } catch (err) {
        log(err)
        return Promise.reject(err)
    }
    return Promise.resolve(true)
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
    editPage,
    addPage,
    add,
    edit,
    del,
    search
}