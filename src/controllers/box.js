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
const boxTypeListPage = async(ctx, next) => {
    let { query } = ctx.request
    let boxTypes = await models.BoxType.findAll()
    await ctx.render('box/boxType/list', {
        sysStatus: ctx.query.sysStatus,
        sysMsg: ctx.query.sysMsg,
        boxTypes
    })
}

const boxListPage = async(ctx, next) => {
    let { query } = ctx.request
    query.gameId = query.gameId || 0
    const validateSchema = Joi.object().keys({
        page: Joi.number().label('页数'),
        gameId: Joi.number().label('游戏id')
    })
    try {
        query = await validate(query, validateSchema)
        let limit = 10
        let page = query.page || 1
        let t_page = page - 1
        console.log('pagee', page, t_page)
        let offset = limit * t_page
        const games = await models.Game.findAll({ attributes: ['id', 'name'] })
        let where = {}
        if (query.gameId && query.gameId != 0) {
            where.game_id = query.gameId
        }
        const count = await models.Box.count({
            where,
        })
        const boxs = await models.Box.findAll({
            offset,
            limit,
            where,
            include: [{
                    model: models.Game,
                    attributes: ['id', 'name'],
                },
                {
                    model: models.BoxType,
                    attributes: ['id', 'name'],
                }
            ],
            order: [
                ['id', 'ASC']
            ]

        })

        // console.log(JSON.stringify(boxs, undefined, 2))
        await ctx.render('box/box/list', {
            sysStatus: ctx.query.sysStatus,
            sysMsg: ctx.query.sysMsg,
            boxs,
            games,
            count,
            page,
            gameId: query.gameId,
            limit
        })
    } catch (err) {
        log('验证参数错误', err.message)
        const locals = {
            sysStatus: 'error',
            sysMsg: escape(err.message)
        }
        return ctx.redirect(`box/box/listPage?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    }
}


const boxGoodsListPage = async(ctx, next) => {
    let { query } = ctx.request
    query.gameId = query.gameId || 0
    query.boxTypeId = query.boxTypeId || 0
    const validateSchema = Joi.object().keys({
        page: Joi.number().label('页数'),
        gameId: Joi.number().label('游戏id'),
        boxTypeId: Joi.number().label('宝箱类型id'),
    })
    try {
        query = await validate(query, validateSchema)
        let limit = 10
        let page = query.page || 1
        let t_page = page - 1
        let offset = limit * t_page
        const games = await models.Game.findAll({ attributes: ['id', 'name'] })
        let boxWhere = {}
        let where = {}

        if (query.gameId && query.gameId != 0) {
            boxWhere.game_id = query.gameId
        }
        let boxs = await models.Box.findAll({
            attributes: ['id', 'img'],
            where: boxWhere,
        })
        let boxTypeIds = []
        boxTypeIds.forEach(function(element) {
            boxTypeIds.push(element.id)
        })
        if (boxTypeIds.length > 0) {
            where['goods_type_id'] = {
                [Op.in]: boxTypeIds
            }
        }


        let boxTypes = await models.BoxType.findAll({
            attributes: ['id', 'name'],
        })

        const count = await models.BoxGoods.count({
            where,
        })
        const boxGoods = await models.BoxGoods.findAll({
            offset,
            limit,
            where,
            include: [{
                    model: models.Goods,
                    attributes: ['id', 'name'],
                },
                {
                    model: models.Box,
                    attributes: ['id', 'name'],
                }
            ],
            order: [
                ['id', 'ASC']
            ]

        })

        console.log(JSON.stringify(boxGoods, undefined, 2))
        await ctx.render('box/boxGoods/list', {
            sysStatus: ctx.query.sysStatus,
            sysMsg: ctx.query.sysMsg,
            boxGoods,
            boxTypes,
            games,
            count,
            page,
            gameId: query.gameId,
            boxTypeId: query.boxTypeId,
            limit
        })
    } catch (err) {
        log('验证参数错误', err.message)
        const locals = {
            sysStatus: 'error',
            sysMsg: escape(err.message)
        }
        return ctx.redirect(`box/boxGoods/listPage?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    }
}



/**
 * 编辑页面
 * @param {*} ctx 
 * @param {*} next 
 */



const boxTypeEditPage = async(ctx, next) => {
    let { query } = ctx.request
    const validateSchema = Joi.object().keys({
        boxTypeId: Joi.number().required().label('宝箱类型id')
    })
    try {
        const { boxTypeId } = await validate(query, validateSchema)
        const boxType = await models.BoxType.findById(boxTypeId)
        await ctx.render('box/boxType/edit', {
            sysStatus: ctx.query.sysStatus,
            sysMsg: ctx.query.sysMsg,
            boxType
        })
    } catch (err) {
        log('验证参数错误', err.message)
        const locals = {
            sysStatus: 'error',
            sysMsg: escape(err.message)
        }
        ctx.redirect(`box/boxType/listPage?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    }
}


const boxEditPage = async(ctx, next) => {
    let { query } = ctx.request
    const validateSchema = Joi.object().keys({
        boxId: Joi.number().required().label('宝箱id')
    })
    try {
        const { boxId } = await validate(query, validateSchema)
        const boxTypes = await models.BoxType.findAll({ attributes: ['id', 'name'] })
        const games = await models.Game.findAll({ attributes: ['id', 'name'] })
        const box = await models.Box.findById(boxId)
        await ctx.render('box/box/edit', {
            sysStatus: ctx.query.sysStatus,
            sysMsg: ctx.query.sysMsg,
            boxTypes,
            games,
            box
        })
    } catch (err) {
        log('验证参数错误', err.message)
        const locals = {
            sysStatus: 'error',
            sysMsg: escape(err.message)
        }
        ctx.redirect(`box/box/listPage?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    }
}




const boxGoodsEditPage = async(ctx, next) => {
    let { query } = ctx.request
    const validateSchema = Joi.object().keys({
        boxTypeId: Joi.number().required().label('宝箱类型id')
    })
    try {
        const { boxTypeId } = await validate(query, validateSchema)
        const boxType = await models.BoxType.findById(boxTypeId)
        await ctx.render('box/boxGoods/edit', {
            sysStatus: ctx.query.sysStatus,
            sysMsg: ctx.query.sysMsg,
            boxType
        })
    } catch (err) {
        log('验证参数错误', err.message)
        const locals = {
            sysStatus: 'error',
            sysMsg: escape(err.message)
        }
        ctx.redirect(`box/boxType/listPage?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    }
}





/**
 * 添加页面
 * @param {*} ctx 
 * @param {*} next 
 */
const boxTypeAddPage = async(ctx, next) => {
    await ctx.render('box/boxType/add', { sysStatus: ctx.query.sysStatus, sysMsg: ctx.query.sysMsg })
}


const boxAddPage = async(ctx, next) => {
    const boxTypes = await models.BoxType.findAll({ attributes: ['id', 'name'] })
    const games = await models.Game.findAll({ attributes: ['id', 'name'] })
    console.log(JSON.stringify(games, undefined, 2))
    await ctx.render('box/box/add', {
        sysStatus: ctx.query.sysStatus,
        sysMsg: ctx.query.sysMsg,
        games,
        boxTypes
    })
}


const boxGoodsAddPage = async(ctx, next) => {
    const boxTypes = await models.BoxType.findAll({ attributes: ['id', 'name'] })
    const games = await models.Game.findAll({ attributes: ['id', 'name'] })
    console.log(JSON.stringify(games, undefined, 2))
    await ctx.render('box/boxGoods/add', {
        sysStatus: ctx.query.sysStatus,
        sysMsg: ctx.query.sysMsg,
        games,
        boxTypes
    })
}



/**
 * 添加一条记录接口
 * @param {*} ctx 
 * @param {*} next 
 */
const boxTypeAdd = async(ctx, next) => {
    const body = ctx.request.body
        // 参数验证
    const schema = Joi.object().keys({
        name: Joi.string().required().label('宝箱名称'),
        level: Joi.number().required().label('宝箱类型级别')
    })
    try {
        await validate(body, schema)
    } catch (err) {
        log(err)
        return Promise.reject(`验证参数出错${err.message}`)
    }
    try {
        await models.BoxType.create(body)
    } catch (err) {
        log(err)
        return Promise.reject(err)
    }
    return Promise.resolve(true)
}
const boxAdd = async(ctx, next) => {
    let body = ctx.request.body
        // 参数验证
    const schema = Joi.object().keys({
        boxTypeId: Joi.number().required().label('宝箱类型id'),
        name: Joi.string().required().label('宝箱名称'),
        img: Joi.string().required().label('宝箱图片'),
        gameId: Joi.number().required().label('游戏id'),
        price: Joi.number().required().label('宝箱价格'),
    })
    try {
        body = await validate(body, schema)
        console.log(body)
    } catch (err) {
        log(err)
        return Promise.reject(`验证参数出错${err.message}`)
    }
    try {
        await models.Box.create({
            box_type_id: body.boxTypeId,
            game_id: body.gameId,
            name: body.name,
            img: body.img,
            price: body.price
        })
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



const boxTypeEdit = async(ctx, next) => {
    let body = ctx.request.body
        // 参数验证
    const schema = Joi.object().keys({
        boxTypeId: Joi.number().required().label('宝箱类型id'),
        name: Joi.string().required().label('宝箱名称'),
        level: Joi.number().required().label('宝箱类型级别')
    })
    try {
        body = await validate(body, schema)
    } catch (err) {
        log(err)
        return Promise.reject(`验证参数出错${err.message}`)
    }
    try {
        await models.BoxType.update({
            name: body.name,
            level: body.level
        }, {
            where: {
                id: body.boxTypeId
            }
        })
    } catch (err) {
        log(err)
        return Promise.reject(err)
    }
    return Promise.resolve(true)
}

const boxEdit = async(ctx, next) => {
    let body = ctx.request.body
        // 参数验证
    const schema = Joi.object().keys({
        boxId: Joi.number().required().label('宝箱类型id'),
        boxTypeId: Joi.number().required().label('宝箱类型id'),
        name: Joi.string().required().label('宝箱名称'),
        img: Joi.string().required().label('宝箱图片'),
        gameId: Joi.number().required().label('游戏id'),
        price: Joi.number().required().label('宝箱价格'),
    })
    try {
        body = await validate(body, schema)
    } catch (err) {
        log(err)
        return Promise.reject(`验证参数出错${err.message}`)
    }
    try {
        await models.Box.update({
            box_type_id: body.boxTypeId,
            game_id: body.gameId,
            name: body.name,
            img: body.img,
            pirce: body.pirce
        }, {
            where: {
                id: body.boxId
            }
        })
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

const boxTypeDel = async(ctx, next) => {
    let { query } = ctx.request
    const validateSchema = Joi.object().keys({
        boxTypeId: Joi.number().required().label('宝箱类型id'),
    })
    try {
        const { boxTypeId } = await validate(query, validateSchema)
        await models.BoxType.destroy({
            where: {
                id: boxTypeId
            }
        })
        return Promise.resolve(true)
    } catch (err) {
        log('验证参数错误', err.message)
        return Promise.reject(err.message)
    }
}

const boxDel = async(ctx, next) => {
    let { query } = ctx.request
    const validateSchema = Joi.object().keys({
        boxId: Joi.number().required().label('宝箱类型id'),
    })
    try {
        const { boxId } = await validate(query, validateSchema)
        await models.BoxGoods.destroy({
            where: {
                box_id: boxId
            }
        })
        await models.Box.destroy({
            where: {
                id: boxId
            }
        })
        return Promise.resolve(true)
    } catch (err) {
        log('验证参数错误', err.message)
        return Promise.reject(err.message)
    }
}


const boxSearch = async(ctx, next) => {
    // let { query } = ctx.request
    // const validateSchema = Joi.object().keys({
    //     offset: Joi.number().label('页数'),
    //     limit: Joi.number().label('条数'),
    //     gameId: Joi.number().label('游戏id')

    //     // boxTypeId: Joi.number().label('宝箱类型id')
    // })
    // try {
    //     const { boxId } = await validate(query, validateSchema)
    //     await models.BoxGoods.destroy({
    //         where: {
    //             box_id: boxId
    //         }
    //     })
    //     await models.Box.destroy({
    //         where: {
    //             id: boxId
    //         }
    //     })
    //     return Promise.resolve(true)
    // } catch (err) {
    //     log('验证参数错误', err.message)
    //     return Promise.reject(err.message)
    // }
}


export default {
    boxTypeListPage,
    boxTypeAddPage,
    boxTypeEditPage,
    boxTypeAdd,
    boxTypeEdit,
    boxTypeDel,

    boxListPage,
    boxAddPage,
    boxEditPage,
    boxAdd,
    boxEdit,
    boxDel,
    boxSearch,

    boxGoodsListPage,
    boxGoodsAddPage,
    boxGoodsEditPage
}