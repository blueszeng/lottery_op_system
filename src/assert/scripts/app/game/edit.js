import log from '../../modules/init'
import http from '../../modules/http'
import upload from '../../modules/upload'
import { getServerUrl } from '../../configs/config'
import $ from 'jquery'


// 入口
(async function main() {
    $('#article_update_submit').click(async(event) => {
        /* Act on the event */
        // {"mane":1}
        let data = {
            gameId: $('#game_id').val(),
            img: $('#img_id').val(),
            name: $('#name').val(),
            config: JSON.stringify($('#config').val())
        }
        try {
            await http.post(getServerUrl('GAME', 'EDIT'), data)
            layer.msg('编辑成功!', { icon: 1, time: 1000 })
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