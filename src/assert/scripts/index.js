import log from './modules/init'
import http from './modules/http'


// 入口
(async function main() {
    log('23223')
    let ret = await http.get('http://127.0.0.1:3000/test', {})
    console.log(ret)
})()