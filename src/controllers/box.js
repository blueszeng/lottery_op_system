import menuConfig from '../configs/menu'
import generate from '../utils/menu'
import util from '../utils/util'
import models from '../models/index'
import { Joi, validate } from '../utils/validator'

import debug from '../utils/debug'
const log = debug(__filename)

import _ from 'lodash'

import Sequelize from 'sequelize'
const Op = Sequelize.Op




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
    query.page = query.page || 1
    try {
        console.log(query)
        const validateSchema = Joi.object().keys({
            page: Joi.number().label('页数'),
            gameId: Joi.number().label('游戏id'),
            boxTypeId: Joi.number().label('宝箱类型id'),
            boxName: Joi.string().empty('').label('宝箱名称'),
        })
        query = await validate(query, validateSchema)
        console.log(query)
        let limit = 10
        let page = query.page
        let t_page = page - 1
        let offset = limit * t_page
        const games = await models.Game.findAll({ attributes: ['id', 'name'] })
            // let boxWhere = {}


        let extendInclude = {
            model: models.Box,
            attributes: ['id', 'name'],
            where: {}
        }
        if (query.gameId && query.gameId != 0) {
            extendInclude.where.game_id = query.gameId
        }

        let boxTypes = await models.BoxType.findAll({
            attributes: ['id', 'name'],
        })

        let countSearch = {}

        if (query.boxTypeId) {
            extendInclude.where = { id: query.boxTypeId }
        }
        if (query.boxName) {
            countSearch.include = [extendInclude]
            extendInclude.where = { name: query.boxName }
        }
        const count = await models.BoxGoods.count(countSearch)
        const boxGoods = await models.BoxGoods.findAll({
            offset,
            limit,
            include: [{
                    model: models.Goods,
                    attributes: ['id', 'name'],
                },
                extendInclude
            ],
            order: [
                ['id', 'ASC']
            ]

        })


        // console.log(JSON.stringify(box, undefined, 2))
        await ctx.render('box/boxGoods/list', {
            sysStatus: ctx.query.sysStatus,
            sysMsg: ctx.query.sysMsg,
            boxGoods,
            boxTypes,
            boxName: query.boxName,
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
        boxGoodsId: Joi.number().required().label('宝箱类型id')
    })
    try {
        const { boxGoodsId } = await validate(query, validateSchema)

        const boxGoods = await models.BoxGoods.findById(boxGoodsId)
        const games = await models.Game.findAll({ attributes: ['id', 'name'] })
        const boxs = await models.Box.findAll({ attributes: ['id', 'name'], where: { id: boxGoods.box_id } })
        const goodsTypes = await models.GoodsType.findAll({ attributes: ['id', 'name'] })
        const goodsMode = await models.GoodsModel.findAll({ attributes: ['id', 'name'] })
        const goods = await models.Goods.findAll({
            attributes: ['id', 'name'],
            where: {
                id: boxGoods.goods_id
            }
        })
        await ctx.render('box/boxGoods/edit', {
            sysStatus: ctx.query.sysStatus,
            sysMsg: ctx.query.sysMsg,
            games,
            boxs,
            goods,
            boxGoods,
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
    const games = await models.Game.findAll({ attributes: ['id', 'name'] })
    const boxTypes = await models.BoxType.findAll({ attributes: ['id', 'name'] })

    // console.log(JSON.stringify(games, undefined, 2))
    await ctx.render('box/boxGoods/add', {
        sysStatus: ctx.query.sysStatus,
        sysMsg: ctx.query.sysMsg,
        games,
        boxTypes: [],
        goods: [],
        goodsTypes: [],
        goodsModels: [],
        boxs: []
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



const boxGoodsEdit = async(ctx, next) => {
    let body = ctx.request.body
        // 参数验证
    const schema = Joi.object().keys({
        boxGoodsId: Joi.number().required().label('宝箱物品id'),
        dropProbability: Joi.number().required().label('概率'),
        goodsId: Joi.number().required().label('物品ID'),
        boxId: Joi.number().required().label('宝箱ID'),
    })
    try {
        body = await validate(body, schema)
    } catch (err) {
        log(err)
        return Promise.reject(`验证参数出错${err.message}`)
    }
    try {
        await models.BoxGoods.update({
            drop_probability: body.dropProbability,
            goods_id: body.goodsId,
            box_id: body.boxId
        }, {
            where: {
                id: body.boxGoodsId
            }
        })
        return Promise.resolve(true)
    } catch (err) {
        log('验证参数错误', err.message)
        return Promise.reject(err.message)
    }
}


const boxGoodsAdd = async(ctx, next) => {
    let { body } = ctx.request
    const validateSchema = Joi.object().keys({
        dropProbability: Joi.number().required().label('概率'),
        goodsId: Joi.number().required().label('物品ID'),
        boxId: Joi.number().required().label('宝箱ID'),
    })

    try {
        body = await validate(body, validateSchema)
        console.log({
            drop_probability: body.dropProbability,
            goods_id: body.goodsId,
            box_id: body.boxId
        })
        await models.BoxGoods.create({
            drop_probability: body.dropProbability,
            goods_id: body.goodsId,
            box_id: body.boxId
        })
        return Promise.resolve(true)
    } catch (err) {
        log('验证参数错误', err.message)
        return Promise.reject(err.message)
    }
}



const boxGoodsDel = async(ctx, next) => {
    let { query } = ctx.request
    const validateSchema = Joi.object().keys({
        boxGoodsId: Joi.number().required().label('宝箱物品id'),
    })
    try {
        const { boxGoodsId } = await validate(query, validateSchema)
        await models.BoxGoods.destroy({
            where: {
                id: boxGoodsId
            }
        })
        return Promise.resolve(true)
    } catch (err) {
        log('验证参数错误', err.message)
        return Promise.reject(err.message)
    }
}



const boxAndGoodsTypesByGame = async(ctx, next) => {
    let { query } = ctx.request
    const validSchema = Joi.object().keys({
        gameId: Joi.number().required().label('游戏id')
    })
    try {
        let { gameId } = await validate(query, validSchema)

        let boxTypes = await models.Box.findAll({
            attributes: ['id'],
            where: { game_id: gameId },
            include: [{
                model: models.BoxType,
                attributes: ['id', 'name']
            }],
            group: 'box_type_id'
        })

        let goods = await models.Goods.findAll({
            attributes: ['id', 'goods_model_id'],
            where: { game_id: gameId },
        })

        let goodsModelIds = []
        goods.forEach(function(element) {
            goodsModelIds.push(element.goods_model_id)
        })

        let goodsModels = await models.GoodsModel.findAll({
            attributes: ['id'],
            where: {
                id: {
                    [Op.in]: goodsModelIds
                }
            },
            include: [{
                model: models.GoodsType,
                attributes: ['id', 'name']
            }],
            group: 'goods_type_id'
        })
        let goodsTypes = goodsModels
        return Promise.resolve({ boxTypes, goodsTypes })
    } catch (err) {
        return Promise.reject(err.message)
    }

}

const boxByBoxType = async(ctx, next) => {
    let { query } = ctx.request
    const validSchema = Joi.object().keys({
        gameId: Joi.number().required().label('游戏id'),
        boxTypeId: Joi.number().required().label('宝箱类型id')
    })
    try {
        query = await validate(query, validSchema)
        console.log(query)
        let boxs = await models.Box.findAll({
            attributes: ['id', 'name'],
            where: { box_type_id: query.boxTypeId, game_id: query.gameId },
        })
        return Promise.resolve(boxs)
    } catch (err) {
        return Promise.reject(err.message)
    }
}

const boxModelByGoodsType = async(ctx, next) => {
    let { query } = ctx.request
    const validSchema = Joi.object().keys({
        goodsTypeId: Joi.number().required().label('物品类型id')
    })
    try {
        console.log(query)
        query = await validate(query, validSchema)
        let goodsModels = await models.GoodsModel.findAll({
            attributes: ['id', 'name'],
            where: { goods_type_id: query.goodsTypeId },
        })
        return Promise.resolve(goodsModels)
    } catch (err) {
        return Promise.reject(err.message)
    }
}

const goodsByGoodsModelType = async(ctx, next) => {
    let { query } = ctx.request
    const validSchema = Joi.object().keys({
        goodsModelId: Joi.number().required().label('物品型号id')
    })
    try {
        query = await validate(query, validSchema)
        let goods = await models.Goods.findAll({
            attributes: ['id', 'name'],
            where: { goods_model_id: query.goodsModelId },
        })
        return Promise.resolve(goods)
    } catch (err) {
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
    boxGoodsEditPage,
    boxGoodsEdit,
    boxGoodsAdd,
    boxGoodsDel,

    boxAndGoodsTypesByGame,
    boxByBoxType,
    boxModelByGoodsType,
    goodsByGoodsModelType,
}