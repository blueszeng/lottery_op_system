import Router from 'koa-router'
import goods from '../controllers/goods'
import { wrapRoute } from '../utils/wrapRoute'
const router = Router({
    prefix: '/goods'
})

/* 物品管理 页面 */
router.get('/goodsType/listPage', goods.listPage) //物品分类列表

router.get('/goodsType/addPage', goods.addPage) //新增物品分类




module.exports = router