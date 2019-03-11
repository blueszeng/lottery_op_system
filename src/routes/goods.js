import Router from 'koa-router'
import goods from '../controllers/goods'
import { wrapRoute } from '../utils/wrapRoute'
const router = Router({
    prefix: '/goods'
})

/* 物品管理 页面 */
router.get('/goodsType/listPage', goods.listPage) //物品分类列表
router.get('/goodsType/addPage', goods.addPage) //新增物品分类

router.get('/goodsModel/goodModellistPage', goods.goodModellistPage) //物品型号列表
router.get('/goodsModel/goodsModeladdPage', goods.goodsModeladdPage) //物品型号列表




module.exports = router