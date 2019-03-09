import $ from 'jquery'
import { getServer } from '../configs/config'
import http from './http'

let uploadImg = ({ clikBnId, selectFileId, showId, submitId }) => {
    $(`#${clikBnId}`).click(async(event) => {
        $('#upload').click()
    })
    $(`#${selectFileId}`).change(async function(event) {
        // 获取上传的图片名称
        let animateimg = $(`#${selectFileId}`).val()
            // 分割
        let imgarr = animateimg.split('\\')

        // 去掉 获取图片名
        let myimg = imgarr[imgarr.length - 1]

        // 获取 . 出现的位置
        let houzui = myimg.lastIndexOf('.')

        // 切割 . 获取文件后缀
        let ext = myimg.substring(houzui, myimg.length).toUpperCase()

        // 获取上传的文件
        let file = this.files[0]
        if (!file) {
            return
        }
        // 获取上传的文件大小
        let fileSize = file.size

        // 最大10MB
        let maxSize = 1048576 * 10
        if (ext !== '.PNG' && ext !== '.GIF' && ext !== '.JPG' && ext !== '.JPEG' && ext !== '.BMP') {
            console.log('文件类型错误,请上传图片类型')
            return false
        } else if (parseInt(fileSize) >= parseInt(maxSize)) {
            console.log('上传的文件不能超过10MB')
            return false
        } else {
            let data = new FormData($('#formUpload')[0])
            data.append('picture', file)
            try {
                let serve = getServer('GAME', 'UPLOAD')
                let ret = await http[serve.method](serve.url, data, false)
                ret = ret.data
                let result = ''
                let result1 = ''
                result += '<img src="' + ret['picture'] + '" width="100">'
                result1 += `<input value=${ret['picture']} id=${submitId}_id style="display:none">`
                $(`#${showId}`).html(result)
                $(`#${submitId}`).html(result1)
                layer.msg('上传成功!', { icon: 1, time: 1000 })
            } catch (err) {
                layer.msg('上传失败!', { icon: 1, time: 1000 })
            }
            return false
        }
    })
}

export default {
    uploadImg
}