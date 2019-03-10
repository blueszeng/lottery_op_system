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
const goodsTypeListPage = async(ctx, next) => {
    let offset = ctx.query.offset || 0
    let limit = ctx.query.limit || 10
    let goodsTypes = await models.GoodsType.findAll({ offset, limit })
    await ctx.render('goods/goodsType/list', {
        sysStatus: ctx.query.sysStatus,
        sysMsg: ctx.query.sysMsg,
        goodsTypes
    })
}
const goodsModelListPage = async(ctx, next) => {
    let offset = ctx.query.offset || 0
    let limit = ctx.query.limit || 10
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
    goodsModelDel
}