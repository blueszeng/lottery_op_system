import log from '../../modules/init'
import http from '../../modules/http'
import upload from '../../modules/upload'
import { getServer } from '../../configs/config'
import $ from 'jquery'

// 入口
(async function main() {
    $('#config_update_submit').click(async(event) => {
        /* Act on the event */
        var arrUl = $('.form > .row > .form-controls')
        let data = []
        $.each(arrUl, function() {
            data.push({
                discrable: $(this).find('input').attr('name'),
                key: $(this).find('input').attr('id'),
                value: $(this).find('input').val()
            })
        })
        try {
            let serve = getServer('CONFIG', 'EDIT')
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