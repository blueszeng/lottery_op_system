import log from '../../../modules/init'
import http from '../../../modules/http'
import { getServer } from '../../../configs/config'
import $ from 'jquery'


// 入口
(async function main() {
    $('#boxType_save_submit').click(async(event) => {
        /* Act on the event */
        try {
            let data = {
                name: $('#name').val(),
                level: $('#level').val()
            }
            let serve = getServer('BOXTYPE', 'ADD')
            await http[serve.method](serve.url, data)
            layer.msg('添加成功!', { icon: 1, time: 1000 })
            $('#name').val('')
            $('#level').val('')
        } catch (err) {
            log(err.message)
            layer.msg('添加失败!', { icon: 1, time: 1000 })
        }
    })
})()