import Router from 'koa-router'
import exchangeGoods from '../controllers/exchangeGoods'
const router = Router({
    prefix: '/exchangeGoods'
})


// https://aui.github.io/art-template/zh-cn/docs/syntax.html    模块文档
// https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/querying.md 数据库orm文档

/* 页面 */
router.get('/listPage', exchangeGoods.listPage) //主页面


module.exports = router