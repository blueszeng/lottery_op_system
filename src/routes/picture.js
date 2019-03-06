import Router from 'koa-router'
import picture from '../controllers/picture'
import middlewares from '../middlewares'
import { wrapRoute } from '../utils/wrapRoute'
const router = Router({
    prefix: '/picture'
})
router.get('/captcha', picture.getCaptcha) //获取验证码
router.post('/upload', middlewares.multipart(), wrapRoute(picture.upload)) // 上传图片
module.exports = router