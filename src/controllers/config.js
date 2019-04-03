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
 * 编辑页面
 * @param {*} ctx 
 * @param {*} next 
 */
const editPage = async(ctx, next) => {
    let configs = await models.Config.findAll()
    await ctx.render('config/edit', {
        sysStatus: ctx.query.sysStatus,
        sysMsg: ctx.query.sysMsg,
        configs
    })
}


/**
 * 编辑一条记录
 * @param {*} ctx 
 * @param {*} next 
 */
const edit = async(ctx, next) => {
    let body = ctx.request.body
    const schema = Joi.array().items(
        Joi.object({
            key: Joi.string(),
            value: Joi.string(),
            discrable: Joi.string()
        })
    )
    try {
        body = await validate(body, schema)
    } catch (err) {
        log(err)
        return Promise.reject(`验证参数出错${err.message}`)
    }
    try {
        await models.Config.destroy({
            where: {
                id: {
                    [Op.gt]: 0
                }
            }
        })
        for (let i in body) {
            await models.Config.create(body[i])
        }
        return Promise.resolve(true)
    } catch (err) {
        log(err)
        return Promise.reject(err.message)
    }
}


export default {
    editPage,
    edit
}