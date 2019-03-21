import menuConfig from '../configs/menu'
import generate from '../utils/menu'
import util from '../utils/util'
import models from '../models/index'
import { Joi, validate } from '../utils/validator'

import debug from '../utils/debug'

/**
 * 主页面
 * @param {*} ctx 
 * @param {*} next 
 */
const listPage = async(ctx, next) => {
    console.log("==========");
    
    let { query } = ctx.request
    let ExchangeGoods = await models.ExchangeGoods.findAll()
    console.log("===========================================");
    
    await ctx.render('ExchangeGoods/list', {
        sysStatus: ctx.query.sysStatus,
        sysMsg: ctx.query.sysMsg,
        ExchangeGoods
    })
}


export default {
    listPage,
}