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

    $('#search1').click(async(event) => {
        /* Act on the event */
        let uid = $('#uid').val()
        let serve = getServer('USER', 'SEARCH1')
        window.location.href = `${serve.url}?uid=${uid}`
    })

    $('#search2').click(async(event) => {
        /* Act on the event */
        let uid = $('#uid').val()
        let sdcustomno = $('#sdcustomno').val()
        let serve = getServer('USER', 'SEARCH2')
        window.location.href = `${serve.url}?uid=${uid}&sdcustomno=${sdcustomno}`
    })

    $('#search3').click(async(event) => {
        /* Act on the event */
        let uid = $('#uid').val()
        let serve = getServer('USER', 'SEARCH3')
        window.location.href = `${serve.url}?uid=${uid}`
    })

    $('#search4').click(async(event) => {
        /* Act on the event */
        let uid = $('#uid').val()
        let serve = getServer('USER', 'SEARCH4')
        console.log(`${serve.url}?uid=${uid}`)
        window.location.href = `${serve.url}?uid=${uid}`
    })
    $('#search5').click(async(event) => {
        /* Act on the event */
        let uid = $('#uid').val()
        let sdcustomno = $('#sdcustomno').val()
        let serve = getServer('USER', 'SEARCH5')
        window.location.href = `${serve.url}?uid=${uid}&sdcustomno=${sdcustomno}`
    })
})()