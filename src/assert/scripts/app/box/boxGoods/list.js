import log from '../../../modules/init'
import http from '../../../modules/http'
import { pagination } from '../../../modules/pagination'
import { getServer } from '../../../configs/config'
import $ from 'jquery'


// 图片-删除
async function box_goods_del(obj, id) {
    layer.confirm('确认要删除吗？', async function(index) {
        try {
            let data = { boxGoodsId: id }
            let serve = getServer('BOXGOODS', 'DEL')
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
    console.log(box_goods_del)
    console.log(pagination)
    $('#search').click(async(event) => {
        /* Act on the event */
        let gameId = $('#gameId').val()
        let boxTypeId = $('#boxTypeId').val()
        let boxName = $('#boxName').val()
        let serve = getServer('BOXGOODS', 'SEARCH')
        if (boxTypeId === undefined) {
            boxTypeId = 0
        }
        console.log(boxTypeId)
        window.location.href = `${serve.url}?gameId=${parseInt(gameId)}&boxTypeId=${parseInt(boxTypeId)}&boxName=${boxName}`
    })
})()