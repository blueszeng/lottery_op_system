import log from '../../modules/init'
import http from '../../modules/http'
import { SERVER_URL } from '../../configs/config'
import $ from 'jquery'


// 入口
(async function main() {
    $('#article_save_submit').click(async(event) => {
        /* Act on the event */
        let data = {
            icon: '',
            name: '',
            zone_config: ''
        }
        try {
            let ret = await http.post(`${SERVER_URL}/game/add`, data)
            log(ret)
        } catch (err) {
            log('出错了要处理出错的情况')
        }
    })
})()