import log from '../../../modules/init'
import http from '../../../modules/http'
import upload from '../../../modules/upload'
import { getServer } from '../../../configs/config'
import $ from 'jquery'


// 入口
(async function main() {
    $('#goods_save_submit').click(async(event) => {
        /* Act on the even */
        try {
            let data = {
                gameId: $('#gameId').val(),
                goodsModelId: $('#goodsModelId').val(),
                goodsQualitiesId: $('#goodsQualitiesId').val(),
                name: $('#name').val(),
                img: $('#img_id').val(),
                exchangePrice: $('#exchangePrice').val(),
                sellPrice: $('#sellPrice').val(),
                skinName: $('#skinName').val(),
                discrable: $('#discrable').val()
            }
            console.log(data)
            let serve = getServer('GOODS', 'ADD')
            console.log(data, serve.url)
            await http[serve.method](serve.url, data)
            layer.msg('添加成功!', { icon: 1, time: 1000 })
            $('#img_id').val('')
            $('#name').val('')
            $('#gameId').val('')
            $('#goodsModelId').val('')
            $('#goodsQualitiesId').val('')
            $('#exchangePrice').val('')
            $('#sellPrice').val('')
            $('#skinName').val('')
            $('#discrable').val('')
            $('#price').val('')
            $('#result').html('')
        } catch (err) {
            log(err.message)
            layer.msg('添加失败!', { icon: 1, time: 1000 })
        }
    })

    // 添加上传图片插件函数
    upload.uploadImg({
        clikBnId: 'changeUpload',
        selectFileId: 'upload',
        showId: 'result',
        submitId: 'img'
    })
})()