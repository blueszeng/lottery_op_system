import Router from 'koa-router'
import game from '../controllers/game'
const router = Router({
    prefix: '/game'
})

/* 页面 */
router.get('/listPage', game.listPage) //主页面
router.get('/addPage', game.addPage) //添加页面
router.get('/eidtPage', game.eidtPage) //编辑页面

/* 记录 */
router.post('/add', game.add) //添加记录
router.post('/edit', game.edit) //编辑记录
router.post('/del', game.del) //删除记录

router.post('/search', game.search) //查询

module.exports = router