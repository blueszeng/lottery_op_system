import log from '../../modules/init'
import http from '../../modules/http'
import { getServerUrl } from '../../configs/config'
import $ from 'jquery'


// 入口
(async function main() {
    $('#article_save_submit').click(async(event) => {
        /* Act on the event */
        let data = {
            icon: $('#icon').val(),
            name: $('#name').val(),
            zone_config: $('#zone_config').val()
        }
        try {
            let ret = await http.post(getServerUrl('GAME', 'ADD'), data)
            log(ret)
        } catch (err) {
            log('出错了要处理出错的情况', err.message)
        }
    })
})()