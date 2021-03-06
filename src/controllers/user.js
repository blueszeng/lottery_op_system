import menuConfig from '../configs/menu'
import generate from '../utils/menu'
import util from '../utils/util'
import models from '../models/index'
import {
    Joi,
    validate
} from '../utils/validator'
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
    let { query } = ctx.request
    query.uid = query.uid || 0
    const validateSchema = Joi.object().keys({
        page: Joi.number().label('页数'),
        uid: Joi.number().label('用户id'),
    })
    try {
        query = await validate(query, validateSchema)

        let limit = 10
        let page = query.page || 1
        let t_page = page - 1
        let offset = limit * t_page
        let where = {}
        if (query.uid > 0) {
            where.id = query.uid
        }
        const count = await models.User.count({
            where,
        })
        let userArr = await models.User.findAll({
            offset,
            limit,
            where
        })
        await ctx.render('user/list', {
            sysStatus: ctx.query.sysStatus,
            sysMsg: ctx.query.sysMsg,
            count,
            page,
            limit,
            uid: query.uid > 0 ? query.uid : "",
            userArr
        })
    } catch (err) {
        log('验证参数错误', err.message)
        const locals = {
            sysStatus: 'error',
            sysMsg: escape(err.message)
        }
        return ctx.redirect(`user/listPage?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    }
}

/**
 * 宝箱
 * @param {*} ctx
 * @param {*} next
 */
const boxListPage = async(ctx, next) => {
    let { query } = ctx.request
    query.uid = query.uid || 0
    const validateSchema = Joi.object().keys({
        page: Joi.number().label('页数'),
        uid: Joi.number().label('用户id'),
    })
    try {
        query = await validate(query, validateSchema)

        let limit = 10
        let page = query.page || 1
        let t_page = page - 1
        let offset = limit * t_page
        let where = {}
        if (query.uid > 0) {
            where.uid = query.uid
        }
        const count = await models.UserBox.count({
            where,
        })
        let userArr = await models.UserBox.findAll({
            include: [{
                    model: models.Box,
                    attributes: ['id', 'name']
                },
                {
                    model: models.User,
                    attributes: ['id', 'name']
                }
            ],
            where
        })
        console.log("=======boxListPage   ================");
        console.log(userArr);

        await ctx.render('user/boxList', {
            sysStatus: ctx.query.sysStatus,
            sysMsg: ctx.query.sysMsg,
            userArr,
            count,
            page,
            limit,
            uid: query.uid > 0 ? query.uid : "",
        })
    } catch (err) {
        log('验证参数错误', err.message)
        const locals = {
            sysStatus: 'error',
            sysMsg: escape(err.message)
        }
        return ctx.redirect(`user/boxList?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    }
}

/**
 * 主页面物品
 * @param {*} ctx
 * @param {*} next
 */
