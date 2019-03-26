import menuConfig from '../configs/menu'
import generate from '../utils/menu'
import util from '../utils/util'
import models from '../models/index'
import {Joi, validate} from '../utils/validator'
import Sequelize from 'sequelize'
const Op = Sequelize.Op

import debug from '../utils/debug'
const log = debug(__filename)
/**
 * 主页面
 * @param {*} ctx
 * @param {*} next
 */
const listPage = async(ctx, next) => {
    let {query} = ctx.request
    let ExchangeGoods = await models
        .ExchangeGoods
        .findAll({
            include: [
                {
                    model: models.Game,
                    attributes: ['id', 'name']
                },
                {
                    model: models.User,
                    attributes: ['id', 'name']
                },
                {
                    model: models.Goods,
                    attributes: ['id', 'name']
                }
            ],
            where: {
                state: 0
            }
        })
    // console.log(JSON.stringify(ExchangeGoods, undefined, 2))
    // console.log('====================================');
    await ctx.render('ExchangeGoods/list', {
        sysStatus: ctx.query.sysStatus,
        sysMsg: ctx.query.sysMsg,
        ExchangeGoods
    })
}
/**
 * 已兑换
 * @param {*} ctx
 * @param {*} next
 */
const listTowPage = async(ctx, next) => {
    let {query} = ctx.request
    let ExchangeGoods = await models
        .ExchangeGoods
        .findAll({
            include: [
                {
                    model: models.Game,
                    attributes: ['id', 'name']
                },
                {
                    model: models.User,
                    attributes: ['id', 'name']
                },
                {
                    model: models.Goods,
                    attributes: ['id', 'name']
                }
            ],
            where: {
                state: {
                    [Op.gt]: 0
                }
            }
        })
    // console.log(JSON.stringify(ExchangeGoods, undefined, 2))
    // console.log('====================================');
    await ctx.render('ExchangeGoods/listTow', {
        sysStatus: ctx.query.sysStatus,
        sysMsg: ctx.query.sysMsg,
        ExchangeGoods
    })
}
const sure = async(ctx, next) => {
    const query = ctx.request.query
    // 参数验证
    const schema = Joi
        .object()
        .keys({
            goodsExchangeId: Joi
                .string()
                .required()
                .label('兑换id'),
            state: Joi
                .number()
                .required()
                .min(0)
                .max(2)
                .label('兑换id')
        })
    try {
        await validate(query, schema)
    } catch (err) {
        log(err)
        return Promise.reject(`验证参数出错${err.message}`)
    }
    try {
        try {
            await models
                .ExchangeGoods
                .update({
                    state: query.state
                }, {
                    where: {
                        id: query.goodsExchangeId
                    }
                })
        } catch (err) {
            log(err)
            return Promise.reject(err)
        }
    } catch (err) {
        log(err)
        return Promise.reject(err)
    }
    return Promise.resolve(true)
}

const repulse = async(ctx, next) => {
    const query = ctx.request.query
    // 参数验证
    const schema = Joi
        .object()
        .keys({
            goodsExchangeId: Joi
                .string()
                .required()
                .label('xxx')
        })
    try {
        await validate(query, schema)
    } catch (err) {
        log(err)
        return Promise.reject(`验证参数出错${err.message}`)
    }
    try {
        await models
            .GoodsType
            .create(body)
    } catch (err) {
        log(err)
        return Promise.reject(err)
    }
    return Promise.resolve(true)
}

export default {
    listPage,
    sure,
    repulse,
    listTowPage
}