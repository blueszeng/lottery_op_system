import Router from 'koa-router'
import box from '../controllers/box'
import { wrapRoute } from '../utils/wrapRoute'
const router = Router({
    prefix: '/box'
})

/* 宝箱类型 接口 */
router.get('/boxType/listPage', box.boxTypeListPage) //物品分类列表
router.get('/boxType/addPage', box.boxTypeAddPage) //新增物品分类
router.get('/boxType/editPage', box.boxTypeEditPage) //新增物品分类

router.post('/boxType/add', wrapRoute(box.boxTypeAdd))
router.post('/boxType/edit', wrapRoute(box.boxTypeEdit))
router.get('/boxType/del', wrapRoute(box.boxTypeDel)) //删除记录



/* 宝箱 接口 */
router.get('/box/listPage', box.boxListPage) //物品分类列表
router.get('/box/addPage', box.boxAddPage) //新增物品分类
router.get('/box/editPage', box.boxEditPage) //新增物品分类

router.post('/box/add', wrapRoute(box.boxAdd))
router.post('/box/edit', wrapRoute(box.boxEdit))
router.get('/box/del', wrapRoute(box.boxDel)) //删除记录

router.get('/box/del', box.boxSearch) //查询



/* 宝箱物品 接口 */
router.get('/boxGoods/listPage', box.boxGoodsListPage) //宝箱物品分类列表
router.get('/boxGoods/addPage', box.boxGoodsAddPage) //新增宝箱物品分类
router.get('/boxGoods/editPage', box.boxGoodsEditPage) //编辑宝箱物品分类

router.get('/boxGoods/del', wrapRoute(box.boxGoodsDel))
router.post('/boxGoods/add', wrapRoute(box.boxGoodsAdd))
router.post('/boxGoods/edit', wrapRoute(box.boxGoodsEdit))
router.get('/boxGoods/del', wrapRoute(box.boxGoodsDel)) //删除记录

router.get('/boxGoods/boxAndGoodsTypes', wrapRoute(box.boxAndGoodsTypesByGame)) // 获得游戏中的宝箱类型,和物品类型
router.get('/boxGoods/boxs', wrapRoute(box.boxByBoxType)) // 获得宝箱通过宝箱类型

router.get('/boxGoods/goodsModel', wrapRoute(box.boxModelByGoodsType)) // 获得物型号通过物品类型
router.get('/boxGoods/goods', wrapRoute(box.goodsByGoodsModelType)) // 获得物品通过物品型号
module.exports = router