const goodsListPage = async(ctx, next) => {
    let { query } = ctx.request
    query.uid = query.uid || 0
    const validateSchema = Joi.object().keys({
        page: Joi.number().label('页数'),
        uid: Joi.number().label('用户id'),
    })
    try {
        query = await validate(query, validateSchema)

        let limit = 10
        let page = query.page || 1
        let t_page = page - 1
        let offset = limit * t_page
        let where = {}
        if (query.uid > 0) {
            where.uid = query.uid
        }
        const count = await models.UserGoods.count({
            where,
        })
        let userArr = await models.UserGoods.findAll({
            include: [{
                    model: models.Goods,
                    attributes: ['id', 'name']
                },
                {
                    model: models.User,
                    attributes: ['id', 'name']
                }
            ],
            where
        })
        await ctx.render('user/goodsList', {
            sysStatus: ctx.query.sysStatus,
            sysMsg: ctx.query.sysMsg,
            userArr,
            count,
            page,
            limit,
            uid: query.uid > 0 ? query.uid : "",
        })
    } catch (err) {
        log('验证参数错误', err.message)
        const locals = {
            sysStatus: 'error',
            sysMsg: escape(err.message)
        }
        return ctx.redirect(`user/goodsList?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    }
}

/**
 * 主页面
 * @param {*} ctx
 * @param {*} next
 */
const rechargeListPage = async(ctx, next) => {
    let { query } = ctx.request
    query.uid = query.uid || 0
    query.sdcustomno = query.sdcustomno || ""
    const validateSchema = Joi.object().keys({
        page: Joi.number().label('页数'),
        sdcustomno: Joi.string().empty('').label('订单ID'),
        uid: Joi.number().label('用户id'),
    })
    try {
        query = await validate(query, validateSchema)
        let limit = 10
        let page = query.page || 1
        let t_page = page - 1
        let offset = limit * t_page
        let where = {}
        if (query.uid > 0) {
            where.uid = query.uid
        }
        if (query.sdcustomno && query.sdcustomno != "") {
            where.sdcustomno = query.sdcustomno
        }
        const count = await models.Order.count({
            where,
        })
        let userArr = await models.Order.findAll({
            include: [{
                model: models.User,
                attributes: ['id', 'name']
            }],
            where
        })
        await ctx.render('user/rechargeList', {
            sysStatus: ctx.query.sysStatus,
            sysMsg: ctx.query.sysMsg,
            userArr,
            count,
            page,
            limit,
            uid: query.uid > 0 ? query.uid : "",
            orderId: query.sdcustomno ? query.sdcustomno : ""
        })
    } catch (err) {
        log('验证参数错误', err.message)
        const locals = {
            sysStatus: 'error',
            sysMsg: escape(err.message)
        }
        return ctx.redirect(`user/rechargeList?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    }
}


/**
 * 主页面
 * @param {*} ctx
 * @param {*} next
 */
const winPrizePushListPage = async(ctx, next) => {
    let {
        query
    } = ctx.request
    query.uid = query.uid || 0
    const validateSchema = Joi.object().keys({
        page: Joi.number().label('页数'),
        uid: Joi.number().label('用户id')
    })
    try {
        query = await validate(query, validateSchema)

        let limit = 10
        let page = query.page || 1
        let t_page = page - 1
        let offset = limit * t_page
        let where = {}
        if (query.uid > 0) {
            where.uid = query.uid
        }
        const count = await models.WinPrizePush.count({
            where,
        })

        let userArr = await models.WinPrizePush.findAll({
            include: [{
                    model: models.User,
                    attributes: ['id', 'name']
                },
                {
                    model: models.Goods,
                    attributes: ['id', 'name']
                }
            ],
            offset,
            limit,
            where

        })
        await ctx.render('user/winPrizePushList', {
            sysStatus: ctx.query.sysStatus,
            sysMsg: ctx.query.sysMsg,
            userArr,
            limit,
            page,
            uid: query.uid > 0 ? query.uid : "",
            count
        })


    } catch (err) {
        console.log("错误");
        log('验证参数错误', err.message)
        const locals = {
            sysStatus: 'error',
            sysMsg: escape(err.message)
        }
        return ctx.redirect(`user/winPrizePushList?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    }
    // let userArr = await models.WinPrizePush.findAll({
    //     include: [{
    //             model: models.User,
    //             attributes: ['id', 'name']
    //         },
    //         {
    //             model: models.Goods,
    //             attributes: ['id', 'name']
    //         }
    //     ]
    // })
    // await ctx.render('user/winPrizePushList', {
    //     sysStatus: ctx.query.sysStatus,
    //     sysMsg: ctx.query.sysMsg,
    //     userArr
    // })
}


/**
 * 主页面
 * @param {*} ctx
 * @param {*} next
 */
const giveGoodsListPage = async(ctx, next) => {
    let { query } = ctx.request
    query.uid = query.uid || 0
    query.sdcustomno = query.sdcustomno || ""
    const validateSchema = Joi.object().keys({
        page: Joi.number().label('页数'),
        sdcustomno: Joi.string().empty('').label('订单ID'),
        uid: Joi.number().label('用户id'),
    })
    try {
        console.log(query)
        query = await validate(query, validateSchema)
        let limit = 10
        let page = query.page || 1
        let t_page = page - 1
        let offset = limit * t_page
        let where = {}
        if (query.uid > 0) {
            where.send_uid = query.uid
        }
        if (query.sdcustomno && query.sdcustomno != "") {
            where.orderid = query.sdcustomno
        }
        console.log(where)
        const count = await models.GiveGoods.count({
            where,
        })
        let userArr = await models.GiveGoods.findAll({
            include: [{
                    model: models.Goods,
                    attributes: ['id', 'name']
                },
                {
                    model: models.User,
                    as: 'SendUser',
                    attributes: ['id', 'name']
                }, {
                    model: models.User,
                    as: 'RecvUser',
                    attributes: ['id', 'name']
                }
            ],
            where
        })
        console.log(query.orderId ? query.orderId : "")
        await ctx.render('user/giveGoodsList', {
            sysStatus: ctx.query.sysStatus,
            sysMsg: ctx.query.sysMsg,
            userArr,
            count,
            page,
            limit,
            uid: query.uid > 0 ? query.uid : "",
            orderId: query.sdcustomno ? query.sdcustomno : ""
        })
    } catch (err) {
        console.log("错误");
        log('验证参数错误', err.message)
        const locals = {
            sysStatus: 'error',
            sysMsg: escape(err.message)
        }
        return ctx.redirect(`user/giveGoodsList?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    }
}


export default {
    listPage,
    boxListPage,
    goodsListPage,
    rechargeListPage,
    winPrizePushListPage,
    giveGoodsListPage
}