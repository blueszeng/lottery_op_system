import log from '../../modules/init'
import http from '../../modules/http'
import { getServerUrl } from '../../configs/config'
import $ from 'jquery'


// 图片-删除
async function picture_dels(obj, id) {
    layer.confirm('确认要删除吗？', async function(index) {
        try {
            let data = { gameId: id }
            await http.get(getServerUrl('GAME', 'DEL'), data)
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
    console.log(picture_dels)
})()