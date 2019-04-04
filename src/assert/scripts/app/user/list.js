import log from '../../modules/init'
import { pagination } from '../../modules/pagination'

import http from '../../modules/http'
import { getServer } from '../../configs/config'
import $ from 'jquery'

// 入口
(async function main() {
    log(pagination)
    $('#search').click(async(event) => {
        /* Act on the event */
        let uid = $('#uid').val()
        let serve = getServer('USER', 'SEARCH')
        window.location.href = `${serve.url}?uid=${uid}`
    })
})()