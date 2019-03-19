import menuConfig from '../configs/menu'
import generate from '../utils/menu'
import util from '../utils/util'
import models from '../models/index'
import { Joi, validate } from '../utils/validator'

import debug from '../utils/debug'
const log = debug(__filename)

import Sequelize from 'sequelize'
const Op = Sequelize.Op

/**
 * 主页面
 * @param {*} ctx 
 * @param {*} next 
 */
const goodsTypeListPage = async(ctx, next) => {
    let goodsTypes = await models.GoodsType.findAll()
    await ctx.render('goods/goodsType/list', {
        sysStatus: ctx.query.sysStatus,
        sysMsg: ctx.query.sysMsg,
        goodsTypes
    })
}
const goodsModelListPage = async(ctx, next) => {
    let goodsModels = await models.GoodsModel.findAll({
            attributes: ['id', 'name'],
            include: [{
                model: models.GoodsType,
                attributes: ['name'],
            }]
        })
        // console.log(JSON.stringify(goodsModels, null, 2))
    await ctx.render('goods/goodsModel/list', {
        sysStatus: ctx.query.sysStatus,
        sysMsg: ctx.query.sysMsg,
        goodsModels
    })
}

const goodsQualitiesListPage = async(ctx, next) => {
    let goodsQualities = await models.GoodsQualities.findAll()
    await ctx.render('goods/goodsQualities/list', {
        sysStatus: ctx.query.sysStatus,
        sysMsg: ctx.query.sysMsg,
        goodsQualities
    })
}

