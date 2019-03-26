import log from '../../../modules/init'
import http from '../../../modules/http'
import { getServer } from '../../../configs/config'
import $ from 'jquery'


// 入口
(async function main() {
    $('#gameId').change(async(event) => {
        /* Act on the event */
        try {
            let data = {
                gameId: $('#gameId').val()
            }
            let serve = getServer('BOXGOODS', 'SEARCH1')
            let value = await http[serve.method](serve.url, data)
            console.log(value.data)
            let boxTypes = value.data.boxTypes
            $('#boxTypeId').empty()

            if (boxTypes.length > 0) {
                $('#boxTypeId').append(`<option value=0 selected>空</option>`)
                for (let i in boxTypes) {
                    $('#boxTypeId').append(`<option value=${boxTypes[i].BoxType.id}>${boxTypes[i].BoxType.name}</option>`)
                }
            }

            let goodsTypes = value.data.goodsTypes
            $('#goodsTypeId').empty()
            for (let i in goodsTypes) {
                if (goodsTypes.length > 0) {
                    $('#goodsTypeId').append(`<option value=0 selected>空</option>`)
                }
                $('#goodsTypeId').append(`<option value=${goodsTypes[i].GoodsType.id}>${goodsTypes[i].GoodsType.name}</option>`)
            }
        } catch (err) {
            log(err.message)
            layer.msg('添加失败!', { icon: 1, time: 1000 })
        }
    })


    $('#boxTypeId').change(async(event) => {
        /* Act on the event */
        try {
            let data = {
                gameId: $('#gameId').val(),
                boxTypeId: $('#boxTypeId').val()
            }
            let serve = getServer('BOXGOODS', 'SEARCH2')
            let value = await http[serve.method](serve.url, data)
            console.log(value)
            value = value.data
            console.log(value)
            $('#boxId').empty()
            if (value.length > 0) {
                $('#boxId').append(`<option value=0 selected>空</option>`)
                for (let i in value) {
                    if (value[i].id) {
                        $('#boxId').append(`<option value=${value[i].id}>${value[i].name}</option>`)
                    }
                }
            }
        } catch (err) {
            log(err.message)
            layer.msg('添加失败!', { icon: 1, time: 1000 })
        }
    })

    $('#goodsTypeId').change(async(event) => {
        /* Act on the event */
        try {
            let data = {
                goodsTypeId: $('#goodsTypeId').val()
            }
            let serve = getServer('BOXGOODS', 'SEARCH3')
            let value = await http[serve.method](serve.url, data)
            value = value.data
            $('#goodsModelId').empty()
            if (value.length > 0) {
                $('#goodsModelId').append(`<option value=0 selected>空</option>`)
                for (let i in value) {
                    if (value[i].id) {
                        $('#goodsModelId').append(`<option value=${value[i].id}>${value[i].name}</option>`)
                    }
                }
            }
        } catch (err) {
            log(err.message)
            layer.msg('添加失败!', { icon: 1, time: 1000 })
        }
    })

    $('#goodsModelId').change(async(event) => {
        /* Act on the event */
        try {
            let data = {
                goodsModelId: $('#goodsModelId').val()
            }
            let serve = getServer('BOXGOODS', 'SEARCH4')
            let value = await http[serve.method](serve.url, data)
            value = value.data
            $('#goodsId').empty()
            if (value.length > 0) {
                $('#goodsId').append(`<option value=0 selected>空</option>`)
                for (let i in value) {
                    if (value[i].id) {
                        $('#goodsId').append(`<option value=${value[i].id}>${value[i].name}</option>`)
                    }
                }
            }
        } catch (err) {
            log(err.message)
            layer.msg('添加失败!', { icon: 1, time: 1000 })
        }
    })

    $('#box_goods_save_submit').click(async(event) => {
        /* Act on the event */
        try {
            let data = {
                dropProbability: $('#dropProbability').val(),
                goodsId: $('#goodsId').val(),
                boxId: $('#boxId').val()
            }
            console.log(data)
            let serve = getServer('BOXGOODS', 'ADD')
            await http[serve.method](serve.url, data)
            layer.msg('添加成功!', { icon: 1, time: 1000 })
            $('#dropProbability').val('')
        } catch (err) {
            log(err.message)
            layer.msg(`添加失败!${err.message}`, { icon: 1, time: 1000 })
        }
    })
})()