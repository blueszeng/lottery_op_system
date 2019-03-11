import log from '../../../modules/init'
import http from '../../../modules/http'
import { getServer } from '../../../configs/config'
import $ from 'jquery'


// 删除
async function goods_model_del(obj, id) {
    layer.confirm('确认要删除吗？', async function(index) {
        try {
            let data = { goodsModelId: id }
            let serve = getServer('GOODSMODEL', 'DEL')
            await http[serve.method](serve.url, data)
            $(obj).parents('tr').remove()
            layer.msg('已删除!', { icon: 1, time: 1000 })
        } catch (err) {
            log(err.message)
            layer.msg('删除失败!', { icon: 1, time: 1000 })
        }
    })
}


// 入口
(async function main() {
    console.log(goods_model_del) // 没有调用的函数需要引用下,不然会被打包工具优化掉
})()