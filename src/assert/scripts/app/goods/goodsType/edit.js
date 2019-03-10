import log from '../../../modules/init'
import http from '../../../modules/http'
import { getServer } from '../../../configs/config'
import $ from 'jquery'

// 入口
(async function main() {
    $('#goodsType_update_submit').click(async(event) => {
        /* Act on the event */
        let data = {
            goodsTypeId: $('#goodsType_id').val(),
            name: $('#name').val()
        }
        try {
            let serve = getServer('GOODSTYPE', 'EDIT')
            let v = await http[serve.method](serve.url, data)
            layer.msg('编辑成功!', { icon: 1, time: 500 }, function() {
                let index = parent.layer.getFrameIndex(window.name)
                parent.layer.close(index)
                parent.location.reload() // 父页面刷新
            })
        } catch (err) {
            log(err.message)
            layer.msg('编辑失败!', { icon: 1, time: 1000 })
        }
    })
})()