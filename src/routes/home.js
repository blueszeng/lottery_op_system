import Router from 'koa-router'
import home from '../controllers/home'
import { wrapRoute } from '../utils/wrapRoute'
// 注意, 用 wrapRoute 包裹的函数是 传送的是json结构。需要用promise返回数据. 不能直接return
const router = Router()

router.get('/about', home.about)
router.get('/test', wrapRoute(home.test))

module.exports = router