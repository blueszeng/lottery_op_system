import path from 'path'
import Koa from 'koa'
import session from 'koa-generic-session'
import convert from 'koa-convert'
import json from 'koa-json'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import koaBody from 'koa-body'
import koaRedis from 'koa-redis'
import render, { template } from 'koa-art-template'
import config from './configs/config'
import router from './routes'
import middlewares from './middlewares'
import sd from 'silly-datetime'

const redisStore = koaRedis({
    url: config.redisUrl
})

const app = new Koa()
app.keys = [config.secretKeyBase]
if (config.serveStatic) {
    app.use(convert(require('koa-static')(path.join(__dirname, './public'), { format: false })))
}
app.use(convert(session({
    store: redisStore,
    prefix: 'boss:sess:',
    key: 'boss.sid'
})))

app.use(koaBody())

// app.use(bodyParser())

// app.use(convert(json()))

// app.use(convert(logger()))

render(app, {
    root: path.join(__dirname, 'views'), // 视图的位置
    extname: '.art', // 后缀名
    debug: process.env.NODE_ENV !== 'production' //是否开启调试模式
})

// 扩展时间模板方法
template.defaults.imports.dateFormat = function(value) {
    return sd.format(new Date(value), 'YYYY-MM-DD HH:mm')
}

template.defaults.imports.jsonParseon = function(value) {
    return JSON.parse(value)
}
template.defaults.imports.jsonStringify = function(value) {
    return JSON.stringify(value)
}
template.defaults.imports.cover_state = function(value) {
    var name=""
    switch (value) {
        case 1:
            name="通过"
            break;
        case 2:
            name="拒绝"
            break;
        default:
            name="待处理"
            break;
    }
    return name
}

template.defaults.imports.pay_type = function(value) {
    var name="微信"
        if(value == 1){
            name="支付宝"
        }
    return name
}

template.defaults.imports.recharge_state = function(value) {
    var name=""
    switch (value) {
        case 1:
            name="失败"
            break;
        case 2:
            name="成功"
            break;
        default:
            name="未知"
            break;
    }
    return name
}

template.defaults.imports.winPrizePush_type = function(value) {
    var name=""
    switch (value) {
        case 1:
            name="开宝箱"
            break;
        case 2:
            name="兑换"
            break;
        default:
            name="幸运一博"
            break;
    }
    return name
}



global.getApp = () => {
    return app
}


app.use(middlewares.catchError)
app.use(middlewares.addHelper)
app.use(router.routes(), router.allowedMethods())
console.log(config.port)
app.listen(config.port)