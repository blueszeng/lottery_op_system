import _ from 'lodash'
import _debug from 'debug'
import ValidationError from '../utils/error/ValidationError'
const debug = _debug('utils:wrapRoute')

const wrapRoute = (fn, ...args) => {
    return async(ctx) => {
        const reqId = ctx.state.reqId
        const isPost = ctx.method === 'POST'
        console.log('2232323')
        try {
            const data = await fn.apply(ctx, [ctx, ...args])
            ctx.status = isPost ? 201 : 200
            ctx.body = { reqId, data }
        } catch (err) {
            if (_.isPlainObject(err)) {
                debug('服务处理异常: %s', JSON.stringify(err))
                debug(err.stack)
                ctx.status = err.status || 510
                ctx.body = { reqId, message: err.message || '服务处理异常' }
            } else if (_.isError(err)) {
                // 校验错误或者其他错误
                if (err instanceof ValidationError) {
                    ctx.status = isPost ? 422 : 412
                    ctx.body = { reqId, message: err.message }
                } else {
                    // 在async链式调用中未被catch的错误或者已定义的其它类型错误
                    debug('其它错误: %s', JSON.stringify(err))
                    debug(err.stack)
                    ctx.status = 510
                    ctx.body = { reqId, message: '无法执行所需的请求' }
                }
            } else if (_.isString(err)) {
                // 明确通过promise.reject返回的错误内容
                debug('服务处理异常: %s', JSON.stringify(err))
                debug(err.stack)
                ctx.status = 510
                ctx.body = { reqId, message: err }
            } else {
                debug('服务处理异常: %s', JSON.stringify(err))
                debug(err.stack)
                ctx.status = 500
                ctx.body = { reqId, message: '服务处理异常' }
            }
        }
    }
}

const wrapAllRoute = (controllerObject) => {
    for (let i in controllerObject) {
        if (_.isFunction(controllerObject[i])) {
            controllerObject[i] = wrapRoute(controllerObject[i])
        }
    }
}


export {
    wrapRoute,
    wrapAllRoute
}