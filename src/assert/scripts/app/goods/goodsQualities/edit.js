import log from '../../../modules/init'
import http from '../../../modules/http'
import upload from '../../../modules/upload'
import { getServer } from '../../../configs/config'
import $ from 'jquery'

// 入口
(async function main() {
    $('#goodsQualities_update_submit').click(async(event) => {
        /* Act on the event */
        let data = {
            goodsQualitiesId: $('#goodsQualitiesId').val(),
            img: $('#img_id').val(),
            name: $('#name').val()
        }
        try {
            console.log(data)
            let serve = getServer('GOODSQUALITIES', 'EDIT')
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

    // 添加上传图片插件函数
    upload.uploadImg({
        clikBnId: 'changeUpload',
        selectFileId: 'upload',
        showId: 'result',
        submitId: 'img'
    })
})()