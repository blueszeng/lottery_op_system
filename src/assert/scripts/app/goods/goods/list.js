import log from '../../../modules/init'
import http from '../../../modules/http'
import { pagination } from '../../../modules/pagination'
import { getServer } from '../../../configs/config'
import $ from 'jquery'


// 图片-删除
async function goods_del(obj, id) {
    layer.confirm('确认要删除吗？', async function(index) {
        try {
            let data = { goodsId: id }
            let serve = getServer('GOODS', 'DEL')
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
    console.log(goods_del)
    console.log(pagination)
    $('#search').click(async(event) => {
        /* Act on the event */
        let gameId = $('#gameId').val()
        let goodsTypeId = $('#goodsTypeId').val()
        let goodsModelId = $('#goodsModelId').val()
        let goodsQualitiesId = $('#goodsQualitiesId').val()
        let serve = getServer('GOODS', 'SEARCH')
        window.location.href = `${serve.url}?gameId=${gameId}&goodsTypeId=${goodsTypeId}&goodsModelId=${goodsModelId}&goodsQualitiesId=${goodsQualitiesId}`
    })
})()