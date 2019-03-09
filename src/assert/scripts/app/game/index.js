import log from '../../modules/init'
import http from '../../modules/http'
import { getServer } from '../../configs/config'
import $ from 'jquery'


// 图片-删除
async function picture_dels(obj, id) {
    layer.confirm('确认要删除吗？', async function(index) {
        try {
            let data = { gameId: id }
            let serve = getServer('GAME', 'DEL')
            await http[serve.method](serve.url, data)
            $(obj).parents('tr').remove()
            layer.msg('已删除!', { icon: 1, time: 1000 })
        } catch (err) {
            log(err.message)
            layer.msg('删除失败!', { icon: 1, time: 1000 })
        }
    })
}

async function picture_stops(obj, id) {
    layer.confirm('确认要下架吗？', async function(index) {
        try {
            let data = { gameId: id }
            let serve = getServer('GAME', 'OPEN')
            await http[serve.method](serve.url, data)
            $(obj).parents('tr').find('.td-manage').prepend(`<a style="text-decoration:none" onClick="picture_starts(this,${id})" href="javascript:;" title="发布">发布</a>`)
            $(obj).parents('tr').find('.td-status').html('<span class="label label-defaunt radius">已下架</span>')
            $(obj).remove()
            layer.msg('已下架!', { icon: 5, time: 1000 })
        } catch (err) {
            log(err.message)
            layer.msg('下架失败!', { icon: 1, time: 1000 })
        }
    })
}

async function picture_starts(obj, id) {
    layer.confirm('确认要发布吗？', async function(index) {
        try {
            let data = { gameId: id }
            let serve = getServer('GAME', 'OPEN')
            await http[serve.method](serve.url, data)
            $(obj).parents('tr').find('.td-manage').prepend(`<a style="text-decoration:none" onClick="picture_stops(this,${id})" href="javascript:;" title="下架">下架</a>`)
            $(obj).parents('tr').find('.td-status').html('<span class="label label-success radius">已发布</span>')
            $(obj).remove()
            layer.msg('已发布!', { icon: 6, time: 1000 })
        } catch (err) {
            log(err.message)
            layer.msg('发布失败!', { icon: 1, time: 1000 })
        }
    })
}


// 入口
(async function main() {
    console.log(picture_dels)
    console.log(picture_stops)
    console.log(picture_starts)
})()