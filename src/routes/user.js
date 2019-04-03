import Router from 'koa-router'
import user from '../controllers/user'

import { wrapRoute } from '../utils/wrapRoute'
const router = Router({
    prefix: '/user'
})


// https://aui.github.io/art-template/zh-cn/docs/syntax.html    模块文档
// https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/querying.md 数据库orm文档

/* 页面 */
router.get('/listPage', user.listPage)
router.get('/boxListPage', user.boxListPage)
router.get('/goodsListPage', user.goodsListPage)
router.get('/rechargeListPage', user.rechargeListPage)
router.get('/winPrizePushListPage', user.winPrizePushListPage)



module.exports = router