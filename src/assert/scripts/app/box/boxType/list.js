import log from '../../../modules/init'
import http from '../../../modules/http'
import { getServer } from '../../../configs/config'
import $ from 'jquery'


// 图片-删除
async function box_type_del(obj, id) {
    layer.confirm('确认要删除吗？', async function(index) {
        try {
            let data = { boxTypeId: id }
            let serve = getServer('BOXTYPE', 'DEL')
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
    console.log(box_type_del)
})()