import log from '../../../modules/init'
import http from '../../../modules/http'
import { pagination } from '../../../modules/pagination'
import { getServer } from '../../../configs/config'
import $ from 'jquery'


// 图片-删除
async function box_del(obj, id) {
    layer.confirm('确认要删除吗？', async function(index) {
        try {
            let data = { boxId: id }
            let serve = getServer('BOX', 'DEL')
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
    console.log(box_del)
    console.log(pagination)
    $('#search').click(async(event) => {
        /* Act on the event */
        let val = $('#gameId').val()
        let serve = getServer('BOX', 'SEARCH')
        console.log(`${serve.url}?gameId=${val}`)
        window.location.href = `${serve.url}?gameId=${val}`
    })
})()