import log from '../../modules/init'
import http from '../../modules/http'
import { getServer } from '../../configs/config'
import $ from 'jquery'


// 审核通过
async function goods_exchange_sure(obj, id, state) {
    layer.confirm('审核通过', async function(index) {
        try {
            let data = { goodsExchangeId: id, state: state }
            let serve = getServer('EXCHANG', 'SURE')
            await http[serve.method](serve.url, data)
            parent.location.reload() // 刷新
        } catch (err) {
            log(err.message)
            layer.msg('请求失败!', { icon: 1, time: 1000 })
        }
    })
}

// 审核拒绝
async function goods_exchange_repulse(obj, id) {
    layer.confirm('审核拒绝？', async function(index) {
        try {
            let data = { goodsExchangeId: id, state: state }
            let serve = getServer('EXCHANG', 'REPULES')
            await http[serve.method](serve.url, data)
            parent.location.reload() // 刷新
        } catch (err) {
            log(err.message)
            layer.msg('删除失败!', { icon: 1, time: 1000 })
        }
    })
}


// 入口
(async function main() {
    console.log(goods_exchange_sure)
    console.log(goods_exchange_repulse)

})()