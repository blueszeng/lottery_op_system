import Router from 'koa-router'
import goods from '../controllers/goods'
import { wrapRoute } from '../utils/wrapRoute'
const router = Router({
    prefix: '/goods'
})

/* 物品类型 接口 */
router.get('/goodsType/listPage', goods.goodsTypeListPage) //物品分类列表
router.get('/goodsType/addPage', goods.goodsTypeAddPage) //新增物品分类
router.get('/goodsType/editPage', goods.goodsTypeEditPage) //新增物品分类

router.post('/goodsType/add', wrapRoute(goods.goodsTypeAdd))
router.post('/goodsType/edit', wrapRoute(goods.goodsTypeEdit))
router.get('/goodsType/del', wrapRoute(goods.goodsTypeDel)) //删除记录



/* 物品型号 接口 */
router.get('/goodsModel/listPage', goods.goodsModelListPage) //物品分类列表
router.get('/goodsModel/addPage', goods.goodsModelAddPage) //新增物品分类
router.get('/goodsModel/editPage', goods.goodsModelEditPage) //新增物品分类

router.post('/goodsModel/add', wrapRoute(goods.goodsModelAdd))
router.post('/goodsModel/edit', wrapRoute(goods.goodsModelEdit))
router.get('/goodsModel/del', wrapRoute(goods.goodsModelDel)) //删除记录





module.exports = router