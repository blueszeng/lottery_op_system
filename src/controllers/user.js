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
    let {
        query
    } = ctx.request
    let userArr = await models.User.findAll()
    await ctx.render('user/list', {
        sysStatus: ctx.query.sysStatus,
        sysMsg: ctx.query.sysMsg,
        userArr
    })
}

/**
 * 宝箱
 * @param {*} ctx
 * @param {*} next
 */
const boxListPage = async(ctx, next) => {
    let {
        query
    } = ctx.request
    let userArr = await models.UserBox.findAll({
        include: [{
                model: models.Box,
                attributes: ['id', 'name']
            },
            {
                model: models.User,
                attributes: ['id', 'name']
            }
        ]
    })
    await ctx.render('user/boxList', {
        sysStatus: ctx.query.sysStatus,
        sysMsg: ctx.query.sysMsg,
        userArr
    })
}

/**
 * 主页面物品
 * @param {*} ctx
 * @param {*} next
 */
const goodsListPage = async(ctx, next) => {
        let {
            query
        } = ctx.request
        let userArr = await models.UserGoods.findAll({
            include: [{
                    model: models.Goods,
                    attributes: ['id', 'name']
                },
                {
                    model: models.User,
                    attributes: ['id', 'name']
                }
            ]
        })
        await ctx.render('user/goodsList', {
            sysStatus: ctx.query.sysStatus,
            sysMsg: ctx.query.sysMsg,
            userArr
        })
    }
    /**
     * 主页面
     * @param {*} ctx
     * @param {*} next
     */
const rechargeListPage = async(ctx, next) => {
    let {
        query
    } = ctx.request
    let userArr = await models.Order.findAll({
        include: [{
            model: models.User,
            attributes: ['id', 'name']
        }]
    })
    await ctx.render('user/rechargeList', {
        sysStatus: ctx.query.sysStatus,
        sysMsg: ctx.query.sysMsg,
        userArr
    })
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
    let userArr = await models.WinPrizePush.findAll({
        include: [{
            model: models.User,
            attributes: ['id', 'name']
        },
        {
            model: models.Goods,
            attributes: ['id', 'name']
        }]
    })
    await ctx.render('user/winPrizePushList', {
        sysStatus: ctx.query.sysStatus,
        sysMsg: ctx.query.sysMsg,
        userArr
    })
}


/**
 * 主页面
 * @param {*} ctx
 * @param {*} next
 */
const giveGoodsListPage = async(ctx, next) => {
    let {
        query
    } = ctx.request
    let userArr = await models.GiveGoods.findAll({
        include: [{
            model: models.User,
            attributes: ['id', 'name']
        },
        {
            model: models.Goods,
            attributes: ['id', 'name']
        },
        {
            model: models.User,
            // attributes:['u',['id', 'name']] 
            attributes: { include: [[['id', 'name'], 'no_hats']] }
        }]
    })

    console.log(JSON.stringify(userArr, undefined, 2))
    console.log('============user giveGoodsListPage ========================');
    await ctx.render('user/giveGoodsList', {
        sysStatus: ctx.query.sysStatus,
        sysMsg: ctx.query.sysMsg,
        userArr
    })
}


export default {
    listPage,
    boxListPage,
    goodsListPage,
    rechargeListPage,
    winPrizePushListPage,
    giveGoodsListPage
}