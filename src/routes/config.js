import Router from 'koa-router'
import config from '../controllers/config'
import { wrapRoute } from '../utils/wrapRoute'
const router = Router({
    prefix: '/config'
})

/* 页面 */
router.get('/editPage', config.editPage) //修改配置页面

/* 记录 */
router.post('/edit', wrapRoute(config.edit)) //编辑记录


module.exports = router