const goodsListPage = async(ctx, next) => {
    let { query } = ctx.request
    query.gameId = query.gameId || 0
    query.goodsTypeId = query.goodsTypeId || 0
    query.goodsModelId = query.goodsModelId || 0
    query.goodsQualitiesId = query.goodsQualitiesId || 0
    const validateSchema = Joi.object().keys({
        page: Joi.number().label('页数'),
        gameId: Joi.number().label('游戏id'),
        goodsTypeId: Joi.number().label('游戏类型id'),
        goodsModelId: Joi.number().label('游戏号型id'),
        goodsQualitiesId: Joi.number().label('游戏品质id')
    })
    try {
        query = await validate(query, validateSchema)
        let limit = 10
        let page = query.page || 1
        let t_page = page - 1
        let offset = limit * t_page
        const games = await models.Game.findAll({ attributes: ['id', 'name'] })
        let where = {}
        let goodsModelWhere = {}
        if (query.gameId && query.gameId != 0) {
            where.game_id = query.gameId
        }
        const goodsTypes = await models.GoodsType.findAll({
            attributes: ['id', 'name']
        })
        let goodsTypeIds = []
        goodsTypes.forEach(function(element) {
            goodsTypeIds.push(element.id)
        })
        if (goodsTypeIds.length > 0) {
            goodsModelWhere = {
                goods_type_id: {
                    [Op.in]: goodsTypeIds
                }
            }
        }
        const goodsModels = await models.GoodsModel.findAll({
            attributes: ['id', 'name'],
            where: goodsModelWhere
        })

        const goodsQualities = await models.GoodsQualities.findAll({
            attributes: ['id', 'name'],
        })

        if (query.goodsTypeId && query.goodsTypeId != 0) {
            where.game_id = query.gameId
        }
        if (query.goodsModelId && query.goodsModelId != 0) {
            where.goods_model_id = query.goodsModelId
        }
        if (query.goodsQualitiesId && query.goodsQualitiesId != 0) {
            where.goods_qualities_id = query.goodsQualitiesId
        }
        const count = await models.Goods.count({
            where,
        })
        const goods = await models.Goods.findAll({
            offset,
            limit,
            where,
            include: [{
                    model: models.Game,
                    attributes: ['id', 'name'],
                },
                {
                    model: models.GoodsModel,
                    attributes: ['id', 'name'],
                },
                {
                    model: models.GoodsQualities,
                    attributes: ['id', 'name'],
                }
            ],
            order: [
                ['id', 'ASC']
            ]
        })
        console.log(JSON.stringify(goods, undefined, 2))
        await ctx.render('goods/goods/list', {
            sysStatus: ctx.query.sysStatus,
            sysMsg: ctx.query.sysMsg,
            games,
            goods,
            goodsTypes,
            goodsModels,
            goodsQualities,
            gameId: query.gameId,
            goodsModelId: query.goodsModelId,
            goodsQualitiesId: query.goodsQualitiesId,
            goodsTypeId: query.goodsTypeId,
            count,
            page,
            limit
        })
    } catch (err) {
        log('验证参数错误', err.message)
        const locals = {
            sysStatus: 'error',
            sysMsg: escape(err.message)
        }
        return ctx.redirect(`goods/goods/listPage?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    }
}



/**
 * 编辑页面
 * @param {*} ctx 
 * @param {*} next 
 */
const goodsTypeEditPage = async(ctx, next) => {
    let { query } = ctx.request
    const validateSchema = Joi.object().keys({
        goodsTypeId: Joi.number().required().label('游戏id'),
    })
    try {
        const { goodsTypeId } = await validate(query, validateSchema)
        const goodsType = await models.GoodsType.findById(goodsTypeId)
        await ctx.render('goods/goodsType/edit', {
            sysStatus: ctx.query.sysStatus,
            sysMsg: ctx.query.sysMsg,
            goodsType
        })
    } catch (err) {
        log('验证参数错误', err.message)
        const locals = {
            sysStatus: 'error',
            sysMsg: escape(err.message)
        }
        return ctx.redirect(`goods/goodsType/listPage?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    }
}

const goodsModelEditPage = async(ctx, next) => {
    let { query } = ctx.request
    const validateSchema = Joi.object().keys({
        goodsModelId: Joi.number().required().label('物品型号id'),
    })
    try {
        const { goodsModelId } = await validate(query, validateSchema)
        let goodsModel = await models.GoodsModel.findOne({
            attributes: ['id', 'name'],
            include: [{
                model: models.GoodsType,
                attributes: ['id', 'name'],
            }],
            where: { id: goodsModelId }
        })
        let goodsTypes = await models.GoodsType.findAll({
            attributes: ['id', 'name']
        })
        console.log(JSON.stringify(goodsModel, null, 2))
        await ctx.render('goods/goodsModel/edit', {
            sysStatus: ctx.query.sysStatus,
            sysMsg: ctx.query.sysMsg,
            goodsModel,
            goodsTypes
        })
    } catch (err) {
        log('验证参数错误', err.message)
        const locals = {
            sysStatus: 'error',
            sysMsg: escape(err.message)
        }
        return ctx.redirect(`goods/goodsType/listPage?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    }
}



const goodsQualitiesEditPage = async(ctx, next) => {
    let { query } = ctx.request
    const validateSchema = Joi.object().keys({
        goodsQualitiesId: Joi.number().required().label('物品品质id'),
    })
    try {
        const { goodsQualitiesId } = await validate(query, validateSchema)
        const goodsQualities = await models.GoodsQualities.findById(goodsQualitiesId)
        await ctx.render('goods/goodsQualities/edit', {
            sysStatus: ctx.query.sysStatus,
            sysMsg: ctx.query.sysMsg,
            goodsQualities
        })
    } catch (err) {
        log('验证参数错误', err.message)
        const locals = {
            sysStatus: 'error',
            sysMsg: escape(err.message)
        }
        return ctx.redirect(`goods/goodsQualities/listPage?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    }
}




const goodsEditPage = async(ctx, next) => {
    let { query } = ctx.request
    const validateSchema = Joi.object().keys({
        goodsId: Joi.number().required().label('物品id'),
    })
    try {
        const { goodsId } = await validate(query, validateSchema)
        const goods = await models.Goods.findById(goodsId)
        const games = await models.Game.findAll({ attributes: ['id', 'name'] })
        const goodsModels = await models.GoodsModel.findAll({
            attributes: ['id', 'name']
        })
        const goodsQualities = await models.GoodsQualities.findAll({
            attributes: ['id', 'name']
        })
        await ctx.render('goods/goods/edit', {
            sysStatus: ctx.query.sysStatus,
            sysMsg: ctx.query.sysMsg,
            goods,
            games,
            goodsModels,
            goodsQualities
        })
    } catch (err) {
        log('验证参数错误', err.message)
        const locals = {
            sysStatus: 'error',
            sysMsg: escape(err.message)
        }
        return ctx.redirect(`goods/goods/listPage?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    }
}





/**
 * 添加页面
 * @param {*} ctx 
 * @param {*} next 
 */
const goodsTypeAddPage = async(ctx, next) => {
    await ctx.render('goods/goodsType/add', { sysStatus: ctx.query.sysStatus, sysMsg: ctx.query.sysMsg })
}
const goodsModelAddPage = async(ctx, next) => {
    let goodsTypes = await models.GoodsType.findAll({
        attributes: ['id', 'name']
    })
    await ctx.render('goods/goodsModel/add', {
        sysStatus: ctx.query.sysStatus,
        sysMsg: ctx.query.sysMsg,
        goodsTypes
    })
}

const goodsQualitiesAddPage = async(ctx, next) => {
    await ctx.render('goods/goodsQualities/add', { sysStatus: ctx.query.sysStatus, sysMsg: ctx.query.sysMsg })
}
const goodsAddPage = async(ctx, next) => {
    const games = await models.Game.findAll({ attributes: ['id', 'name'] })
    const goodsModels = await models.GoodsModel.findAll({
        attributes: ['id', 'name']
    })
    const goodsQualities = await models.GoodsQualities.findAll({
        attributes: ['id', 'name']
    })
    await ctx.render('goods/goods/add', {
        sysStatus: ctx.query.sysStatus,
        sysMsg: ctx.query.sysMsg,
        games,
        goodsModels,
        goodsQualities
    })
}



/**
 * 添加一条记录接口
 * @param {*} ctx 
 * @param {*} next 
 */
const goodsTypeAdd = async(ctx, next) => {
    const body = ctx.request.body
        // 参数验证
    const schema = Joi.object().keys({
        name: Joi.string().required().label('名称'),
    })
    try {
        await validate(body, schema)
    } catch (err) {
        log(err)
        return Promise.reject(`验证参数出错${err.message}`)
    }
    try {
        await models.GoodsType.create(body)
    } catch (err) {
        log(err)
        return Promise.reject(err)
    }
    return Promise.resolve(true)
}

const goodsModelAdd = async(ctx, next) => {
    let body = ctx.request.body
        // 参数验证
    const schema = Joi.object().keys({
        name: Joi.string().required().label('名称'),
        goodsTypeId: Joi.number().required().label('物品类型id'),
    })
    try {
        body = await validate(body, schema)
    } catch (err) {
        log(err)
        return Promise.reject(`验证参数出错${err.message}`)
    }
    try {
        await models.GoodsModel.create({
            name: body.name,
            goods_type_id: body.goodsTypeId
        })
        return Promise.resolve(true)
    } catch (err) {
        log(err)
        return Promise.reject(err)
    }
}


const goodsQualitiesAdd = async(ctx, next) => {
    let body = ctx.request.body
        // 参数验证
    const schema = Joi.object().keys({
        name: Joi.string().required().label('名称'),
        img: Joi.string().required().label('品质图片'),
    })
    try {
        body = await validate(body, schema)
    } catch (err) {
        log(err)
        return Promise.reject(`验证参数出错${err.message}`)
    }
    try {
        await models.GoodsQualities.create({
            name: body.name,
            img: body.img
        })
        return Promise.resolve(true)
    } catch (err) {
        log(err)
        return Promise.reject(err)
    }
}


const goodsAdd = async(ctx, next) => {
    let body = ctx.request.body
        // 参数验证
    const schema = Joi.object().keys({
        gameId: Joi.number().label('游戏id'),
        goodsModelId: Joi.number().label('物品号型id'),
        goodsQualitiesId: Joi.number().label('物品品质id'),
        name: Joi.string().required().label('宝箱名称'),
        img: Joi.string().required().label('宝箱图片'),
        exchangePrice: Joi.number().required().label('兑换价格'),
        sellPrice: Joi.number().required().label('价格'),
        skinName: Joi.string().required().label('皮肤名称'),
        discrable: Joi.string().required().label('描述')
    })
    try {
        body = await validate(body, schema)
        console.log(body)
    } catch (err) {
        log(err)
        return Promise.reject(`验证参数出错${err.message}`)
    }
    try {
        await models.Goods.create({
            box_type_id: body.boxTypeId,
            game_id: body.gameId,
            goods_model_id: body.goodsModelId,
            goods_qualities_id: body.goodsQualitiesId,
            sell_price: body.sellPrice,
            skin_name: body.skinName,
            exchange_price: body.exchangePrice,
            name: body.name,
            img: body.img,
            discrable: body.discrable
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
const goodsTypeEdit = async(ctx, next) => {
    let body = ctx.request.body
        // 参数验证
    const schema = Joi.object().keys({
        goodsTypeId: Joi.number().required().label('物品类型id'),
        name: Joi.string().required().label('名称'),
    })
    try {
        body = await validate(body, schema)
    } catch (err) {
        log(err)
        return Promise.reject(`验证参数出错${err.message}`)
    }
    try {
        await models.GoodsType.update({
            name: body.name
        }, {
            where: {
                id: body.goodsTypeId
            }
        })
    } catch (err) {
        log(err)
        return Promise.reject(err)
    }
    return Promise.resolve(true)
}

const goodsModelEdit = async(ctx, next) => {
    let body = ctx.request.body
        // 参数验证
    const schema = Joi.object().keys({
        goodsTypeId: Joi.number().required().label('物品类型id'),
        goodsModelId: Joi.number().required().label('物品型号id'),
        name: Joi.string().required().label('名称'),
    })
    try {
        body = await validate(body, schema)
    } catch (err) {
        log(err)
        return Promise.reject(`验证参数出错${err.message}`)
    }
    try {
        await models.GoodsModel.update({
            name: body.name,
            goods_type_id: body.goodsTypeId
        }, {
            where: {
                id: body.goodsModelId
            }
        })
    } catch (err) {
        log(err)
        return Promise.reject(err)
    }
    return Promise.resolve(true)
}

const goodsQualitiesEdit = async(ctx, next) => {
    let body = ctx.request.body
        // 参数验证
    const schema = Joi.object().keys({
        goodsQualitiesId: Joi.number().required().label('物品品质id'),
        img: Joi.string().required().label('品质图片'),
        name: Joi.string().required().label('名称'),
    })
    try {
        body = await validate(body, schema)
    } catch (err) {
        log(err)
        return Promise.reject(`验证参数出错${err.message}`)
    }
    try {
        await models.GoodsQualities.update({
            name: body.name,
            img: body.img
        }, {
            where: {
                id: body.goodsQualitiesId
            }
        })
    } catch (err) {
        log(err)
        return Promise.reject(err)
    }
    return Promise.resolve(true)
}


const goodsEdit = async(ctx, next) => {
    let body = ctx.request.body
        // 参数验证
    const schema = Joi.object().keys({
        goodsId: Joi.number().label('物品id'),
        gameId: Joi.number().label('游戏id'),
        goodsModelId: Joi.number().label('物品号型id'),
        goodsQualitiesId: Joi.number().label('物品品质id'),
        name: Joi.string().required().label('宝箱名称'),
        img: Joi.string().required().label('宝箱图片'),
        exchangePrice: Joi.number().required().label('兑换价格'),
        sellPrice: Joi.number().required().label('价格'),
        skinName: Joi.string().required().label('皮肤名称'),
        discrable: Joi.string().required().label('描述')
    })
    try {
        body = await validate(body, schema)
        console.log(body)
    } catch (err) {
        log(err)
        return Promise.reject(`验证参数出错${err.message}`)
    }
    try {
        await models.Goods.update({
            box_type_id: body.boxTypeId,
            game_id: body.gameId,
            goods_model_id: body.goodsModelId,
            goods_qualities_id: body.goodsQualitiesId,
            sell_price: body.sellPrice,
            skin_name: body.skinName,
            exchange_price: body.exchangePrice,
            name: body.name,
            img: body.img,
            discrable: body.discrable
        }, {
            where: {
                id: body.goodsId
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
const goodsTypeDel = async(ctx, next) => {
    let { query } = ctx.request
    const validateSchema = Joi.object().keys({
        goodsTypeId: Joi.number().required().label('物品类型id'),
    })
    try {
        const { goodsTypeId } = await validate(query, validateSchema)
        await models.GoodsType.destroy({
            where: {
                id: goodsTypeId
            }
        })
        return Promise.resolve(true)
    } catch (err) {
        log('验证参数错误', err.message)
        return Promise.reject(err.message)
    }
}

const goodsModelDel = async(ctx, next) => {
    let { query } = ctx.request
    const validateSchema = Joi.object().keys({
        goodsModelId: Joi.number().required().label('物品类型id'),
    })
    try {
        const { goodsModelId } = await validate(query, validateSchema)
        await models.GoodsModel.destroy({
            where: {
                id: goodsModelId
            }
        })
        return Promise.resolve(true)
    } catch (err) {
        log('验证参数错误', err.message)
        return Promise.reject(err.message)
    }
}

const goodsQualitiesDel = async(ctx, next) => {
    let { query } = ctx.request
    const validateSchema = Joi.object().keys({
        goodsQualitiesId: Joi.number().required().label('物品类型id'),
    })
    try {
        const { goodsQualitiesId } = await validate(query, validateSchema)
        await models.GoodsQualities.destroy({
            where: {
                id: goodsQualitiesId
            }
        })
        return Promise.resolve(true)
    } catch (err) {
        log('验证参数错误', err.message)
        return Promise.reject(err.message)
    }
}


const goodsDel = async(ctx, next) => {
    let { query } = ctx.request
    const validateSchema = Joi.object().keys({
        goodsId: Joi.number().required().label('物品id'),
    })
    try {
        const { goodsId } = await validate(query, validateSchema)
        await models.Goods.destroy({
            where: {
                id: goodsId
            }
        })
        return Promise.resolve(true)
    } catch (err) {
        log('验证参数错误', err.message)
        return Promise.reject(err.message)
    }
}



export default {
    //物品分类
    goodsTypeListPage,
    goodsTypeEditPage,
    goodsTypeAddPage,
    goodsTypeAdd,
    goodsTypeEdit,
    goodsTypeDel,

    //物品模式
    goodsModelListPage,
    goodsModelEditPage,
    goodsModelAddPage,
    goodsModelAdd,
    goodsModelEdit,
    goodsModelDel,

    //物品品质
    goodsQualitiesListPage,
    goodsQualitiesAddPage,
    goodsQualitiesEditPage,
    goodsQualitiesAdd,
    goodsQualitiesEdit,
    goodsQualitiesDel,

    //物品
    goodsListPage,
    goodsAddPage,
    goodsEditPage,
    goodsAdd,
    goodsEdit,
    goodsDel
}